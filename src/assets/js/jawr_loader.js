
if(!window.JAWR)
JAWR={};JAWR.loader={usedBundles:{},script:function(path){this.insert(this.jsbundles,'insertScript',this.mapping,path);},style:function(path,media){this.insert(this.cssbundles,'insertCSS',this.cssmapping,path,media);},insert:function(bundles,func,mappingToUse,path,media){for(var x=0;x<bundles.length;x++){var bundle=bundles[x];if(bundle.belongsToBundle(path)&&!this.usedBundles[bundle.name]){this.usedBundles[bundle.name]=true;var pathtoRender=bundle.alternateProductionURL?bundle.alternateProductionURL:this.normalizePath(mappingToUse+'/'+bundle.prefix+bundle.name);if(bundle.ieExpression)
this.insertCondComment(bundle.ieExpression,func,pathtoRender,media);else this[func](pathtoRender,media);}}},insertScript:function(path){document.write(' <script type="text/javascript" src="'+path+'" > </script> ');},insertCondComment:function(condition,func,path,media){document.write('<!--['+condition+']>\n');this[func](path,media);document.write('<![endif]-->');},normalizePath:function(path){while(path.indexOf('//')!=-1)
path=path.replace('../../https@','/');if(path.indexOf("http")==0)
path=path.replace(/http:\/(\w)/g,"http://$1").replace(/https:\/(\w)/g,"https://$1");return path;},insertCSS:function(path,media){media=media?media:'screen';document.write(' <link rel="stylesheet" type="text/css" media="'+media+'" href="'+path+'" /> ');}}
JAWR.ResourceBundle=function(name,prefix,itemPathList,ieExpression,alternateProductionURL){this.name=name;this.prefix=prefix;this.itemPathList=itemPathList;this.ieExpression=ieExpression;this.alternateProductionURL=alternateProductionURL;}
JAWR.ResourceBundle.prototype.belongsToBundle=function(path){if(path==this.name)
return true;if(!this.itemPathList)
return false;for(var x=0;x<this.itemPathList.length;x++){if(this.itemPathList[x]==path)
return true;}
return false;}
JAWR.app_context_path='../SSOCore';JAWR.loader.mapping='../../https@acw.elsevier.com/SSOCore';(function(){function r(n,p,i,ie,aU){return new JAWR.ResourceBundle(n,p,i,ie,aU);}
JAWR.loader.jsbundles=[r("../bundles/jquery.js","../gzip_N587762021/default.htm",["../cars/script/jquery-1.9.1.js","../cars/script/jquery-migrate-1.2.1.min.js","../cars/script/jquery-ui.js"]),r("../bundles/jqueryjcars.js","../gzip_N2034827169/default.htm",["../cars/script/jquery-1.9.1.js","../cars/script/jquery-migrate-1.2.1.min.js","../cars/script/jquery-ui.js","../cars/script/jcars.js"]),r("../bundles/oauthv2.js","../gzip_N320953412/default.htm",["../static/js/jquery.js","../static/js/jquery-ui.js","../static/js/main.js","../static/js/plugin.js"]),r("../bundles/jquery-ui.js","../gzip_95366285/default.htm",["../cars/script/jquery-ui.js"]),r("../bundles/jcars.js","../gzip_563036366/default.htm",["../cars/script/jcars.js"])];JAWR.loader.cssbundles=[r("../bundles/jcars.css","../gzip_N1903285006/default.htm",["../cars/css/jcars.css"]),r("../bundles/ssoadmin.css","../gzip_N2012826572/default.htm",["../css/sso_core_admin.css"]),r("../bundles/oauth.css","../gzip_N1786009821/default.htm",["../static/css/oauth.css","../static/css/candidatePath.css"]),r("../bundles/oauthv2.css","../gzip_76489013/default.htm",["../static/css/main.css","../static/css/main_fKEr1A8.css","../static/css/form-elements.css","../static/css/fonts.css","../static/css/oauth-v2.css"]),r("../bundles/cars.css","../gzip_N978075383/default.htm",["../css/cars/cars_common.css"]),r("../static/css/ie.css","../gzip_N1220955601/default.htm")];JAWR.loader.cssmapping='../../https@acw.elsevier.com/SSOCore';})();