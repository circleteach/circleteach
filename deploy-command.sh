#!/bin/bash
if [ "$TRAVIS_BRANCH" != "dev"]; then
  firebase deploy --token $FIREBASE_TOKEN
fi

if [ "$TRAVIS_PULL_REQUEST" != "false"]; then
  npm run lh -- https://circle-teach.firebaseapp.com
fi
