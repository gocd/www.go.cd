var showDownloadLinks = (function($) {
  return function() {
    var isNewerThanAYearOld = R.curry(function(timeInSecondsSinceEpoch) {
      return (new Date() - new Date(timeInSecondsSinceEpoch * 1000)) < 3600 * 24 * 366 * 1000;
    });

    var addURL = function(release) {
      var addBaseURL = R.curry(function(release, o) {
        return R.assoc('url', 'https://download.go.cd/binaries/' + release['go_full_version'] + '/' + o["file"], o);
      });

      return R.evolve({
        win:     {server: addBaseURL(release), agent: addBaseURL(release)},
        osx:     {server: addBaseURL(release), agent: addBaseURL(release)},
        deb:     {server: addBaseURL(release), agent: addBaseURL(release)},
        rpm:     {server: addBaseURL(release), agent: addBaseURL(release)},
        solaris: {server: addBaseURL(release), agent: addBaseURL(release)},
        generic: {server: addBaseURL(release), agent: addBaseURL(release)}
      }, release);
    };

    var releasesLessThanAYearOld = R.filter(R.where({release_time: isNewerThanAYearOld}));

    var showReleases = function(data) {
      var releases = R.compose(releasesLessThanAYearOld, R.reverse, R.map(addURL))(data);
      debugger;

      var template = Handlebars.compile($("#download-revisions-template").html());
      $("#downloads").html(template({
        releases: releases,
        latest_version: releases[0].go_version
      }));
    };

    var showFailureMessage = function(error) {
      $("#downloads").html('Sorry. Something went wrong and we could list the download links. \
        Please report <a href="https://github.com/gocd/gocd.github.io/issues">this issue</a>.')
      console.log("Error: " + error);
    };

    $.getJSON('https://download.go.cd/releases.json')
      .done(showReleases)
      .fail(showFailureMessage);
  };
})(jQuery);
