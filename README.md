ops4j_pax_war_archetype_fzlbpms_template
========================================

This project is part a academic term paper.
Its main purpose is be a base model to another funcional projects.
To achieve this, the "mvn archetye:create-from-project" will be issued to create a archetype.

This can be interesting for others because its configuration.
This is configured to be a war (serlvet 2.5) package that can be deployed in a web container and in a osgi container too.
This is based on war a rchetype cited in http://blog.nanthrax.net/tag/pax-web/.

Beside this, it was based on https://github.com/csnover/dojo-boilerplate/
The (maybe) interesting point here is that, beside dojo build benefits:
the build will ocurr automatically at maven project build.
if the dojo sdk are not present, it will be downloaded automatically base on <dojo.version> pom propertie, by wagon maven plugin.

I am learning all this technology, so any help is well accepted.
Do not use this project template in production! Not yet!



HOW TO BUILD...
========================================

1) For a complete build (either maven build as dojo app build)

Check the ${dojo.app.skip_build} pom propertie:
 = true result in build.sh skip the dojo app building process.
 = false in order to build.sh proceed dojo app build.


Go to the build pom section, and check if
wagon-maven-plugin skyp configuration tag is marked to false in order to be assured that the
dojo sdk will be downloaded and be avaible to be unpackaged and extracted to correct
folders expected by build.sh. Theese folders are 
	webapp/resoureces/js/dojo
	webapp/resoureces/js/dijit
	webapp/resoureces/js/dojox
	webapp/resoureces/js/util
	To be documented: the unpack and copy tasks are proceeded by antrun plugin tasks.
	Note1: the dojo sdk version you want to download is configure using ${dojo.version} pom property 
	Note2: If dojo sdk is present, is ok to setup this skip tag value to true. (default is false).
	
	
	
check ${dojo.app.use_rhino_or_node} pom property value
 = node (or any other value): node will be used to proceed with dojo app build
 = rhino: rhino will be used
 
How to create a archetype from this one
========================================
$>cd this_project_home
$>mvn archetype:create-from-project
$>cd target/generated-sources/archetype
$>mvn install
To see the result:
$> mvn archetype:generate 

(at my computer...)
(... many archetypes avaible)
618: local -> br.edu.fzlbpms.template:ops4j_pax_war_archetype_fzlbpms_template-archetype (ops4j_pax_war_archetype_fzlbpms_template war)
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 205: 


 
Some another notes:
========================================
mvn clean command will clean  webapp/resoureces/js/dist too.



#-----------------------------------------------------------#
LoginDialog admin/admin123 
#-----------------------------------------------------------#
When main page loads, a login dialog appears.
This is a decision desing that another bpms projects will implement.
Change it is not dificult.




 

