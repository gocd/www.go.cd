var showDownloadLinks = (function ($) {
  return function (options) {
    var typeOfInstallersToShow = options.typeOfInstallersToShow;

    var settingsForAllTypes = {
      stable: {
        download_info_url: "https://download.gocd.org/releases.json",
        download_prefix: "https://download.gocd.org/binaries/",
        version_to_show: function (release) {
          return release["go_version"];
        },
        cloud_info_url: "https://download.gocd.org/cloud.json",
        docker_org: 'gocd'
      },
      experimental: {
        download_info_url: "https://download.gocd.org/experimental/releases.json",
        download_prefix: "https://download.gocd.org/experimental/binaries/",
        version_to_show: function (release) {
          return release["go_full_version"];
        },
        cloud_info_url: "https://download.gocd.org/experimental/cloud.json",
        docker_org: 'gocdexperimental'
      }
    };

    var settings = settingsForAllTypes[typeOfInstallersToShow];

    var dateFilter = R.curry(function (timeInSecondsSinceEpoch) {
      return (
        new Date() - new Date(timeInSecondsSinceEpoch * 1000) <
        3600 * 24 * 366 * 1000
      );
    });

    var releasesLessThanAYearOld = R.filter(
      R.where({
        release_time: dateFilter
      })
    );

    var addURLToFiles = function (release) {
      var addDetailsFrom = R.curry(function (release, analyticsIDPrefix, o) {
        var afterAddingURL = R.assoc(
          "url",
          settings.download_prefix + release["go_full_version"] + "/" + o["file"],
          o
        );
        var afterAddingFilename = R.assoc(
          "filename",
          R.last(o["file"].split("/")),
          afterAddingURL,
          o
        );
        var afterAddingAnalyticsID = R.assoc(
          "analytics_id",
          analyticsIDPrefix + "_" + release["go_full_version"],
          afterAddingFilename,
          o
        );
        return afterAddingAnalyticsID;
      });

      return R.evolve({
          win: {
            server: addDetailsFrom(release, "Windows-Server"),
            agent: addDetailsFrom(release, "Windows-Agent"),
          },
          osx: {
            server: addDetailsFrom(release, "Mac-Server"),
            agent: addDetailsFrom(release, "Mac-Agent"),
            "server-aarch64": addDetailsFrom(release, "Mac-Server-Aarch64"),
            "agent-aarch64": addDetailsFrom(release, "Mac-Agent-Aarch64")
          },
          deb: {
            server: addDetailsFrom(release, "LinuxDeb-Server"),
            agent: addDetailsFrom(release, "LinuxDeb-Agent")
          },
          rpm: {
            server: addDetailsFrom(release, "LinuxRpm-Server"),
            agent: addDetailsFrom(release, "LinuxRpm-Agent")
          },
          generic: {
            server: addDetailsFrom(release, "Package-Server"),
            agent: addDetailsFrom(release, "Package-Agent")
          }
        },
        release
      );
    };

    var addDisplayVersion = R.curry(function (release) {
      return R.assoc(
        "display_version",
        settings.version_to_show(release),
        release
      );
    });

    var addReleaseDate = R.curry(function (release) {
      return R.assoc(
        "release_date",
        new Date(release["release_time_readable"]).toDateString().substr(4),
        release
      );
    });

    var compareVersions = function (propertyToCompareOn) {
      return function (a, b) {
        var i, diff;

        var segmentsA = a[propertyToCompareOn].replace("-", ".").split(".");
        var segmentsB = b[propertyToCompareOn].replace("-", ".").split(".");

        var l = Math.min(segmentsA.length, segmentsB.length);

        for (i = 0; i < l; i++) {
          diff = parseInt(segmentsB[i], 10) - parseInt(segmentsA[i], 10);
          if (diff) {
            return diff;
          }
        }
        return segmentsA.length - segmentsB.length;
      };
    };

    var showReleases = function (releaseData, cloudData) {
      var addInfo = function (latestRelease) {
        var notes = {
          deb: 'Note: If you prefer to use the APT repository to install, please follow these <a href="https://docs.gocd.org/current/installation/install/server/linux.html#debian-based-distributions-ie-ubuntu">instructions</a>.',
          rpm: 'Note: If you prefer to use the YUM repository to install, please follow these <a href="https://docs.gocd.org/current/installation/install/server/linux.html#rpm-based-distributions-ie-redhatcentosfedora">instructions</a>.',
          generic: 'Note: Zip versions require a Java JRE/JDK of version 11 - 17.'
        };

        for (var key in notes) {
          var installerInfo = R.assoc("info", notes[key], latestRelease[key]);
          latestRelease = R.assoc(key, installerInfo, latestRelease);
        }
        return latestRelease;
      };

      var releases = R.compose(
        releasesLessThanAYearOld,
        R.sort(compareVersions("go_full_version")),
        R.map(addURLToFiles),
        R.map(addDisplayVersion),
        R.map(addReleaseDate)
      )(releaseData[0]);
      var cloudReleases = R.compose(
        releasesLessThanAYearOld,
        R.sort(compareVersions("go_version"))
      )(cloudData[0]);

      var latest_cloud_release = R.head(cloudReleases);
      var other_cloud_releases = R.tail(cloudReleases);
      var latestRelease = addInfo(R.head(releases));
      var template = Handlebars.compile(
        $("#download-revisions-template").html()
      );

      const assocDockerOrg = function (val) {
        return R.assoc('docker_org', settings.docker_org, val);
      };
      // adding the docker organisation
      latest_cloud_release = R.assoc('docker_org', settings.docker_org, latest_cloud_release);
      other_cloud_releases = R.map(assocDockerOrg, other_cloud_releases);

      $("#downloads").html(
        template({
          latest_release: latestRelease,
          all_other_releases: R.tail(releases),
          latest_version: releases[0].go_version,
          latest_cloud_release: latest_cloud_release,
          all_other_cloud_releases: other_cloud_releases
        })
      );
    };

    var showFailureMessage = function (error) {
      $("#downloads").html(
        '<p class="not-loaded">Sorry. Something went wrong and we could not list the download links. \
        Please report <a href="https://github.com/gocd/www.go.cd/issues">this issue</a>.</p>'
      );
      console.log("Error: " + error);
    };

    $("#downloads").html($(".loading-message-template").html());

    return $.when(
        downloadOrGetFromCache(settings.download_info_url),
        downloadOrGetFromCache(settings.cloud_info_url)
      )
      .done(showReleases)
      .fail(showFailureMessage);
  };
})(jQuery);

var downloadOrGetFromCache = (function ($) {
  var storedJSON = {};

  return function (url) {
    var deferred = $.Deferred();

    if (storedJSON.hasOwnProperty(url)) {
      deferred.resolve([storedJSON[url], "success"]);
      return deferred.promise();
    }

    return $.getJSON(url).done(function (data) {
      storedJSON[url] = data;
    });
  };
})(jQuery);

var setupShowVerifyChecksumMessage = (function ($) {
  return function () {
    $("body").on("click", "#downloads .verify-checksum", function (evt) {
      var checksumElement = $(evt.currentTarget);
      var template = Handlebars.compile(
        $("#verify-checksum-message-template").html()
      );
      $("#verify-checksum-message").html(
        template({
          filename: checksumElement.data("filename"),
          md5sum: checksumElement.data("md5sum"),
          sha1sum: checksumElement.data("sha1sum"),
          sha256sum: checksumElement.data("sha256sum")
        })
      );
      $("body").addClass("o-h");
    });
  };
})(jQuery);

var determinePackageNameBasedOnOS = function () {
  var userDefinedPackageName = window.location.hash.substr(1);
  var validPackageNames = [
    "zip",
    "windows",
    "osx",
    "debian",
    "redhat",
    "docker"
  ];
  if (
    userDefinedPackageName !== "" &&
    validPackageNames.includes(userDefinedPackageName)
  ) {
    return userDefinedPackageName;
  }

  var userAgent = navigator.userAgent;
  var packageName = "zip";
  if (userAgent.indexOf("Win") !== -1) packageName = "windows";
  if (userAgent.indexOf("Mac") !== -1) packageName = "osx";
  if (userAgent.indexOf("Debian") !== -1) packageName = "debian";
  if (userAgent.indexOf("Ubuntu") !== -1) packageName = "debian";
  if (userAgent.indexOf("RedHat") !== -1) packageName = "redhat";
  if (userAgent.indexOf("CentOS") !== -1) packageName = "redhat";

  return packageName;
};

var switchDownloadType = function (currentInstallerType) {
  $(".release-type input." + currentInstallerType).attr("checked", true);
};

var showHelpLinksFor = (function ($) {
  return function (packageName) {
    var installer_type_to_help_link_type = {
      debian: "linux",
      redhat: "linux",
      windows: "windows",
      zip: "zip",
      osx: "osx"
    };
    var template = Handlebars.compile($("#downloads-help-links").html());

    $("#help-links").html(
      template({
        os: installer_type_to_help_link_type[packageName]
      })
    );
  };
})(jQuery);

Handlebars.registerHelper("size", function (
  array,
  operator,
  expectedSize,
  options
) {
  "use strict";
  if (array == null || array == undefined) {
    return options.inverse(this);
  }

  switch (operator) {
    case "lt":
      return array.length < expectedSize ?
        options.fn(this) :
        options.inverse(this);
    case "lte":
      return array.length <= expectedSize ?
        options.fn(this) :
        options.inverse(this);
    case "eq":
      return array.length === expectedSize ?
        options.fn(this) :
        options.inverse(this);
    case "gt":
      return array.length > expectedSize ?
        options.fn(this) :
        options.inverse(this);
    case "gte":
      return array.length >= expectedSize ?
        options.fn(this) :
        options.inverse(this);
    default:
      throw "Invalid operator " + operator + ".";
      break;
  }
});

Handlebars.registerHelper("has-additional-arch", function (release) {
  return Object.keys(release).some(function (key) { return key.includes('-'); });
});

function additionalArch(release) {
  return Object.keys(release)
    .filter(function (key) { return key.startsWith("server-"); })
    .map(function (key) { return key.substring("server-".length); });
}

Handlebars.registerHelper("additional-arch", additionalArch);

Handlebars.registerHelper("server-additional-arch", function(release) {
  return "server-" + additionalArch(release)
});

Handlebars.registerHelper("agent-additional-arch", function(release) {
  return "agent-" + additionalArch(release)
});


$(document).ready(function () {
  setTimeout(showPopup, 100);
});

function showPopup() {
  $(".banner-fixed-bottom").addClass("show-banner");
}
