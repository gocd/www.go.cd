$(function() {
    var masterURL = "https://download.go.cd/";

    if($('#show-checksum').length === 0) {
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
            renderInstallersByOS(artifactList, "mac", 'mac-revisions', 'gocd');
            renderInstallersByOS(artifactList, "solaris", 'solaris-revisions', 'gocd');
            renderInstallersByOS(artifactList, "linuxDeb", 'linuxDeb-revisions', 'gocd-deb');
            renderInstallersByOS(artifactList, "linuxRpm", 'linuxRpm-revisions', 'gocd-rpm');
            renderInstallersByOS(artifactList, "package", 'package-revisions', 'gocd');
            renderInstallersByOS(artifactList, "win", 'windows-revisions', 'gocd');
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
            return  "Server";
        } else if (file.name.indexOf("agent") > 0) {
            return  "Agent";
        }
    }


    function setupJourneyTracker(artifactList) {
        if(typeof jtr === "undefined") { return; }
        _.each(artifactList, function(artifact) {
            _.each(artifact.files, function(file) {
                var type = downloadType(file);
                if(!type) { return; }
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
        $.getJSON(masterURL + "local/releases.json", function(ArtifactList, status) {
            var supported = _.chain(ArtifactList).where({release_type: "supported"}).reject(function(artifact) { return artifact.hidden == true }).value();
            var unsupported = _.chain(ArtifactList).reject({release_type: "supported"}).reject(function(artifact) { return artifact.hidden == true }).value().reverse();
            callbackFn(supported.concat(unsupported));
            hideLoader();
        });
    }

    function renderInstallersByOS(artifactList, os, revisionHolder, subDirectory) {
        var revisionsString = '';
        var latestReleaseTime = 0;
        _.each(artifactList, function(artifact, index, allArtifacts) {
            var fileName = artifact.release_type;

            var filesWhichMatch = _.filter(artifact.files, function(file) { return file.type.indexOf(os) == 0; });
            if (filesWhichMatch.length == 0) {
              return;
            }

            if (artifact.release_type == "supported" && artifact.release_time > latestReleaseTime) {
                $('#latestVersion').html(artifact.version);
		latestReleaseTime = artifact.release_time;
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
                var type = downloadType(file);
                if (!type) { return; }
                revisionsString += '<span><a id="' + GTMID(artifact, file) + '" class="icon-download" href="' + masterURL + subDirectory + '/' + file.name + '">' + type + '</a></span>';
                if (type === "Server") {
                    revisionsString += " + ";
                }
            });
            revisionsString += "</div>";

            revisionsString += '<div>'
            _.each(filesWhichMatch, function(file, index, list) {
                var type = downloadType(file);
                if (!type) { return; }
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
        if($.os.name == "linux")
            return "linux-deb";
        if($.os.name == "unknown")
            return "win";
        return $.os.name;
    }
    $('a[href="#' + detectOS() + '"]').tab('show');
});
