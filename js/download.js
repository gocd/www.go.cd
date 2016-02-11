$(function() {
  var masterURL = "https://download.go.cd/";

  if ($('#show-checksum').length === 0) {
    return;
  }

  $('#show-checksum').change(function(evt) {
    var input = $(evt.target);

    if (input.is(':checked')) {
      $('.checksums').show();
    } else {
      $('.checksums').hide();
    }
  });

  $(document).ready(init);

  function init() {
    fetchArtifacts(function(artifactList) {
      renderInstallersByOS(artifactList, "mac", 'mac-revisions');
      renderInstallersByOS(artifactList, "solaris", 'solaris-revisions');
      renderInstallersByOS(artifactList, "linuxDeb", 'linuxDeb-revisions');
      renderInstallersByOS(artifactList, "linuxRpm", 'linuxRpm-revisions');
      renderInstallersByOS(artifactList, "package", 'package-revisions');
      renderInstallersByOS(artifactList, "win", 'windows-revisions');
      setupJourneyTracker(artifactList);
    });
  }

  function hideLoader() {
    $('#download-loader').remove();
  }

  function GTMID(artifact, file) {
    var splitArtifactType = file.type.split("-");
    return splitArtifactType[0].charAt(0).toUpperCase() + splitArtifactType[0].slice(1) + '-' + splitArtifactType[1].charAt(0).toUpperCase() + splitArtifactType[1].slice(1) + "_" + artifact.version;
  }

  function downloadType(file) {
    if (file.name.indexOf("server") > 0) {
      return "Server";
    } else if (file.name.indexOf("agent") > 0) {
      return "Agent";
    }
  }


  function setupJourneyTracker(artifactList) {
    if (typeof jtr === "undefined") {
      return;
    }
    _.each(artifactList, function(artifact) {
      _.each(artifact.files, function(file) {
        var type = downloadType(file);
        if (!type) {
          return;
        }
        var linkSelector = '#' + GTMID(artifact, file).replace(/\./g, "\\.");
        $(linkSelector).click(function() {
          try {
            jtr.track(type.toLowerCase() + " download", {
              download_release_type: artifact.release_type,
              download_version: artifact.version,
              download_file_type: file.type,
              download_file_name: file.name
            });
          } catch (e) {
            //ignore
          }
        });
      });
    });
  }

  function fetchArtifacts(callbackFn) {
    var originalRender = function(releases) {

      var supported = _.chain(releases).where({
        release_type: "supported"
      }).reject(function(release) {
        return release.hidden == true;
      }).sortBy(function(release){
        return release.version;
      }).reverse().value();

      var unsupported = _.chain(releases).reject({
        release_type: "supported"
      }).reject(function(release) {
        return release.hidden == true;
      }).sortBy(function(release){
        return release.version;
      }).reverse().value();

      callbackFn(supported.concat(unsupported));
      hideLoader();
    };

    if (document.location.search === '?new') {
      var releases = [];

      var render = _.after(2, function() {
        releases = _.compact(releases);

        originalRender(releases);
      });


      var extract_files = function(release, release_type, src_name, dest_prefix) {
        var baseurl = 'https://dl.go.cd';
        if (release_type == 'experimental') {
          baseurl += '/experimental';
        }
        return _.collect(['server', 'agent'], function(component) {
          return {
            name: release[src_name][component].file,
            md5sum: release[src_name][component].md5sum,
            sha1sum: release[src_name][component].sha1sum,
            sha256sum: release[src_name][component].sha256sum,
            sha512sum: release[src_name][component].sha512sum,
            type: dest_prefix + '-' + component,
            url: baseurl + '/binaries/' + release.go_full_version + '/' + release[src_name][component].file
          };
        });
      };

      var xhrDone = function(release_type) {
        return function(xhr_data) {
          releases = _.union(releases, _.map(xhr_data, function(release) {
            var release_time = new Date(release.release_time * 1000);
            var threshold = 3600 * 24 * 366 * 1000; // 1 year in ms
            if ((new Date() - release_time) > threshold) {
              return;
            }

            var files = [];

            files = files.concat(extract_files(release, release_type, 'osx', 'mac'));
            files = files.concat(extract_files(release, release_type, 'rpm', 'linuxRpm'));
            files = files.concat(extract_files(release, release_type, 'deb', 'linuxDeb'));
            files = files.concat(extract_files(release, release_type, 'solaris', 'solaris'));
            files = files.concat(extract_files(release, release_type, 'win', 'windows'));
            files = files.concat(extract_files(release, release_type, 'generic', 'package'));

            return {
              release_type: release_type,
              release_time: release.release_time,
              git_revision: release.git_sha,
              version: release.go_full_version,
              files: files
            };
          }));

          render();
        };
      };

      $.getJSON('https://dl.go.cd/releases.json', xhrDone('supported'));
      $.getJSON('https://dl.go.cd/experimental/releases.json', xhrDone('experimental'));

    } else {
      $.getJSON(masterURL + "local/releases.json", function(releases) {
        releases = _.map(releases, function(release) {
          release.files = _.map(release.files, function(file) {
            if (release.release_type == 'supported') {
              var basedir = 'gocd';
              if (file.name.match(/\.deb$/)) {
                basedir = 'gocd-deb';
              }
              if (file.name.match(/\.rpm$/)) {
                basedir = 'gocd-rpm';
              }
              file.url = 'https://download.go.cd/' + basedir + '/' + file.name;
            } else {
              file.url = 'https://download.go.cd/local/' + release.version + '/' + file.name;
            }

            return file;
          });
          return release;
        });

        originalRender(releases);
      });
    }
  }

  function renderInstallersByOS(artifactList, os, revisionHolder) {
    var revisionsString = '';
    var latestReleaseTime = 0;
    _.each(artifactList, function(artifact, index, allArtifacts) {
      var fileName = artifact.release_type;

      var filesWhichMatch = _.filter(artifact.files, function(file) {
        return file.type.indexOf(os) == 0;
      });
      if (filesWhichMatch.length == 0) {
        return;
      }

      if (artifact.release_type == "supported" && artifact.release_time > latestReleaseTime) {
        $('#latestVersion').html(artifact.version);
        latestReleaseTime = artifact.release_time;
      }

      revisionsString += "<li class=" + artifact.release_type + ">";
      revisionsString += "<div style='float:left; font-weight: bold;'>" + artifact.release_type + " release</div>"
      revisionsString += "<div style='clear: left; float:left;'>"
      revisionsString += "<span class='version'>" + artifact.version + "</span>" + "<span class='revision-link'> (<a target='_blank' href=http://www.github.com/gocd/gocd/commit/" + artifact.git_revision + ">" + artifact.git_revision + "</a>)</span>";

      var releasedTime = new Date(artifact.release_time * 1000);
      revisionsString += "<span class='time-stamp' title='" + releasedTime + "'>" + $.timeago(releasedTime.getFullYear() + '-' + (releasedTime.getMonth() + 1) + '-' + releasedTime.getDate()) + "</span>";

      revisionsString += "</div>"

      revisionsString += "<div class='link-holder'>";
      revisionsString += "<div class='links'>";

      _.each(filesWhichMatch, function(file, index, list) {
        var type = downloadType(file);
        if (!type) {
          return;
        }
        revisionsString += '<span><a id="' + GTMID(artifact, file) + '" class="icon-download" href="' + file.url + '">' + type + '</a></span>';
        if (type === "Server") {
          revisionsString += " + ";
        }
      });
      revisionsString += "</div>";

      revisionsString += '<div>'
      _.each(filesWhichMatch, function(file, index, list) {
        var type = downloadType(file);
        if (!type) {
          return;
        }
        revisionsString += '<div class="checksums">';
        revisionsString += "<div> <b>" + type + " MD5</b> " + file.md5sum + " </div>";
        revisionsString += "<div> <b>" + type + " SHA1</b> " + file.sha1sum + "</div>";
        revisionsString += '</div>';

      });
      revisionsString += '</div>';

      revisionsString += "</div>"
      revisionsString += "</li>";
    });

    $('#' + revisionHolder).append(revisionsString);
  }
});


$(window).load(function() {
  function detectOS() {
    if ($.os.name == "linux")
      return "linux-deb";
    if ($.os.name == "unknown")
      return "win";
    return $.os.name;
  }
  $('a[href="#' + detectOS() + '"]').tab('show');
});
