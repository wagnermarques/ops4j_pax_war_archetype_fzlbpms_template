#!/bin/bash


set -e



#!/bin/bash

dojo_app_skip_build=$1
use_rhino_or_node=$2



echo "====================================="
echo "building dojo app..."
echo "[debug] dojo_app_skip_build = $dojo_app_skip_build"
echo "[debug] use_rhino_or_node = $use_rhino_or_node"
echo "====================================="



if [ $dojo_app_skip_build == "true" ]; then
	echo "====================================="
	echo "SKIPING building dojo app because dojo.app.skip_build = true"
	echo "====================================="   
    exit 0;
fi


echo .
echo .
echo "[debug] DETERMINING BETWEEN node AND rhino"
# (if rhino was not choose at pom property, node will be used
if [ $use_rhino_or_node ]; then 
    echo "[debug] use_rhino_or_node pom property was informed"
    if [ $use_rhino_or_node == "rhino" ]; then
	echo "[debug] and is equal to rhino"
	if  which java >/dev/null ; then 
	    use_rhino_or_node="rhino";	    
	else
	    echo "[error] but java is not installed!"
	    exit 1;	   
	fi
    else
	echo "[debug] (informed) and IS NOT EQUAL to rhino";
	echo "[debug] (informed) transforming value property to node";
	if which node >/dev/null; then 
	    use_rhino_or_node="node";
	else
	    echo "[error] but node is not installed!";
	    exit 1;
	fi
    fi
else
    echo "[debug] use_rhino_or_node pom property WAS NOT informed"
    echo "[debug] (not informed) so, using node";
    if  which node >/dev/null; then 
	echo "[error] but node is not installed!"
	exit 1;
    else
	use_rhino_or_node="node";
    fi    
fi
echo "[debug] so $use_rhino_or_node will be used"




echo .
echo .
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

echo .
echo .
echo "--releaseDir..."
echo "$DISTDIR" "$@"
echo .
echo .

if [ $use_rhino_or_node == "node" ] ; then
    node ../../dojo/dojo.js load=build --require "$LOADERCONF" --profile "$PROFILE" --releaseDir "$DISTDIR" 
elif [ $use_rhino_or_node == "rhino" ] ; then
    java -Xms256m -Xmx256m  -cp ../shrinksafe/js.jar:../closureCompiler/compiler.jar:../shrinksafe/shrinksafe.jar org.mozilla.javascript.tools.shell.Main  ../../dojo/dojo.js baseUrl=../../dojo load=build --require "$LOADERCONF" --profile "$PROFILE" --releaseDir "$DISTDIR"
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
