var showDownloadLinks = (function($) {
  return function() {
    var isNewerThanAYearOld = R.curry(function(timeInSecondsSinceEpoch) {
      return (new Date() - new Date(timeInSecondsSinceEpoch * 1000)) < 3600 * 24 * 366 * 1000;
    });

    var addURL = function(release) {
      var addDetailsFrom = R.curry(function(release, o) {
        var afterAddingURL = R.assoc('url', 'https://download.go.cd/binaries/' + release['go_full_version'] + '/' + o["file"], o);
        var afterAddingFilename = R.assoc('filename', R.last(o["file"].split("/")), afterAddingURL);
        var afterDisplayVersion = R.assoc('display_version', release['go_full_version'], afterAddingFilename);

        return afterDisplayVersion;
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

    var releasesLessThanAYearOld = R.filter(R.where({release_time: isNewerThanAYearOld}));

    var showReleases = function(data) {
      var releases = R.compose(releasesLessThanAYearOld, R.reverse, R.map(addURL))(data);

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

    return $.getJSON('https://download.go.cd/releases.json')
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
