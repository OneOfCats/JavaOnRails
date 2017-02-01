
RightNow.Widget.CTKMsg=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._msgTxtSpan=document.getElementById("rn_"+this.instanceID);if(!this._msgTxtSpan)
{return false;}
this._getLinks();};RightNow.Widget.CTKMsg.prototype={_getLinks:function()
{var msgLinks=this._msgTxtSpan.getElementsByTagName("a");for(var i=0;i<msgLinks.length;i++)
{var href=msgLinks[i].getAttribute('href');var strpos=-1;for(var u in this.data.js.urls)
{strpos=href.indexOf(this.data.js.urls[u]);if(strpos!=-1)
{var newHref=href.substr(0,(strpos+this.data.js.urls[u].length));href=href.substr(strpos+this.data.js.urls[u].length,href.length-1);var hrefArray=href.split("/");for(var j=0;j<hrefArray.length;j++)
{if(hrefArray[j]=="ask")
{newHref+="/"+this.data.js.contactlinks.email;}
else if(hrefArray[j]=="phone")
{newHref+="/"+this.data.js.contactlinks.phone;}
else if(hrefArray[j]=="chat"&&hrefArray[j+1]&&hrefArray[j+1]=="chat_launch")
{newHref+="/"+this.data.js.contactlinks.chat;hrefArray[j+1]="";}
else if(hrefArray[j]!="")
{newHref+="/"+hrefArray[j];}}
newHref+=this.data.js.appendedParameters;msgLinks[i].setAttribute('href',newHref);break;}}}}}
RightNow.Widget.KeywordText2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._setFilter();this._preselectTxt="";this._initalTxt="";this._textElement=document.getElementById("rn_"+this.instanceID+"_Text");RightNow.Event.subscribe("evt_keywordChangedResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_reportResponse",this._onChangedResponse,this);RightNow.Event.subscribe("evt_getFiltersRequest",this._onGetFiltersRequest,this);if(this._textElement)
{if(this.data.attrs.preselect_text){this._preselectTxt=this.data.attrs.preselect_text;}
if(this.data.js.preselect_kw){this._initialTxt=this.data.js.preselect_kw;}
this._textElement.value=this._initialTxt?this._initialTxt:this._preselectTxt;YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Text","click",this._onAction,null,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Text","keypress",this._onAction,null,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Text","blur",this._onBlur,null,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Text","change",this._onChange,null,this);if(this.data.attrs.initial_focus){try{this._textElement.focus();}catch(e){}}}
else{return false;}};RightNow.Widget.KeywordText2.prototype={_onAction:function(evt)
{if(this._textElement.value==this._preselectTxt){this._textElement.value="";}},_onChange:function(evt)
{if(this._textElement.value!=this._preselectTxt){this._eo.data=this._textElement.value;this._eo.filters.data=this._textElement.value;RightNow.Event.fire("evt_keywordChangedRequest",this._eo);}},_onBlur:function(evt)
{if(this._textElement.value==""){this._textElement.value=this._preselectTxt;}},_onGetFiltersRequest:function(type,args)
{if(this._textElement){if(this._textElement.value==this._preselectTxt){this._eo.filters.data=YAHOO.lang.trim("");}
else{this._eo.filters.data=YAHOO.lang.trim(this._textElement.value);}}
RightNow.Event.fire("evt_searchFiltersResponse",this._eo);},_setFilter:function()
{this._eo.w_id=this.instanceID;this._eo.filters={"searchName":this.data.js.searchName,"data":this.data.initialValue,"rnSearchType":this.data.js.rnSearchType,"report_id":this.data.attrs.report_id};},_onChangedResponse:function(type,args)
{if(RightNow.Event.isSameReportID(args,this.data.attrs.report_id))
{var data=RightNow.Event.getDataFromFiltersEventResponse(args,this.data.js.searchName,this.data.attrs.report_id);var newValue;if(data==null)
newValue=(this.data.initialValue==null)?"":this.data.initialValue;else
newValue=data;if(this._textElement&&(this._textElement.value!=newValue)){if(newValue==""){this._textElement.value=this._preselectTxt;}
else{this._textElement.value=newValue;}}}}};
RightNow.Widget.SearchButton2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._requestInProgress=false;this._searchButton=document.getElementById("rn_"+this.instanceID+"_SubmitButton");this._enableClickListener();RightNow.Event.subscribe("evt_reportResponse",this._onSearchResponse,this);};RightNow.Widget.SearchButton2.prototype={_startSearch:function(evt)
{if(this._requestInProgress)
return false;if(!this.data.attrs.popup_window&&(!this.data.attrs.report_page_url&&(this.data.attrs.target==='_self')))
this._disableClickListener();if(YAHOO.env.ua.ie!==0)
{if(!this._parentForm)
this._parentForm=YAHOO.util.Dom.getAncestorByTagName("rn_"+this.instanceID,"FORM");if(this._parentForm&&window.external&&"AutoCompleteSaveForm"in window.external)
{window.external.AutoCompleteSaveForm(this._parentForm);}}
var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.filters={report_id:this.data.attrs.report_id,reportPage:this.data.attrs.report_page_url,target:this.data.attrs.target,popupWindow:this.data.attrs.popup_window,width:this.data.attrs.popup_window_width_percent,height:this.data.attrs.popup_window_height_percent};RightNow.Event.fire("evt_searchRequest",eo);},_onSearchResponse:function(type,args)
{if(args[0].filters.report_id==this.data.attrs.report_id)
this._enableClickListener();},_enableClickListener:function()
{this._requestInProgress=false;YAHOO.util.Event.addListener(this._searchButton,"click",this._startSearch,null,this);},_disableClickListener:function()
{this._requestInProgress=true;YAHOO.util.Event.removeListener(this._searchButton,"click",this._startSearch);}};