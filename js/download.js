$(document).ready(function() {
    bindDropDown();

    function registerShowCheckSumLinks() {
        $('.show-sha1, .show-md5').click(function() {
            $(this).next().show();
            $(this).hide();
            return false;
        });
    }

    function fetchArtifacts(callbackFn) {
        jQuery.ajax.send("http://download.go.cd/local/releases.json", function(ArtifactList, status) {
            callbackFn(JSON.parse(ArtifactList).reverse());
        });
    }

    function bindDropDown() {
        var selectRevisions = jQuery('#revisions-holder #revisions');
        fetchArtifacts(function(artifactList) {
            selectRevisions.change(function() {
                renderArtifacts(artifactList, jQuery(this)[0].selectedIndex)
            });
            var i = 0;
            while (i < artifactList.length) {

                var artifact = artifactList[i];
                var isSelected = "";
                var releaseType = "";
                if (artifact.release_type == "supported") {
                    isSelected = "selected";
                    releaseType = " [" + artifact.release_type + "]";
                }
                selectRevisions.append("<option " + isSelected + ">" + artifact.version + releaseType + "</option>");
                if (artifact.release_type == "supported") {
                    $('#latestVersion').html(artifact.version);
                    renderArtifacts(artifactList, i)
                }
                i++;
            }
        });
        registerShowCheckSumLinks();
    }

    function getArtifactByType(artifactsForVersion, type) {
        var j = artifactsForVersion.files.length;
        while (j--) {
            if (artifactsForVersion.files[j].type === type)
                return artifactsForVersion.files[j];
        }
    }

    function renderArtifact(artifactList, artifactType, agentOrServer) {
        var artifact = getArtifactByType(artifactList, artifactType);

        if (typeof artifact !== "undefined" || artifact != null) {
            var fileName = artifact.name;
            var masterURL = "http://download.go.cd/gocd/";
            //for GTM analytics
            // TODO : remove these conditions after JSON modification 
            if (artifactType == 'zip-server') artifactType = "package-server";
            if (artifactType == 'zip-agent') artifactType = "package-agent";
            if (artifactType == 'osx-server') artifactType = "mac-server";
            if (artifactType == 'osx-agent') artifactType = "mac-agent";
            if (artifactType == 'debian-server') artifactType = "linuxDeb-server";
            if (artifactType == 'debian-agent') artifactType = "linuxDeb-agent";
            if (artifactType == 'rpm-server') artifactType = "linuxRpm-server";
            if (artifactType == 'rpm-agent') artifactType = "linuxRpm-agent";

            var splitArtifactType = artifactType.split("-");
            var GTMID = splitArtifactType[0].charAt(0).toUpperCase() + splitArtifactType[0].slice(1) + '-' + splitArtifactType[1].charAt(0).toUpperCase() + splitArtifactType[1].slice(1);
            //ends : for GTM analytics
            jQuery('.download-links .' + artifactType).html('<a class="download" id=' + GTMID + ' onclick="record_download('+"'"+'' + GTMID + ''+"'"+');"   href=' + masterURL + fileName + ">" + agentOrServer + "</a>");
            jQuery('.checksum .sha1 .' + artifactType).html(artifact.sha1sum);
            jQuery('.checksum .md5 .' + artifactType).html(artifact.md5sum);

        } else {
            jQuery('.download-links .' + artifactType + ' + .intallers-not-available').show();
            jQuery('.download-links .' + artifactType + ' + .separator').hide();
            jQuery('.checksum > div .' + artifactType).hide();
        }
    }

    function renderArtifacts(ArtifactList, versionIndex) {
        var artifactList = ArtifactList[versionIndex];
        $('.intallers-not-available').hide();
        $('.separator, .checksum span').css({
            "display": "inline"
        });

        $('.windows-server, .windows-agent, .mac-server, .mac-agent, .linuxdeb-server, .linuxdeb-agent, .linuxrpm-server, .linuxrpm-agent, .solaris-server, .solaris-agent, .package-server, .package-agent').children().remove();

        renderArtifact(artifactList, "windows-server", "Server");
        renderArtifact(artifactList, "windows-agent", "Agent");

        renderArtifact(artifactList, "osx-server", "Server");
        renderArtifact(artifactList, "osx-agent", "Agent");

        renderArtifact(artifactList, "debian-server", "Server");
        renderArtifact(artifactList, "debian-agent", "Agent");

        renderArtifact(artifactList, "rpm-server", "Server");
        renderArtifact(artifactList, "rpm-agent", "Agent");

        renderArtifact(artifactList, "solaris-server", "Server");
        renderArtifact(artifactList, "solaris-agent", "Agent");

        renderArtifact(artifactList, "zip-server", "Server");
        renderArtifact(artifactList, "zip-agent", "Agent");
    }
})
