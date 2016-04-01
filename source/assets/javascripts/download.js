var showDownloadLinks = (function($) {
  return function(options) {
    var typeOfInstallersToShow = options.typeOfInstallersToShow;

    var settingsForAllTypes = {
      stable: {
        download_info_url : 'https://download.go.cd/releases.json',
        download_prefix   : 'https://download.go.cd/binaries/',
        version_to_show   : function(release) { return release['go_version']; }
      },
      experimental: {
        download_info_url : 'https://download.go.cd/experimental/releases.json',
        download_prefix   : 'https://download.go.cd/experimental/binaries/',
        version_to_show   : function(release) { return release['go_full_version']; }
      }
    };

    var settings = settingsForAllTypes[typeOfInstallersToShow];

    var isNewerThanAYearOld = R.curry(function(timeInSecondsSinceEpoch) {
      return (new Date() - new Date(timeInSecondsSinceEpoch * 1000)) < 3600 * 24 * 366 * 1000;
    });

    var releasesLessThanAYearOld = R.filter(R.where({release_time: isNewerThanAYearOld}));

    var addURLToFiles = function(release) {
      var addDetailsFrom = R.curry(function(release, o) {
        var afterAddingURL = R.assoc('url', settings.download_prefix + release['go_full_version'] + '/' + o["file"], o);
        var afterAddingFilename = R.assoc('filename', R.last(o["file"].split("/")), afterAddingURL, o);
        return afterAddingFilename;
      });

      return R.evolve({
        win:     {server: addDetailsFrom(release), agent: addDetailsFrom(release)},
        osx:     {server: addDetailsFrom(release), agent: addDetailsFrom(release)},
        deb:     {server: addDetailsFrom(release), agent: addDetailsFrom(release)},
        rpm:     {server: addDetailsFrom(release), agent: addDetailsFrom(release)},
        solaris: {server: addDetailsFrom(release), agent: addDetailsFrom(release)},
        generic: {server: addDetailsFrom(release), agent: addDetailsFrom(release)}
      }, release);
    };

    var addDisplayVersion = R.curry(function(release) {
      return R.assoc('display_version', settings.version_to_show(release), release);
    });



    var showReleases = function(data) {
      var releases = R.compose(releasesLessThanAYearOld, R.reverse, R.map(addURLToFiles), R.map(addDisplayVersion))(data);

      var template = Handlebars.compile($("#download-revisions-template").html());
      $("#downloads").html(template({
        latest_release     : R.head(releases),
        all_other_releases : R.tail(releases),
        latest_version     : releases[0].go_version
      }));
    };

    var showFailureMessage = function(error) {
      $("#downloads").html('Sorry. Something went wrong and we could not list the download links. \
        Please report <a href="https://github.com/gocd/gocd.github.io/issues">this issue</a>.')
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
        sha256sum : checksumElement.data("sha256sum")
      }));
       $('body').addClass("o-h");
    });
  };
})(jQuery);
