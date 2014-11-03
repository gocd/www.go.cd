$(function() {
    var masterURL = "http://download.go.cd/";
    init();

    function init() {
        fetchArtifacts(function(artifactList) {
            renderInstallersByOS(artifactList, "mac", 'mac-revisions', 'gocd');
            renderInstallersByOS(artifactList, "solaris", 'solaris-revisions', 'gocd');
            renderInstallersByOS(artifactList, "linuxDeb", 'linuxDeb-revisions', 'gocd-deb');
            renderInstallersByOS(artifactList, "linuxRpm", 'linuxRpm-revisions', 'gocd-rpm');
            renderInstallersByOS(artifactList, "package", 'package-revisions', 'gocd');
            renderInstallersByOS(artifactList, "win", 'windows-revisions', 'gocd');
        });
    }

    function hideLoader() {
        $('#download-loader').remove();
    }

    function fetchArtifacts(callbackFn) {
        $.getJSON("http://download.go.cd/local/releases.json", function(ArtifactList, status) {
            var supported = _.where(ArtifactList, {release_type: "supported"});
            var unsupported = _.reject(ArtifactList, {release_type: "supported"}).reverse();
            callbackFn(supported.concat(unsupported));
            hideLoader();
        });

    }

    function renderInstallersByOS(artifactList, os, revisionHolder, subDirectory) {
        var revisionsString = '';

        _.each(artifactList, function(artifact, index, allArtifacts) {
            var fileName = artifact.release_type;

            var filesWhichMatch = _.filter(artifact.files, function(file) { return file.type.indexOf(os) == 0; });
            if (filesWhichMatch.length == 0) {
              return;
            }

            if (artifact.release_type == "supported") {
                $('#latestVersion').html(artifact.version);
            }
            if (artifact.release_type != "supported") {
                subDirectory = 'local/' + artifact.version;
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
                var fileName = file.name;
                var splitArtifactType = file.type.split("-");
                var GTMID = splitArtifactType[0].charAt(0).toUpperCase() + splitArtifactType[0].slice(1) + '-' + splitArtifactType[1].charAt(0).toUpperCase() + splitArtifactType[1].slice(1) + "_" + artifact.version;

                if (file.name.indexOf("server") > 0) {
                    revisionsString += "<span><a id=" + GTMID + " class='icon-download' href=" + masterURL + subDirectory + '/' + fileName + ">Server</a></span> + ";

                } else if (file.name.indexOf("agent") > 0) {
                    revisionsString += "<span><a id=" + GTMID + " class='icon-download' href=" + masterURL + subDirectory + '/' + fileName + ">Agent</a></span>";
                }
            });
            revisionsString += "</div>";

            revisionsString += '<div>'
            _.each(filesWhichMatch, function(file, index, list) {
                if (file.name.indexOf("server") > 0) {
                    revisionsString += '<div class="sha1">';
                    revisionsString += "<div> <b>Server MD5</b> " + file.md5sum + " </div>";
                    revisionsString += "<div> <b>Server SHA1</b> " + file.sha1sum + "</div>";
                    revisionsString += '</div>';

                } else if (file.name.indexOf("agent") > 0) {
                    revisionsString += '<div class="md5">';
                    revisionsString += "<div> <b>Agent MD5</b> " + file.md5sum + " </div>";
                    revisionsString += "<div> <b>Agent SHA1</b> " + file.sha1sum + " </div>";
                    revisionsString += '</div>';
                }
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
        if($.os.name == "linux")
            return "linux-deb";
        if($.os.name == "unknown")
            return "win";
        return $.os.name;
    }
    $('a[href="#' + detectOS() + '"]').tab('show');
});
