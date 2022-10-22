#!/bin/bash

set -e

use_colors=$(type tput &> /dev/null && test "$(tput -T "$TERM" colors)" -ge 8 && echo "yes" || echo "no")

function main() {
  if [ $# -ne 1 ]; then
    die "This script requires a URL"
  fi

  prerequisites unzip curl basename cut sed

  local url="$1"
  local filename=$(basename "$url")
  local fileparts=(${filename//-/ })
  local install_dir=$(IFS=- ; echo "${fileparts[*]:0:4}")

  local filehash=$(read_url "${url}.sha256" | cut -f 1 -d " ")

  emph "Welcome to the GoCD Test Drive"
  echo ""

  if [ -z "$filehash" ]; then
    die "Could not retrieve checksum at: ${url}.sha256"
  fi

  emph "Checking dependencies..."
  echo ""

  if test -f "$filename" && verify "$filename" "$filehash"; then
    echo "Cached ${filename} matches checksum; no need to freshen the download"
  else
    if [ -d "$filename" ]; then
      die "You have a directory named ${filename}; please remove this before running the GoCD Test Drive"
    fi

    echo "Fetching GoCD..."

    download "$url" "$filename" || die "Failed to download $url"
    verify "$filename" "$filehash" || die "Downloaded file \"${filename}\" does not match checksum ${filehash}!"
  fi

  emph "Unpacking archive ${filename}"
  unzip -q -o "$filename" || die "Failed to unpack archive ${filename}"

  test -d "$install_dir" || die "Did not unpack to the expected folder: ${install_dir}"

  emph "Entering directory ${install_dir}"
  cd "$install_dir"

  if [ -f run-gocd ]; then
    emph "Executing run-gocd"
    chmod a+rx run-gocd && ./run-gocd
  elif [ -f run-gocd.exe ]; then
    # running bash in Windows?
    emph "Executing run-gocd.exe"
    chmod a+rx run-gocd.exe && ./run-gocd.exe
  else
    die "Unpacked archive does not contain run-gocd executable!"
  fi
}

function prerequisites() {
  for cmd in $@; do
    if ! type "$cmd" &> /dev/null; then
      die "This script requires ${cmd}"
    fi
  done
}

function read_url() {
  local url="$1"
  curl -fsSL "$url"
}

function download() {
  local url="$1"
  local file="$2"

  curl -fSL "$url" -o "$file"
}

function verify() {
  local file="$1"
  local hash="$2"

  if type shasum &> /dev/null; then
    [ "$hash" = $(shasum -a 256 "$file" | cut -d " " -f 1) ] || return 1
  elif type sha &> /dev/null; then
    [ "$hash" = $(sha -a 256 "$file" | cut -d " " -f 1) ] || return 1
  elif type sha256sum &> /dev/null; then
    [ "$hash" = $(sha256sum "$file" | cut -d " " -f 1) ] || return 1
  elif type openssl &> /dev/null; then
    [ "$hash" = $(openssl dgst -sha256 "$file" | cut -d " " -f 2) ] || return 1
  else
    warn "[WARNING] Unable to verify SHA-256 because you don't have \`shasum\`, \`sha256sum\`, \`sha\`, or \`openssl\` installed."
  fi
}

function emph() {
  if [ "yes" = "$use_colors" ]; then
    echo -e "\033[1;32m$*\033[0m"
  else
    echo "$*"
  fi
}

function warn() {
  if [ "yes" = "$use_colors" ]; then
    echo -e "\033[1;33m$*\033[0m" >&2
  else
    echo "$*" >&2
  fi
}

function yell() {
  if [ "yes" = "$use_colors" ]; then
    echo -e "\033[37;41m$*\033[0m" >&2
  else
    echo "$*" >&2
  fi
}

function die() {
  yell $@
  exit 1
}

main $@
