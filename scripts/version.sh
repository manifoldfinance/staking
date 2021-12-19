#!/bin/bash
git_hash='$Format:%h$'

if test "${git_hash}" != '$''Format:%h$'; then
  echo "${git_hash}"
  exit 0
fi

case $# in
  0) ;;
  1) if test ! -d "$1"; then
       echo "error"
       exit 1
     fi
     cd "$1"
     if test $? -eq 1; then
       echo "error"
       exit 1
     fi;;
  *) echo "error"
     exit 1;;
esac

git_hash=`git show -s --format=%h . 2>/dev/null`
if test $? -eq 0; then
  echo "${git_hash}"
  exit 0
fi

echo "unknown"
exit 0
