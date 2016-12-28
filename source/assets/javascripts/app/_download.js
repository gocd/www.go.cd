var showDownloadLinks = (function($) {
  return function(options) {
    var typeOfInstallersToShow = options.typeOfInstallersToShow;

    var settingsForAllTypes = {
      stable: {
        download_info_url : 'https://download.gocd.io/releases.json',
        download_prefix   : 'https://download.gocd.io/binaries/',
        version_to_show   : function(release) { return release['go_version']; }
      },
      experimental: {
        download_info_url : 'https://download.gocd.io/experimental/releases.json',
        download_prefix   : 'https://download.gocd.io/experimental/binaries/',
        version_to_show   : function(release) { return release['go_full_version']; }
      }
    };

    var settings = settingsForAllTypes[typeOfInstallersToShow];

    var isNewerThanAYearOld = R.curry(function(timeInSecondsSinceEpoch) {
      return (new Date() - new Date(timeInSecondsSinceEpoch * 1000)) < 3600 * 24 * 366 * 1000;
    });

    var releasesLessThanAYearOld = R.filter(R.where({release_time: isNewerThanAYearOld}));

    var addURLToFiles = function(release) {
      var addDetailsFrom = R.curry(function(release, analyticsIDPrefix, o) {
        var afterAddingURL = R.assoc('url', settings.download_prefix + release['go_full_version'] + '/' + o["file"], o);
        var afterAddingFilename = R.assoc('filename', R.last(o["file"].split("/")), afterAddingURL, o);
        var afterAddingAnalyticsID = R.assoc('analytics_id', analyticsIDPrefix + "_" + release['go_full_version'], afterAddingFilename, o);
        return afterAddingAnalyticsID;
      });

      return R.evolve({
        win:     {server: addDetailsFrom(release, 'Windows-Server'), agent: addDetailsFrom(release, 'Windows-Agent'),  server32bit: addDetailsFrom(release, 'Windows-Server-32bit'), agent32bit: addDetailsFrom(release, 'Windows-Agent-32bit')},
        osx:     {server: addDetailsFrom(release, 'Mac-Server'),      agent: addDetailsFrom(release, 'Mac-Agent')},
        deb:     {server: addDetailsFrom(release, 'LinuxDeb-Server'), agent: addDetailsFrom(release, 'LinuxDeb-Agent')},
        rpm:     {server: addDetailsFrom(release, 'LinuxRpm-Server'), agent: addDetailsFrom(release, 'LinuxRpm-Agent')},
        generic: {server: addDetailsFrom(release, 'Package-Server'),  agent: addDetailsFrom(release, 'Package-Agent')}
      }, release);
    };

    var addDisplayVersion = R.curry(function(release) {
      return R.assoc('display_version', settings.version_to_show(release), release);
    });

    function compareVersions (a, b) {
      var i, diff;

      var segmentsA = a.go_full_version.replace('-', '.').split('.');
      var segmentsB = b.go_full_version.replace('-', '.').split('.');

      var l = Math.min(segmentsA.length, segmentsB.length);

      for (i = 0; i < l; i++) {
        diff = parseInt(segmentsB[i], 10) - parseInt(segmentsA[i], 10);
        if (diff) {
          return diff;
        }
      }
      return segmentsA.length - segmentsB.length;
    }

    var showReleases = function(data) {
      var releases = R.compose(releasesLessThanAYearOld, R.sort(compareVersions), R.map(addURLToFiles), R.map(addDisplayVersion))(data);

      var template = Handlebars.compile($("#download-revisions-template").html());
      $("#downloads").html(template({
        latest_release     : R.head(releases),
        all_other_releases : R.tail(releases),
        latest_version     : releases[0].go_version
      }));
    };

    var showFailureMessage = function(error) {
      $("#downloads").html('<p class="not-loaded">Sorry. Something went wrong and we could not list the download links. \
        Please report <a href="https://github.com/gocd/www.go.cd/issues">this issue</a>.</p>')
      console.log("Error: " + error);
    };

    return $.getJSON(settings.download_info_url)
      .done(showReleases)
      .fail(showFailureMessage);
  };
})(jQuery);

var setupShowVerifyChecksumMessage = (function($) {
  return function() {
    $("#downloads").on('click', '.verify-checksum', function(evt) {
      var checksumElement = $(evt.currentTarget);
      var template = Handlebars.compile($("#verify-checksum-message-template").html());
      $("#verify-checksum-message").html(template({
        filename  : checksumElement.data("filename"),
        md5sum    : checksumElement.data("md5sum"),
        sha1sum   : checksumElement.data("sha1sum"),
        sha256sum : checksumElement.data("sha256sum")
      }));
       $('body').addClass("o-h");
    });
  };
})(jQuery);
