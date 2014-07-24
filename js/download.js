var masterURL = "http://download.go.cd/";
init();

function registerShowCheckSumLinks() {
    $('.show-sha1, .show-md5').click(function() {
        $(this).next().show();
        $(this).hide();
        return false;
    });
}

function fetchArtifacts(callbackFn) {
    $.ajax.send("http://download.go.cd/local/releases.json", function(ArtifactList, status) {
        callbackFn(JSON.parse(ArtifactList).reverse());
    });
}

function init() {
    var selectRevisions = $('#revisions-holder #revisions');
    fetchArtifacts(function(artifactList) {
        selectRevisions.change(function() {
            renderArtifacts(artifactList, $(this)[0].selectedIndex)
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
        //for GTM analytics
        // TODO : remove these conditions after JSON modification 

        var splitArtifactType = artifactType.split("-");
        var GTMID = splitArtifactType[0].charAt(0).toUpperCase() + splitArtifactType[0].slice(1) + '-' + splitArtifactType[1].charAt(0).toUpperCase() + splitArtifactType[1].slice(1);
        //ends : for GTM analytics

        $('.download-links .' + artifactType).html('<a class="icon-download" id="' + GTMID + '" href="'  + masterURL + "gocd/" + fileName + '">' + agentOrServer + '</a>');

        $('.checksum .sha1 .' + artifactType).html(artifact.sha1sum);
        $('.checksum .md5 .' + artifactType).html(artifact.md5sum);

    } else {
        $('.download-links .' + artifactType + ' + .intallers-not-available').show();
        $('.download-links .' + artifactType + ' + .separator').hide();
        $('.checksum > div .' + artifactType).hide();
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

    renderArtifact(artifactList, "mac-server", "Server");
    renderArtifact(artifactList, "mac-agent", "Agent");

    renderArtifact(artifactList, "linuxDeb-server", "Server");
    renderArtifact(artifactList, "linuxDeb-agent", "Agent");

    renderArtifact(artifactList, "linuxRpm-server", "Server");
    renderArtifact(artifactList, "linuxRpm-agent", "Agent");

    renderArtifact(artifactList, "solaris-server", "Server");
    renderArtifact(artifactList, "solaris-agent", "Agent");

    renderArtifact(artifactList, "package-server", "Server");
    renderArtifact(artifactList, "package-agent", "Agent");


    renderCheckSum(artifactList);
}

function renderCheckSum(artifactList) {
    $('#sha1-download').html('<a class="icon-download" href="' + masterURL + 'local/' + artifactList.version + '/sha1.checksum">SHA1</a>');
    $('#md5-download').html('<a class="icon-download" href="' + masterURL + 'local/' + artifactList.version + '/md5.checksum">MD5</a>');
}
