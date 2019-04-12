#!/bin/bash
if [ "$TRAVIS_BRANCH" != "dev" || "$TRAVIS_PULL_REQUEST" != "false"]; then
  firebase deploy --token $FIREBASE_TOKEN
  npm run lh -- https://circle-teach.firebaseapp.com
fi
