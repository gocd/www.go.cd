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
            renderInstallersByOS(artifactList, "windows", 'windows-revisions', 'gocd');
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
        var i = 0;
        var revisionsString = '';
        while (i < artifactList.length) {
            var artifact = artifactList[i];
            var fileName = artifact.release_type;

            if (artifact.release_type == "supported") {
                $('#latestVersion').html(artifact.version);
            }
            if (artifact.release_type != "supported") {
                subDirectory = 'local/' + artifact.version;
            }

            revisionsString += "<li class=" + artifact.release_type + ">";
            revisionsString += "<div style='float:left;'>"
            revisionsString += "<span class='version'>" + artifact.version + "</span>" + "<span class='revision-link'> (<a target='_blank' href=http://www.github.com/gocd/gocd/commit/" + artifact.git_revision + ">" + artifact.git_revision + "</a>)</span>";
            
            var releasedTime = new Date(artifact.release_time * 1000);
            revisionsString += "<span class='time-stamp' title='" + releasedTime + "'>" + $.timeago(releasedTime.getFullYear() + '-' + (releasedTime.getMonth() + 1) + '-' + releasedTime.getDate()) + "</span>";
            
            revisionsString += "</div>"

            revisionsString += "<div class='link-holder'>";
            revisionsString += "<div class='links'>";
            var j = 0;
            while (j < artifact.files.length) {
                if (!artifact.files[j].type.indexOf(os)) {
                    var fileName = artifact.files[j].name;
                    var splitArtifactType = artifact.files[j].type.split("-");
                    var GTMID = splitArtifactType[0].charAt(0).toUpperCase() + splitArtifactType[0].slice(1) + '-' + splitArtifactType[1].charAt(0).toUpperCase() + splitArtifactType[1].slice(1) + "_" + artifact.version;

                    if (artifact.files[j].name.indexOf("server") > 0) {
                        revisionsString += "<span><a id=" + GTMID + " class='icon-download' href=" + masterURL + subDirectory + '/' + fileName + ">Server</a></span> + ";
                    
                    } else if (artifact.files[j].name.indexOf("agent") > 0) {
                        revisionsString += "<span><a id=" + GTMID + " class='icon-download' href=" + masterURL + subDirectory + '/' + fileName + ">Agent</a></span>";
                    }
                }
                j++;
            }
            revisionsString += "</div>";

            revisionsString += '<div>'
            var j = 0;
            while (j < artifact.files.length) {
                if (!artifact.files[j].type.indexOf(os)) {
                    var file = artifact.files[j];

                    if (artifact.files[j].name.indexOf("server") > 0) {
                        revisionsString += '<div class="sha1">';
                        revisionsString += "<div> <b>Server MD5</b> " + file.md5sum + " </div>";
                        revisionsString += "<div> <b>Server SHA1</b> " + file.sha1sum + "</div>";
                        revisionsString += '</div>';

                    } else if (artifact.files[j].name.indexOf("agent") > 0) {
                        revisionsString += '<div class="md5">';
                        revisionsString += "<div> <b>Agent MD5</b> " + file.md5sum + " </div>";
                        revisionsString += "<div> <b>Agent SHA1</b> " + file.sha1sum + " </div>";
                        revisionsString += '</div>';
                    }
                }
                j++;
            }
            revisionsString += '</div>';


            revisionsString += "</div>"
            revisionsString += "</li>";
            i++;
        }
        $('#' + revisionHolder).append(revisionsString);
    }
});


$(window).load(function() {
    function detectOS() {
        if (navigator.appVersion.indexOf("Win") != -1)
            return "windows";
        else if (navigator.appVersion.indexOf("Mac") != -1)
            return "mac";
        else if (navigator.appVersion.indexOf("Linux") != -1)
            return "linux-deb";
        else if (navigator.appVersion.indexOf("Solaris") != -1)
            return "solaris";
        else "windows"
    }
    $('a[href="#' + detectOS() + '"]').tab('show');
});
