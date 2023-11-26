#!/usr/bin/env sh


# Make sure the script throws out the errors
set -e

# Generate static file
npm run build

# Copy REMADE.md to dist
cp README.md dist

cd dist

# If deploying to own domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'New commit'


# If deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# If deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/rick-lang/programming-language-explainer.git master:gh-pages

cd -