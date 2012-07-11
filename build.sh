#!/bin/bash


set -e
echo "====================================="
echo "building dojo app..."
echo "====================================="



dojo_app_skip_build=$1

if [ $dojo_app_skip_build ]; then
	echo "====================================="
	echo "SKIPING building dojo app because dojo.app.skip_build = true"
	echo "====================================="   
    exit 0;
fi



echo "# Base directory for this entire project"
BASEDIR=$(cd $(dirname $0) && pwd)
echo $BASEDIR
echo .

echo "# Source directory for unbuilt code"
SRCDIR="$BASEDIR/src/main/webapp/resources/js"
echo $SRCDIR
echo .

echo "# Directory containing dojo build utilities"
TOOLSDIR="$SRCDIR/util/buildscripts"
echo $TOOLSDIR
echo .

echo "# Destination directory for built code"
#DISTDIR="$BASEDIR/dist"
DISTDIR="$SRCDIR/dist"
echo $DISTDIR
echo .

echo "# Module ID of the main application package loader configuration"
LOADERMID="app/run"
echo $LOADERMID
echo .

echo "# Main application package loader configuration"
LOADERCONF="$SRCDIR/$LOADERMID.js"
echo $LOADERCONF
echo .

echo "# Main application package build configuration"
PROFILE="$SRCDIR/app/app.profile.js"
echo $PROFILE
echo .

# Configuration over. Main application start up!

if [ ! -d "$TOOLSDIR" ]; then
    echo "Can't find Dojo build tools -- did you initialise submodules? (git submodule update --init --recursive)"
    exit 1
fi

echo "Building application with $PROFILE to $DISTDIR."

echo -n "Cleaning old files..."
rm -rf "$DISTDIR"
echo " Done"

cd "$TOOLSDIR"

if which node >/dev/null; then
    node ../../dojo/dojo.js load=build --require "$LOADERCONF" --profile "$PROFILE" --releaseDir "$DISTDIR" "$@"
elif which java >/dev/null; then
    java -Xms256m -Xmx256m  -cp ../shrinksafe/js.jar:../closureCompiler/compiler.jar:../shrinksafe/shrinksafe.jar org.mozilla.javascript.tools.shell.Main  ../../dojo/dojo.js baseUrl=../../dojo load=build --require "$LOADERCONF" --profile "$PROFILE" --releaseDir "$DISTDIR" "$@"
else
    echo "Need node.js or Java to build!"
    exit 1
fi

cd "$BASEDIR"

LOADERMID=${LOADERMID//\//\\\/}

# Copy & minify index.html to dist
cat "$SRCDIR/index.html" | tr '\n' ' ' | \
perl -pe "
  s/<\!--.*?-->//g;                          # Strip comments
  s/isDebug: *1/deps:['$LOADERMID']/;        # Remove isDebug, add deps
  s/<script src=\"$LOADERMID.*?\/script>//;  # Remove script app/run
  s/\s+/ /g;                                 # Collapse white-space" > "$DISTDIR/index.html"

echo "Build complete"
