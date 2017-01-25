var fired=false;var firing=false;var fireTime=null;function Export(docCount)
{var staleFireTime=false;if(fireTime!=null)
staleFireTime=(new Date().getTime()-fireTime.getTime()>waitTime);if(!firing)
{try
{firing=true;fireTime=new Date();var frm=document.exportForm;var exportFormat="";if(frm.exportFormat)
{exportFormat=frm.exportFormat.value;}
if(exportFormat=="REFWORKS")
{frm.target="RefWorksMain";}
else
{frm.target="";}
if(!fired||staleFireTime)
{fired=true;for(j=0;j<frm.elements.length;j++){if(frm.elements[j].name=="view"){contentType=frm.elements[j].selectedIndex;if(frm.elements[j].options[contentType].value=="SpecifyFields"){if(!checkEmptySelection(frm)){reFillSelectedFields(frm);}
else{popUpNoSelectionError("EXPORT");firing=false;return false;}}}}}}
finally
{firing=false;}}}
function resetForm()
{var frm=document.exportForm;fired=false;firing=false;frm.target="";}
function Cancel()
{window.history.go(-1);}
function Cancel(frm)
{frm.target="";window.history.go(-1);}
function CreateBibliography()
{var frm=document.QuikbibForm;frm.target="RefworksMain";}