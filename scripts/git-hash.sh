#!/usr/bin/env bash
set -Eeo pipefail
# -*- tab-width: 4; encoding: utf-8 -*-
## v0.0.2
## CC0-1.0
# Return the short git hash for a source tree
#
# > usage
# $ git-hash.sh [dir]
#
# The Current directory is assumed to identify the source tree unless supplied with argument
## The source tree is the result of `git archive'.
# `git archive' inserts the abbreviated hash of the archive's commit into this script
### `.gitattributes' file:
# `.gitattributes`
# git-hash.sh		export-subst
###
# @see  {@link https://git-scm.com/docs/gitattributes}

# shellcheck disable=SC2154
git_hash=$Format:%h$

if test "${git_hash}" != $Format:%h$; then
  echo "${git_hash}"
  exit 0
fi

## @function secondary
## @summary The source tree is a git repository.

case $# in
  0) ;;
  1) if test ! -d "$1"; then
       echo "error"
       exit 1
     fi
     cd "$1" || exit
     if test $? -eq 1; then
       echo "error"
       exit 1
     fi;;
  *) echo "error"
     exit 1;;
esac

git_hash=$(git show -s --format=%h . 2>/dev/null)
if test $? -eq 0; then
  echo "${git_hash}"
  exit 0
fi

## @return Error
## @summary application unable to resolve input command, exit
# @note TRAP could be used but this is portable (posix)
echo "ERROR: Command not found"
exit 127