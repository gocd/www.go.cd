param($url)

try {
  [System.Reflection.Assembly]::LoadWithPartialName("System.Net.Cache")
} catch {
}

function Main {
  param($url)

  $filename = [io.path]::GetFileName($url)
  $install_dir = $("$filename" -replace '-([^-]+)\.zip$')

  Emph 'Welcome to the GoCD Test Drive'
  ''

  $filehash=$(try { WebGetString "$url" } catch { Die "Could not retrieve checksum at: ${url}.sha256" })

  If ([string]::IsNullOrEmpty("$filehash")) {
    Die "Could not retrieve checksum at: ${url}.sha256"
  }

  Emph "Checking dependencies..."
  ''

  if ((Test-Path "$filename" -PathType Leaf) -and (Verify "$filename" "$filehash")) {
    "Cached ${filename} matches checksum; no need to freshen the download"
  } else {
    if (Test-Path "$filename" -PathType Container) {
      Die "You have a directory named ${filename}; please remove this before running the GoCD Test Drive"
    }

    'Fetching GoCD...'
    try { (WebGet "$url" "$filename") } catch { Die "Failed to download $url" }

    if (-not (Verify "$filename" "$filehash")) {
      Die "Downloaded file ""${filename}"" does not match checksum ${filehash}!"
    }
  }

  Emph "Unpacking archive ${filename}"

  try {
    # Expand-Archive is not available in Server 2012 and Windows 8.1 be default
    [System.Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem") | Out-Null
    [System.IO.Compression.ZipFile]::ExtractToDirectory($(Join-Path -Path $(Get-Location) -ChildPath $filename), $(Get-Location))
  } catch {
    "Failed to unpack archive ${filename}"
  }

  if (-not (Test-Path "$install_dir" -PathType Container)) {
    Die "Did not unpack to the expected folder: ${install_dir}"
  }

  Emph "Entering directory ${install_dir}"
  Push-Location -Path "$install_dir"

  try {
    if (Test-Path "run-gocd" -PathType Leaf) {
      Emph "Executing run-gocd"

      # We're on Unix
      if (Get-Command chmod) {
        chmod a+rx "./run-gocd"
        if (Test-Path "./packages/jre/bin" -PathType Container) {
          chmod -R a+rx "./packages/jre/bin"
        }
      }

      ./run-gocd
    } elseif (Test-Path "run-gocd.exe" -PathType Leaf) {
      Emph "Executing run-gocd.exe"
      ./run-gocd.exe
    } else {
      Die "Unpacked archive does not contain run-gocd executable!"
    }
  } finally {
    Pop-Location
  }
}

function WebGet {
  param($url, $file)

  "Fetching $url"

  $uri = New-Object "System.Uri" "$url"
  $req = [System.Net.HttpWebRequest]::Create($uri)
  $req.set_Timeout(15000)
  $res = $req.GetResponse()

  # get the file length
  $total = [System.Math]::Floor($res.get_ContentLength()/1024)

  $rstr = $res.GetResponseStream()

  # open the destination file stream
  $dst = New-Object -TypeName System.IO.FileStream -ArgumentList $file, Create; $buf = New-Object byte[] 10KB
  $len = $rstr.Read($buf, 0, $buf.length)
  $soFar = $len

  while ($len -gt 0) {
    $dst.Write($buf, 0, $len)
    $len = $rstr.Read($buf, 0, $buf.length)
    $soFar = $soFar + $len

    [System.Console]::CursorLeft = 0
    [System.Console]::Write("Downloaded {0}K of {1}K", [System.Math]::Floor($soFar/1024), $total)
  }

  "`nDownload complete: $file"
  $dst.Flush()
  $dst.Close()
  $dst.Dispose()
  $rstr.Dispose()
}

function WebGetString {
  param($url)

  $client=New-Object System.Net.WebClient
  $client.CachePolicy = New-Object System.Net.Cache.RequestCachePolicy(6)

  $($client.DownloadString("${url}.sha256") | ForEach-Object { $_.split(" ")[0] })
}

function Die {
  Write-Error "$args"
  break
}

function Emph {
  Write-Host "$args" -fore green
}

function Verify {
  param($file, $hash)

  $calculated = $(Get-FileHash -Path "$file" -Algorithm SHA256 | Select -ExpandProperty Hash)

  return "$hash" -eq "$calculated"
}

If ($PSBoundParameters.Count -eq 0) {
  Die 'You must provide a URL'
}

Main $url
