
RightNow.Widget.SelectionInput=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._formErrorLocation=null;this._hidden=false;this._lastDynamicFieldValues=null;if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO){this._inputField=[document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_1"),document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_0")];if(this._inputField[0])
this._parentNode=this._inputField[0].parentNode.parentNode;else if(this._inputField[1])
this._parentNode=this._inputField[1].parentNode.parentNode;}
else{this._inputField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name);this._parentNode=this._inputField.parentNode;}
if(!this._inputField||(YAHOO.lang.isArray(this._inputField)&&(!this._inputField[0]||!this._inputField[1])))
return;if(this.data.js.fieldVisibility){if(!this._lastDynamicFieldValues){this._hidden=true;this.data.attrs.required=false;if(this._inputField){YAHOO.util.Dom.addClass(this._parentNode,"rn_Hidden");}
this._lastDynamicFieldValues=new Array();}}
if(this.data.attrs.initial_focus)
{if(this._inputField[0]&&this._inputField[0].focus)
this._inputField[0].focus();else if(this._inputField.focus)
this._inputField.focus();}
if(this.data.js.hint)
this._initializeHint();if(this.data.attrs.validate_on_blur&&this.data.attrs.required)
YAHOO.util.Event.addListener(this._inputField,"blur",function(){this._formErrorLocation=null;this._validateRequirement();},null,this);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidate,this);RightNow.Event.subscribe("evt_hierValueNotificationRequest",this._notifyHierValues,this);RightNow.Event.subscribe("evt_fieldChange",this._onDynamicFieldChange,this,this.data.js.fieldVisibility);var fieldName=this.data.js.name;YAHOO.util.Event.addListener(this._inputField,"click",this._notifyHierValues,null,this);if(fieldName==="country_id")
YAHOO.util.Event.addListener(this._inputField,"change",this._countryChanged,null,this);else if(fieldName==="prov_id")
RightNow.Event.subscribe("evt_formFieldProvinceResponse",this._onProvinceResponse,this);var eo=new RightNow.Event.EventObject();RightNow.Event.fire("evt_hierValueNotificationRequest",eo);if(!Array.indexOf){Array.prototype.indexOf=function(obj){for(var i=0;i<this.length;i++){if(this[i]==obj){return i;}}
return-1;}}
this._notifyHierValues();};RightNow.Widget.SelectionInput.prototype={_notifyHierValues:function()
{var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;var value;if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
{if(this._inputField[0].checked)
value="Yes";if(this._inputField[1].checked)
value="No";}
else if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_CHECK)
{value=(this._inputField.value==="1")?"True":"False";}
else
{if(this._inputField.options){value=this._inputField.options[this._inputField.selectedIndex].text;}}
eo.data={"field":this.data.js.name,"value":value};RightNow.Event.fire("evt_fieldChange",eo);},_onDynamicFieldChange:function(type,args,vis){var eventObj=args[0];var trigger=eventObj.data.field;fieldVisibility=vis;if(!fieldVisibility||!fieldVisibility[trigger]){return;}
currentValue=eventObj.data.value;if(!this._lastDynamicFieldValues||!this._lastDynamicFieldValues[trigger]||currentValue!=this._lastDynamicFieldValues[trigger]){if(this._inputField){YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");}
YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");if(fieldVisibility[trigger]&&(fieldVisibility[trigger].length>0)){if(fieldVisibility[trigger].indexOf(currentValue)>=0){this._hidden=false;if(this._parentNode){YAHOO.util.Dom.removeClass(this._parentNode,"rn_Hidden");}}
else{this._hidden=true;if(this._parentNode){YAHOO.util.Dom.addClass(this._parentNode,"rn_Hidden");}}}
this._lastDynamicFieldValues[trigger]=currentValue;}},_onValidate:function(type,args)
{this._formErrorLocation=args[0].data.error_location;if(this._validateRequirement()||this._hidden)
{var eo=new RightNow.Event.EventObject();eo.data={"name":this.data.js.name,"value":!this._hidden?this._getValue():"","table":this.data.js.table,"required":((this.data.attrs.required&&!this._hidden)?true:false),"prev":this.data.js.prev,"form":RightNow.UI.findParentForm("rn_"+this.instanceID)};if(this.data.js.profile)
eo.data.profile=true;if(this.data.js.customID)
{eo.data.custom=true;eo.data.customID=this.data.js.customID;eo.data.customType=this.data.js.type;}
else
{eo.data.custom=false;}
eo.w_id=this.data.info.w_id;RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
else
{RightNow.UI.Form.formError=RightNow.UI.Form.formError||true;}
RightNow.Event.fire("evt_formFieldCountRequest");},_getValue:function()
{if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
{if(this._inputField[0].checked)
return this._inputField[0].value;if(this._inputField[1].checked)
return this._inputField[1].value;}
else if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_CHECK)
{return this._inputField.value==="1";}
else
{return this._inputField.value;}},_validateRequirement:function()
{if(this.data.attrs.required)
{if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
{if((this._inputField[0]&&this._inputField[1])&&(!this._inputField[0].checked&&!this._inputField[1].checked))
{this._displayError(this.data.attrs.label_required);return false;}}
else if(this._inputField.value==="")
{this._displayError(this.data.attrs.label_required);return false;}}
YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");return true;},_initializeHint:function()
{var hint_link=document.createElement("a");hint_link.id="rn_"+this.instanceID+"_HintLink";hint_link.href="";hint_link.innerHTML="<img src='../../../../../../https@help.elsevier.com\euf\assets\images\help.gif' alt='?'/>";YAHOO.util.Dom.addClass(hint_link,"rn_HintIcon");var overlay=document.createElement("div");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");if(YAHOO.lang.isArray(this._inputField))
{var radioDiv=document.getElementById("rn_"+this.instanceID+"_Radio");if(radioDiv)
YAHOO.util.Dom.insertAfter(hint_link,radioDiv);else
YAHOO.util.Dom.insertAfter(hint_link,this._inputField[this._inputField.length-1]);YAHOO.util.Dom.insertAfter(overlay,hint_link);}
else
{YAHOO.util.Dom.insertAfter(hint_link,this._inputField);YAHOO.util.Dom.insertAfter(overlay,hint_link);}
overlay=new YAHOO.widget.Overlay(overlay,{visible:false});overlay.setBody(this.data.js.hint);overlay.render();YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Hint","rn_Hidden");YAHOO.util.Event.addListener(hint_link,"click",function(e){YAHOO.util.Event.preventDefault(e);});YAHOO.util.Event.addListener(hint_link,"mouseover",function(){overlay.show();});YAHOO.util.Event.addListener(hint_link,"mouseout",function(){overlay.hide();});},_displayError:function(errorMessage)
{var commonErrorDiv=document.getElementById(this._formErrorLocation);if(commonErrorDiv)
{RightNow.UI.Form.errorCount++;if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount===1)
commonErrorDiv.innerHTML="";var elementId=(YAHOO.util.Lang.isArray(this._inputField))?this._inputField[0].id:this._inputField.id,errorLink="<div><b><a href='javascript:void(0);' onclick='document.getElementById(\""+elementId+"\").focus(); return false;'>"+this.data.attrs.label_input;if(errorMessage.indexOf("%s")>-1)
errorLink=RightNow.Text.sprintf(errorMessage,errorLink);else
errorLink=errorLink+errorMessage;errorLink+="</a></b></div> ";commonErrorDiv.innerHTML+=errorLink;}
YAHOO.util.Dom.addClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");},_countryChanged:function()
{if(this._inputField.options)
{var evtObj=new RightNow.Event.EventObject();evtObj.data={"country_id":this._inputField.options[this._inputField.selectedIndex].value,"w_id":this.instanceID};RightNow.Event.fire("evt_formFieldProvinceRequest",evtObj);}},_onProvinceResponse:function(type,args)
{var evtObj=args[0];if(evtObj.states)
{this._inputField.options.length=0;this._inputField.options[0]=new Option();this._inputField.options[0].text="--";this._inputField.options[0].value="";for(var i=0;i<evtObj.states.length;i++)
{this._inputField.options[i+1]=new Option();this._inputField.options[i+1].text=evtObj.states[i].val;this._inputField.options[i+1].value=evtObj.states[i].id;}}}};
RightNow.Widget.DateInput=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._formErrorLocation=null;this._errorNodes=null;var widgetContainer=document.getElementById("rn_"+this.instanceID);if(!widgetContainer)return;this._selectNodes=YAHOO.util.Dom.getElementsBy(function(node){return node.tagName==="SELECT";},"SELECT","rn_"+this.instanceID);if(!this._selectNodes)return;if(this.data.js.hint)
this._initializeHint();if(this.data.attrs.initial_focus)
{if(this._selectNodes[0]&&this._selectNodes[0].focus)
this._selectNodes[0].focus();}
if(this.data.attrs.validate_on_blur)
YAHOO.util.Event.addListener(this._selectNodes[this._selectNodes.length-1],"blur",this._blurValidate,null,this);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidate,this);};RightNow.Widget.DateInput.prototype={_getValue:function()
{var fieldValue="",monthField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Month"),dayField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Day"),yearField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Year");if(monthField&&dayField&&yearField)
{fieldValue=yearField.options[yearField.selectedIndex].value+"-"+
monthField.options[monthField.selectedIndex].value+"-"+
dayField.options[dayField.selectedIndex].value;if(fieldValue==="--")
{return"";}
if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_DATETIME)
{var hourField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Hour"),minuteField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Minute");if(hourField&&minuteField)
{fieldValue+=" "+hourField.options[hourField.selectedIndex].value+":"+
minuteField.options[minuteField.selectedIndex].value;}}}
return fieldValue;},_onValidate:function(type,args)
{this._parentForm=this._parentForm||RightNow.UI.findParentForm("rn_"+this.instanceID);var eo=new RightNow.Event.EventObject();eo.data={"name":this.data.js.name,"value":this._getValue(),"table":this.data.js.table,"required":(this.data.attrs.required?true:false),"prev":this.data.js.prev,"form":this._parentForm};if(RightNow.UI.Form.form===this._parentForm)
{this._formErrorLocation=args[0].data.error_location;YAHOO.util.Dom.removeClass(this._errorNodes,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Legend","rn_ErrorLabel");if(this._checkRequired()&&this._checkValue())
{if(this.data.js.profile)
eo.data.profile=true;if(this.data.js.customID)
{eo.data.custom=true;eo.data.customID=this.data.js.customID;eo.data.customType=this.data.js.type;}
else
{eo.data.custom=false;}
eo.w_id=this.instanceID;RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
else
{RightNow.UI.Form.formError=true;}}
else
{RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
RightNow.Event.fire("evt_formFieldCountRequest");},_blurValidate:function()
{YAHOO.util.Dom.removeClass(this._errorNodes,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Legend","rn_ErrorLabel");this._formErrorLocation=null;this._checkRequired();this._checkValue();},_checkRequired:function()
{if(this.data.attrs.required)
{this._errorNodes=[];for(var i=0;i<this._selectNodes.length;i++)
{if(this._selectNodes[i].value==="")
{this._errorNodes.push(this._selectNodes[i].id);}}
if(this._errorNodes.length>0)
{this._displayError(this.data.attrs.label_required);return false;}}
return true;},_checkValue:function()
{this._errorNodes=[];var numberFilledIn=0,numberChecked=0;for(var i=0;i<this._selectNodes.length;i++)
{if(this._selectNodes[i].value==="")
this._errorNodes.push(this._selectNodes[i].id);else
numberFilledIn++;numberChecked++;}
if(numberFilledIn>0&&numberFilledIn!==numberChecked)
{this._displayError(RightNow.Interface.getMessage("PCT_S_IS_NOT_COMPLETELY_FILLED_IN_MSG"));return false;}
var monthField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Month"),dayField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Day"),yearField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Year");if((monthField&&dayField&&yearField)&&(monthField.value==="1"&&dayField.value==="1"&&yearField.value==="1970"))
{this._errorNodes=[monthField.id,dayField.id,yearField.id];this._displayError(RightNow.Interface.getMessage("PCT_S_VALUE_MIN_VALUE_PCT_S_MSG"),this.data.js.min_val);return false;}
if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_DATETIME)
{var hourField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_Hour");if((monthField&&dayField&&yearField)&&(monthField.value==="1"&&dayField.value==="2"&&yearField.value==="1970")&&(parseInt(hourField.value,10)<9))
{this._errorNodes=[monthField.id,dayField.id,yearField.id,hourField.id];this._displayError(RightNow.Interface.getMessage("PCT_S_VALUE_MIN_VALUE_PCT_S_MSG"),this.data.js.min_val);return false;}}
return true;},_initializeHint:function()
{if(YAHOO.widget.Overlay)
{if(this.data.attrs.always_show_hint)
{var overlay=this._createHintElement(true);}
else
{var overlay=this._createHintElement(false);YAHOO.util.Event.addListener(this._selectNodes,"focus",function(){overlay.show();});YAHOO.util.Event.addListener(this._selectNodes,"blur",function(){overlay.hide();});}}
else
{var hint=document.createElement("span");hint.className="rn_HintText";hint.innerHTML=this.data.js.hint;YAHOO.util.Dom.insertAfter(hint,this._selectNodes[this._selectNodes.length-1]);}},_createHintElement:function(visibility)
{var overlay=document.createElement("span");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");if(visibility)
YAHOO.util.Dom.addClass(overlay,"rn_AlwaysVisibleHint");YAHOO.util.Dom.insertAfter(overlay,this._selectNodes[this._selectNodes.length-1]);overlay=new YAHOO.widget.Overlay(overlay,{visible:visibility});overlay.setBody(this.data.js.hint);overlay.render();return overlay;},_displayError:function(errorMessage)
{var commonErrorDiv=document.getElementById(this._formErrorLocation);if(commonErrorDiv)
{RightNow.UI.Form.errorCount++;if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount===1)
commonErrorDiv.innerHTML="";var errorLink="<div><b><a href='javascript:void(0);' onclick='document.getElementById(\""+this._errorNodes[0]+"\").focus(); return false;'>"+this.data.attrs.label_input;if(errorMessage.indexOf("%s")>-1||arguments.length>1)
{var args=Array.prototype.slice.call(arguments);errorLink=RightNow.Text.sprintf(errorMessage,errorLink,args.slice(1));}
else
{errorLink=errorLink+errorMessage;}
errorLink+="</a></b></div> ";commonErrorDiv.innerHTML+=errorLink;}
YAHOO.util.Dom.addClass(this._errorNodes,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Legend","rn_ErrorLabel");}};
RightNow.Widget.TextInput=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._formErrorLocation=null;this._validated=false;this._hidden=false;this._submitWhenHidden=false;this._lastDynamicFieldValues=null;this._inputField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name);if(!this._inputField)return;if(this.data.js.fieldVisibility){if(!this._lastDynamicFieldValues){this._hidden=true;this.data.attrs.required=false;if(this._inputField){YAHOO.util.Dom.addClass(this._inputField.parentNode,"rn_Hidden");}
this._lastDynamicFieldValues=new Array();}}
if(this.data.js.submitAllways){this._submitWhenHidden=true;}
if(this.data.js.hint)
this._initializeHint();if(this.data.attrs.initial_focus&&this._inputField.focus)
this._inputField.focus();if(this.data.js.mask)
this._initializeMask();RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidate,this);RightNow.Event.subscribe("evt_fieldChange",this._onDynamicFieldChange,this,this.data.js.fieldVisibility);RightNow.Event.subscribe("evt_countryClickResponse",this._onCountryClick,this,this.data.js.name);this._fieldName=this.data.js.name;if(this._fieldName==="postal_code"||this._fieldName==="ph_office"||this._fieldName==="ph_mobile"||this._fieldName==="ph_fax"||this._fieldName=="ph_asst"||this._fieldName==="ph_home")
RightNow.Event.subscribe("evt_formFieldProvinceResponse",this._onProvinceChange,this);if(this.data.attrs.validate_on_blur)
YAHOO.util.Event.addListener(this._inputField,"blur",this._blurValidate,null,this);var eo=new RightNow.Event.EventObject();RightNow.Event.fire("evt_hierValueNotificationRequest",eo);var eo=new RightNow.Event.EventObject();RightNow.Event.fire("evt_defaultPrefixRequest",eo);if(!Array.indexOf){Array.prototype.indexOf=function(obj){for(var i=0;i<this.length;i++){if(this[i]==obj){return i;}}
return-1;}}};RightNow.Widget.TextInput.prototype={_onDynamicFieldChange:function(type,args,vis){var eventObj=args[0];var trigger=eventObj.data.field;fieldVisibility=vis;if(!fieldVisibility||!fieldVisibility[trigger]){return;}
currentValue=eventObj.data.value;if(!this._lastDynamicFieldValues||!this._lastDynamicFieldValues[trigger]||currentValue!=this._lastDynamicFieldValues[trigger]){if(this._inputField){YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");}
YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");if(fieldVisibility[trigger]&&(fieldVisibility[trigger].length>0)){if(fieldVisibility[trigger].indexOf(currentValue)>=0){this._hidden=false;if(this._inputField){YAHOO.util.Dom.removeClass(this._inputField.parentNode,"rn_Hidden");}}
else{this._hidden=true;if(this._inputField){YAHOO.util.Dom.addClass(this._inputField.parentNode,"rn_Hidden");}}}
this._lastDynamicFieldValues[trigger]=currentValue;}},_onCountryClick:function(type,args,name){var eventObj=args[0];if(name in eventObj.data){this._inputField.value=eventObj.data[name];this._submitWhenHidden=true;}},_onValidate:function(type,args){this._validated=true;this._parentForm=this._parentForm||RightNow.UI.findParentForm("rn_"+this.instanceID);var eo=new RightNow.Event.EventObject();eo.data={"name":this.data.js.name,"value":(!this._hidden||this._submitWhenHidden)?this._getValue():"","table":this.data.js.table,"required":((this.data.attrs.required&&!this._hidden)?true:false),"prev":this.data.js.prev,"form":this._parentForm};if(RightNow.UI.Form.form===this._parentForm){this._formErrorLocation=args[0].data.error_location;this._trimField();if(this._hidden||(this._compareInputToMask(true)&&this._checkRequired()&&this._checkData()&&this._checkValue()&&this._checkEmail()&&this._checkUrl())){YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");if(this.data.js.profile)
eo.data.profile=true;if(this.data.js.customID){eo.data.custom=true;eo.data.customID=this.data.js.customID;eo.data.customType=this.data.js.type;}
else{eo.data.custom=false;}
if(this.data.js.channelID){eo.data.channelID=this.data.js.channelID;}
eo.w_id=this.data.info.w_id;RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
else{RightNow.UI.Form.formError=true;}}
else{RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
this._validated=false;RightNow.Event.fire("evt_formFieldCountRequest");},_blurValidate:function(){this._formErrorLocation=null;if(this._onAccountExistsResponse._dialogShowing)return;this._trimField();if(this._checkRequired()&&this._checkData()&&this._checkValue()&&this._checkEmail()){if(this._fieldName==="login"||this._fieldName==="email"||this._fieldName==="email_alt1"||this._fieldName==="email_alt2"){this._checkExistingAccount();}
YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");return true;}},_checkValue:function(){if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_INT){if(this._inputField.value!==""&&(isNaN(Number(this._inputField.value))||parseInt(this._inputField.value)!==parseFloat(this._inputField.value))){this._displayError(RightNow.Interface.getMessage('VALUE_MUST_BE_AN_INTEGER_MSG'));return false;}
if(this.data.js.maxVal||this.data.js.minVal){var value=parseInt(this._inputField.value);if(this.data.js.maxVal&&value>parseInt(this.data.js.maxVal)){this._displayError(RightNow.Interface.getMessage('VALUE_IS_TOO_LARGE_MAX_VALUE_MSG')+this.data.js.maxVal+")");return false;}
if(this.data.js.minVal&&value<parseInt(this.data.js.minVal)){this._displayError(RightNow.Interface.getMessage('VALUE_IS_TOO_SMALL_MIN_VALUE_MSG')+this.data.js.minVal+")");return false;}}}
else if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_PASSWORD&&this.data.js.name!=="password"&&this.data.js.passwordLength){var length=RightNow.Text.Encoding.utf8Length(this._inputField.value),minLength=this.data.js.passwordLength;if(length<minLength){this._displayError(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_D_CHARACTERS_MSG"),minLength));return false;}}
if(this.data.js.fieldSize){var length=RightNow.Text.Encoding.utf8Length(this._inputField.value),maxLength=this.data.js.field_size;if(maxLength<length){var extra,errorString,roughMBCS=parseInt(length/(this._inputField.value.length)),numtokExp=new RegExp("%d");if(length%(this._inputField.value.length)!==0)
roughMBCS++;extra=parseInt((length-maxLength)/roughMBCS);errorString=RightNow.Text.sprintf(RightNow.Interface.getMessage("EXCEEDS_SZ_LIMIT_PCT_D_CHARS_PCT_D_LBL"),numtokExp,parseInt(maxLength/roughMBCS));if((length-maxLength)%(roughMBCS)!==0)
extra++;errorString=errorString.replace(numtokExp,extra);this._displayError(errorString);return false;}}
return true;},_checkData:function(silent){var spacesRe=/\s/;if(this._inputField.value!==""){if(this._fieldName==="login"){var quotesRe=/["']/;if(spacesRe.test(this._inputField.value)){if(!silent)
this._displayError(RightNow.Interface.getMessage('CONTAIN_SPACES_PLEASE_TRY_MSG'));return false;}
if(quotesRe.test(this._inputField.value)){if(!silent)
this._displayError(RightNow.Interface.getMessage('CONTAIN_QUOTE_CHARS_PLEASE_TRY_MSG'));return false;}}
else if(this._fieldName==="ph_office"||this._fieldName==="ph_fax"||this._fieldName==="ph_home"||this._fieldName==="ph_asst"||this._fieldName==="ph_mobile"||this._fieldName==="postal_code"){var validInput=new RegExp("^[-A-Za-z0-9,# +.()]+$");if(!validInput.test(this._inputField.value)){if(!silent){if(this._fieldName==="postal_code")
this._displayError(RightNow.Interface.getMessage("PCT_S_IS_AN_INVALID_POSTAL_CODE_MSG"));else
this._displayError(RightNow.Interface.getMessage("PCT_S_IS_AN_INVALID_PHONE_NUMBER_MSG"));}
return false;}}
else if(this.data.js.channelID&&spacesRe.test(this._inputField.value)){if(!silent)
this._displayError(RightNow.Interface.getMessage('CONTAIN_SPACES_PLEASE_TRY_MSG'));return false;}}
return true;},_checkEmail:function(silent){if(!(this._fieldName==='email'||this._fieldName==='email_alt1'||this._fieldName==='email_alt2'||this._fieldName==='alternateemail'||this.data.js.email)||this._inputField.value==="")
return true;if(this._fieldName==='alternateemail'){var status=true;var emailArray=this._inputField.value.split(";");for(var i=0;i<emailArray.length;i++){emailArray[i]=YAHOO.lang.trim(emailArray[i]);status=(this._validateEmail(emailArray[i],silent)&&status)?true:false;}
return status;}
else{return this._validateEmail(this._inputField.value,silent);}},_validateEmail:function(value,silent){if(!RightNow.Text.isValidEmailAddress(value)){if(!silent)
this._displayError(RightNow.Interface.getMessage("PCT_S_IS_INVALID_MSG"));return false;}
return true;},_checkUrl:function(silent){if((this.data.js.customID)&&(this.data.js.url)&&!(this._inputField.value==="")){if(!RightNow.Text.isValidUrl(this._inputField.value)){if(!silent)
this._displayError(RightNow.Interface.getMessage("IS_NOT_A_VALID_URL_MSG"));return false;}}
return true;},_checkRequired:function(){if(this.data.attrs.required){if(this._inputField.value===""){this._displayError(this.data.attrs.label_required);return false;}}
return true;},_getValue:function(){if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_INT){if(this._inputField.value!=="")
return parseInt(this._inputField.value);}
if(this.data.js.mask)
return this._stripMaskFromFieldValue();return this._inputField.value;},_trimField:function(){if(this._inputField.value!==""&&this.data.js.type!==RightNow.Interface.Constants.EUF_DT_PASSWORD)
this._inputField.value=YAHOO.lang.trim(this._inputField.value);return true;},_initializeHint:function(){var hint_link=document.createElement("a");hint_link.id="rn_"+this.instanceID+"_HintLink";hint_link.href="";hint_link.innerHTML="<img src='../../../../../../https@help.elsevier.com\euf\assets\images\help.gif' alt='?'/>";YAHOO.util.Dom.addClass(hint_link,"rn_HintIcon");var overlay=document.createElement("div");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");YAHOO.util.Dom.insertAfter(hint_link,this._inputField);YAHOO.util.Dom.insertAfter(overlay,hint_link);overlay=new YAHOO.widget.Overlay(overlay,{visible:false});overlay.setBody(this.data.js.hint);overlay.render();YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Hint","rn_Hidden");YAHOO.util.Event.addListener(hint_link,"click",function(e){YAHOO.util.Event.preventDefault(e);});YAHOO.util.Event.addListener(hint_link,"mouseover",function(){overlay.show();});YAHOO.util.Event.addListener(hint_link,"mouseout",function(){overlay.hide();});},_createHintElement:function(visibility){var overlay=document.createElement("span");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");if(visibility)
YAHOO.util.Dom.addClass(overlay,"rn_AlwaysVisibleHint");YAHOO.util.Dom.insertAfter(overlay,this._inputField);overlay=new YAHOO.widget.Overlay(overlay,{visible:visibility});overlay.setBody(this.data.js.hint);overlay.render();return overlay;},_displayError:function(errorMessage){var commonErrorDiv=document.getElementById(this._formErrorLocation);if(commonErrorDiv){RightNow.UI.Form.errorCount++;if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount===1)
commonErrorDiv.innerHTML="";var errorLink="<div><b><a href='javascript:void(0);' onclick='document.getElementById(\""+this._inputField.id+"\").focus(); return false;'>"+this.data.attrs.label_input+" ";if(errorMessage.indexOf("%s")>-1)
errorLink=RightNow.Text.sprintf(errorMessage,errorLink);else
errorLink=errorLink+errorMessage;errorLink+="</a></b></div> ";commonErrorDiv.innerHTML+=errorLink;}
YAHOO.util.Dom.addClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");},_checkExistingAccount:function(){if(this._inputField.value===""||this._inputField.value===this.data.js.prev||(this._fieldName.indexOf("email")>-1&&this._inputField.value.toLowerCase()===this.data.js.prev))
return false;if(!this._checkExistingAccount._seenValue)
this._checkExistingAccount._seenValue=this._inputField.value;else if(this._checkExistingAccount._seenValue===this._inputField.value)
return false;else this._checkExistingAccount._seenValue=this._inputField.value;var evtObj=new RightNow.Event.EventObject();if(this._fieldName.indexOf("email")>-1)
evtObj.data.email=this._inputField.value;else if(this._fieldName==="login")
evtObj.data.login=this._inputField.value;evtObj.data.contactToken=this.data.js.contactToken;RightNow.Event.subscribe("evt_formFieldAccountExistsResponse",this._onAccountExistsResponse,this);RightNow.Event.fire("evt_formFieldAccountExistsRequest",evtObj);},_onAccountExistsResponse:function(type,args){RightNow.Event.unsubscribe("evt_formFieldAccountExistsResponse",this._onAccountExistsResponse);var results=args[0];if(results!==false&&this._validated===false){YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");YAHOO.util.Dom.addClass(this._inputField,"rn_ErrorField");var handleOK=function(){warnDialog.hide();this._onAccountExistsResponse._dialogShowing=false;this._inputField.focus();};var buttons=[{text:RightNow.Interface.getMessage("OK_LBL"),handler:{fn:handleOK,scope:this},isDefault:true}];var dialogBody=document.createElement("div");dialogBody.innerHTML=results.message;var warnDialog=RightNow.UI.Dialog.actionDialog(RightNow.Interface.getMessage("WARNING_LBL"),dialogBody,{"buttons":buttons,"width":"250px"});this._onAccountExistsResponse._dialogShowing=true;warnDialog.show();}
else{YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");this._validated=false;}
return false;},_onProvinceChange:function(type,args){var eventObj=args[0],resetMask=false;if(!eventObj.states.length)
this.data.js.mask="";if((this._fieldName==="postal_code")&&("postal_mask"in eventObj)){resetMask=true;this.data.js.mask=eventObj.postal_mask;}
else if("phone_mask"in eventObj){resetMask=true;this.data.js.mask=eventObj.phone_mask;}
if(resetMask&&this.data.js.mask)
this._initializeMask();else if(this._maskNodeOnPage)
this._maskNodeOnPage.parentNode.removeChild(this._maskNodeOnPage);},_initializeMask:function(){YAHOO.util.Event.addListener(this._inputField,"keyup",this._compareInputToMask,null,this);YAHOO.util.Event.addListener(this._inputField,"blur",this._hideMaskMessage,null,this);YAHOO.util.Event.addListener(this._inputField,"focus",this._compareInputToMask,null,this);this.data.js.mask=this._createMaskArray(this.data.js.mask);var overlay=document.createElement("div");YAHOO.util.Dom.addClass(overlay,"rn_MaskOverlay");if(YAHOO.widget.Overlay){this._maskNode=YAHOO.util.Dom.insertAfter(overlay,this._inputField);this._maskNode=new YAHOO.widget.Overlay(this._maskNode,{visible:false});this._maskNode.cfg.setProperty("context",[this._inputField,"tl","bl",["windowScroll"]]);this._maskNode.setBody("");this._maskNode.render();}
else{YAHOO.util.Dom.addClass(overlay,"rn_Hidden");this._maskNode=overlay;YAHOO.util.Dom.insertAfter(this._maskNode,this._inputField);}
if(this.data.attrs.always_show_mask){var maskMessageOnPage=this._getSimpleMaskString(),widgetContainer=document.getElementById("rn_"+this.instanceID);if(maskMessageOnPage&&widgetContainer){var messageNode=document.createElement("div");messageNode.innerHTML=RightNow.Interface.getMessage("EXPECTED_INPUT_LBL")+": "+maskMessageOnPage;YAHOO.util.Dom.addClass(messageNode,'rn_Mask'+(YAHOO.util.Dom.hasClass(widgetContainer.lastChild,'rn_HintText')?' rn_MaskBuffer':''));this._maskNodeOnPage=widgetContainer.appendChild(messageNode);}}},_createMaskArray:function(mask){if(!mask)return;var maskArray=[];for(var i=0,j=0,size=mask.length/2;i<size;i++){maskArray[i]=mask.substring(j,j+2);j+=2;}
return maskArray;},_stripMaskFromFieldValue:function(){if(!this.data.js.mask||this._inputField.value==="")
return this._inputField.value;var result="";for(var i=0;i<this._inputField.value.length;i++){if(i<this.data.js.mask.length&&this.data.js.mask[i].charAt(0)!=='F')
result+=this._inputField.value.charAt(i);}
return result;},_getSimpleMaskString:function(){if(!this.data.js.mask)return"";var maskString="";for(var i=0;i<this.data.js.mask.length;i++){switch(this.data.js.mask[i].charAt(0)){case"F":maskString+=this.data.js.mask[i].charAt(1);break;case"U":switch(this.data.js.mask[i].charAt(1)){case"#":maskString+="#";break;case"A":case"C":maskString+="@";break;case"L":maskString+="A";break;}
break;case"L":switch(this.data.js.mask[i].charAt(1)){case"#":maskString+="#";break;case"A":case"C":maskString+="@";break;case"L":maskString+="a";break;}
break;case"M":switch(this.data.js.mask[i].charAt(1)){case"#":maskString+="#";break;case"A":case"C":case"L":maskString+="@";break;}
break;}}
return maskString;},_compareInputToMask:function(submitting){if(!this.data.js.mask)return true;var error=[];if(this._inputField.value.length>0){for(var i=0,tempRegExVal;i<this._inputField.value.length;i++){if(i<this.data.js.mask.length){tempRegExVal="";switch(this.data.js.mask[i].charAt(0)){case'F':if(this._inputField.value.charAt(i)!==this.data.js.mask[i].charAt(1))
error.push([i,this.data.js.mask[i]]);break;case'U':switch(this.data.js.mask[i].charAt(1)){case'#':tempRegExVal=/^[0-9]+$/;break;case'A':tempRegExVal=/^[0-9A-Z]+$/;break;case'L':tempRegExVal=/^[A-Z]+$/;break;case'C':tempRegExVal=/^[^a-z]+$/;break;}
break;case'L':switch(this.data.js.mask[i].charAt(1)){case'#':tempRegExVal=/^[0-9]+$/;break;case'A':tempRegExVal=/^[0-9a-z]+$/;break;case'L':tempRegExVal=/^[a-z]+$/;break;case'C':tempRegExVal=/^[^A-Z]+$/;break;}
break;case'M':switch(this.data.js.mask[i].charAt(1)){case'#':tempRegExVal=/^[0-9]+$/;break;case'A':tempRegExVal=/^[0-9a-zA-Z]+$/;break;case'L':tempRegExVal=/^[a-zA-Z]+$/;break;default:break;}
break;default:break;}
if((tempRegExVal!=="")&&!(tempRegExVal.test(this._inputField.value.charAt(i))))
error.push([i,this.data.js.mask[i]]);}
else{error.push([i,"LEN"]);}}
if((!error.length)&&(this._inputField.value.length<this.data.js.mask.length)&&(!this.data.attrs.always_show_mask||submitting===true)){for(var i=this._inputField.value.length;i<this.data.js.mask.length;i++)
error.push([i,"MISS"]);}
if(error.length>0){this._showMaskMessage(error);if(submitting===true)
this._displayError(RightNow.Interface.getMessage("PCT_S_DIDNT_MATCH_EXPECTED_INPUT_LBL"));return false;}
this._showMaskMessage(null);return true;}
if(!this.data.attrs.always_show_mask&&submitting!==true)
this._showMaskMessage(error);return true;},_showMaskMessage:function(error){if(error===null){this._hideMaskMessage();}
else{if(!this._showMaskMessage._maskMessages){this._showMaskMessage._maskMessages={"F":RightNow.Interface.getMessage('WAITING_FOR_CHARACTER_LBL'),"U#":RightNow.Interface.getMessage('PLEASE_TYPE_A_NUMBER_MSG'),"L#":RightNow.Interface.getMessage('PLEASE_TYPE_A_NUMBER_MSG'),"M#":RightNow.Interface.getMessage('PLEASE_TYPE_A_NUMBER_MSG'),"UA":RightNow.Interface.getMessage('PLEASE_ENTER_UPPERCASE_LETTER_MSG'),"UL":RightNow.Interface.getMessage('PLEASE_ENTER_AN_UPPERCASE_LETTER_MSG'),"UC":RightNow.Interface.getMessage('PLS_ENTER_UPPERCASE_LETTER_SPECIAL_MSG'),"LA":RightNow.Interface.getMessage('PLEASE_ENTER_LOWERCASE_LETTER_MSG'),"LL":RightNow.Interface.getMessage('PLEASE_ENTER_A_LOWERCASE_LETTER_MSG'),"LC":RightNow.Interface.getMessage('PLS_ENTER_LOWERCASE_LETTER_SPECIAL_MSG'),"MA":RightNow.Interface.getMessage('PLEASE_ENTER_A_LETTER_OR_A_NUMBER_MSG'),"ML":RightNow.Interface.getMessage('PLEASE_ENTER_A_LETTER_MSG'),"MC":RightNow.Interface.getMessage('PLEASE_ENTER_LETTER_SPECIAL_CHAR_MSG'),"LEN":RightNow.Interface.getMessage('THE_INPUT_IS_TOO_LONG_MSG'),"MISS":RightNow.Interface.getMessage('THE_INPUT_IS_TOO_SHORT_MSG')};}
var message="",sampleMaskString=this._getSimpleMaskString().split("");for(var i=0,type;i<error.length;i++){type=error[i][1];if(type.charAt(0)==="F"){message+="<b>"+RightNow.Interface.getMessage('CHARACTER_LBL')+" "+(error[i][0]+1)+"</b> "+RightNow.Interface.getMessage('WAITING_FOR_CHARACTER_LBL')+type.charAt(1)+" ' <br/>";sampleMaskString[(error[i][0])]="<span style='color:#F00;'>"+sampleMaskString[(error[i][0])]+"</span>";}
else{if(type!=="MISS"){message+="<b>"+RightNow.Interface.getMessage('CHARACTER_LBL')+" "+(error[i][0]+1)+"</b> "+this._showMaskMessage._maskMessages[type]+"<br/>";if(type!=="LEN"){sampleMaskString[(error[i][0])]="<span style='color:#F00;'>"+sampleMaskString[(error[i][0])]+"</span>";}
else{break;}}}}
sampleMaskString=sampleMaskString.join("");this._setMaskMessage(RightNow.Interface.getMessage('EXPECTED_INPUT_LBL')+": "+sampleMaskString+"<br/>"+message);this._showMask();}},_setMaskMessage:function(message){((this._maskNode.body)?this._maskNode.body:this._maskNode).innerHTML=message;},_showMask:function(){if(this._maskNode.show)
this._maskNode.show();else
YAHOO.util.Dom.removeClass(this._maskNode,"rn_Hidden");},_hideMaskMessage:function(){if(this._maskNode.cfg&&this._maskNode.cfg.getProperty("visible")!==false)
this._maskNode.hide();else if(!this._maskNode.cfg)
YAHOO.util.Dom.addClass(this._maskNode,"rn_Hidden");}};
RightNow.Widget.CountrySelection2=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._formErrorLocation=null;if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
this._inputField=[document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_1"),document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name+"_0")];else
this._inputField=document.getElementById("rn_"+this.instanceID+"_"+this.data.js.name);if(!this._inputField||(YAHOO.lang.isArray(this._inputField)&&(!this._inputField[0]||!this._inputField[1])))
return;else{this._onClick();}
if(this.data.js.hint)
this._initializeHint();if(this.data.attrs.initial_focus)
{if(this._inputField[0]&&this._inputField[0].focus)
this._inputField[0].focus();else if(this._inputField.focus)
this._inputField.focus();}
if(this.data.attrs.validate_on_blur&&this.data.attrs.required)
YAHOO.util.Event.addListener(this._inputField,"blur",function(){this._formErrorLocation=null;this._validateRequirement();},null,this);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidate,this);RightNow.Event.subscribe("evt_defaultPrefixRequest",this._onClick,this);YAHOO.util.Event.addListener(this._inputField,"click",this._onClick,null,this);var fieldName=this.data.js.name;if(fieldName==="country_id")
YAHOO.util.Event.addListener(this._inputField,"change",this._countryChanged,null,this);else if(fieldName==="prov_id")
RightNow.Event.subscribe("evt_formFieldProvinceResponse",this._onProvinceResponse,this);};RightNow.Widget.CountrySelection2.prototype={_onValidate:function(type,args)
{this._formErrorLocation=args[0].data.error_location;if(this._validateRequirement())
{var eo=new RightNow.Event.EventObject();eo.data={"name":this.data.js.name,"value":this._getValue(),"table":this.data.js.table,"required":(this.data.attrs.required?true:false),"prev":this.data.js.prev,"form":RightNow.UI.findParentForm("rn_"+this.instanceID)};if(this.data.js.profile)
eo.data.profile=true;if(this.data.js.customID)
{eo.data.custom=true;eo.data.customID=this.data.js.customID;eo.data.customType=this.data.js.type;}
else
{eo.data.custom=false;}
eo.w_id=this.data.info.w_id;RightNow.Event.fire("evt_formFieldValidateResponse",eo);}
else
{RightNow.UI.Form.formError=true;}
RightNow.Event.fire("evt_formFieldCountRequest");},_onClick:function()
{var eo=new RightNow.Event.EventObject();eo.data={"prefix":"+"};var countryCode=this._inputField.value;if(countryCode){eo.data={"prefix":"+","country_region_name":"","country_region_code":"","country_region_elsevier":"","country_name":"","country_currency":""};if(this.data.js.regionName)
eo.data.country_region_name=this.data.js.regionName[countryCode];if(this.data.js.regionCode)
eo.data.country_region_code=this.data.js.regionCode[countryCode];if(this.data.js.elsevierRegion)
eo.data.country_region_elsevier=this.data.js.elsevierRegion[countryCode];if(this.data.js.countryName)
eo.data.country_name=this.data.js.countryName[countryCode];if(this.data.js.currency)
eo.data.country_currency=this.data.js.currency[countryCode];if(this.data.js.prefix){var prefix=this.data.js.prefix[countryCode];if(prefix&&prefix>0){eo.data.prefix+=prefix;}}}
RightNow.Event.fire("evt_countryClickResponse",eo);},_getValue:function()
{if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
{if(this._inputField[0].checked)
return this._inputField[0].value;if(this._inputField[1].checked)
return this._inputField[1].value;}
else if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_CHECK)
{return this._inputField.value==="1";}
else
{return this._inputField.value;}},_validateRequirement:function()
{if(this.data.attrs.required)
{if(this.data.js.type===RightNow.Interface.Constants.EUF_DT_RADIO)
{if((this._inputField[0]&&this._inputField[1])&&(!this._inputField[0].checked&&!this._inputField[1].checked))
{this._displayError(this.data.attrs.label_required);return false;}}
else if(this._inputField.value==="")
{this._displayError(this.data.attrs.label_required);return false;}}
YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");return true;},_initializeHint:function()
{var hint_link=document.createElement("a");hint_link.id="rn_"+this.instanceID+"_HintLink";hint_link.href="";hint_link.innerHTML="<img src='../../../../../../https@help.elsevier.com\euf\assets\images\help.gif' alt='?'/>";YAHOO.util.Dom.addClass(hint_link,"rn_HintIcon");var overlay=document.createElement("div");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");if(YAHOO.lang.isArray(this._inputField))
{YAHOO.util.Dom.insertAfter(hint_link,this._inputField[this._inputField.length-1]);YAHOO.util.Dom.insertAfter(overlay,hint_link);}
else
{YAHOO.util.Dom.insertAfter(hint_link,this._inputField);YAHOO.util.Dom.insertAfter(overlay,hint_link);}
overlay=new YAHOO.widget.Overlay(overlay,{visible:false});overlay.setBody(this.data.js.hint);overlay.render();YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Hint","rn_Hidden");YAHOO.util.Event.addListener(hint_link,"click",function(){return false;});YAHOO.util.Event.addListener(hint_link,"mouseover",function(){overlay.show();});YAHOO.util.Event.addListener(hint_link,"mouseout",function(){overlay.hide();});},_displayError:function(errorMessage)
{var commonErrorDiv=document.getElementById(this._formErrorLocation);if(commonErrorDiv)
{RightNow.UI.Form.errorCount++;if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount===1)
commonErrorDiv.innerHTML="";var elementId=(YAHOO.util.Lang.isArray(this._inputField))?this._inputField[0].id:this._inputField.id,errorLink="<div><b><a href='javascript:void(0);' onclick='document.getElementById(\""+elementId+"\").focus(); return false;'>"+this.data.attrs.label_input;if(errorMessage.indexOf("%s")>-1)
errorLink=RightNow.Text.sprintf(errorMessage,errorLink);else
errorLink=errorLink+errorMessage;errorLink+="</a></b></div> ";commonErrorDiv.innerHTML+=errorLink;}
YAHOO.util.Dom.addClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");},_countryChanged:function()
{if(this._inputField.options)
{var evtObj=new RightNow.Event.EventObject();evtObj.data={"country_id":this._inputField.options[this._inputField.selectedIndex].value,"w_id":this.instanceID};RightNow.Event.fire("evt_formFieldProvinceRequest",evtObj);}},_onProvinceResponse:function(type,args)
{var evtObj=args[0],options=this._inputField.options,aNewOption,i;if(evtObj.states)
{options.length=0;evtObj.states.unshift({val:"--",id:""});for(i=0;i<evtObj.states.length;i++)
{aNewOption=document.createElement("option");aNewOption.text=evtObj.states[i].val;aNewOption.value=evtObj.states[i].id;options.add(aNewOption);}}}};
RightNow.Widget.ProductCategoryInput=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._currentIndex=0;this._defaultIndex=0;this._noValueNodeIndex=0;this._displayField=document.getElementById("rn_"+this.instanceID+"_"+this.data.attrs.data_type+"_Button");this._displayFieldVisibleText=document.getElementById("rn_"+this.instanceID+"_Button_Visible_Text");this._accessibleView=document.getElementById("rn_"+this.instanceID+"_Links");this._expandNode=null;this._ajaxLinkMap=null;if(this.data.js.readOnly||!this._displayField)return;if(this.data.attrs.hint){this._initializeHint();}
RightNow.Event.subscribe("evt_menuFilterGetResponse",this._getSubLevelResponse,this);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidateRequest,this);RightNow.Event.subscribe("evt_hierValueNotificationRequest",this._notifyHierValues,this);RightNow.Event.subscribe("evt_accessibleTreeViewGetResponse",this._getAccessibleTreeViewResponse,this);if(this.data.attrs.set_button)
YAHOO.util.Event.addListener("rn_"+this.instanceID+"_"+this.data.attrs.data_type+"_SetButton","click",this._setButtonClick,null,this);YAHOO.util.Event.addListener(this._displayField,"click",this._toggleProductCategoryPicker,null,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_LinksTrigger","click",this._toggleAccessibleView,null,this);this._eo.data={"data_type":this.data.attrs.data_type,"hm_type":this.data.js.hm_type,"linking_on":this.data.js.linkingOn,"linkingProduct":0,"table":this.data.attrs.table,"cache":[],"name":((this.data.attrs.data_type.indexOf('prod')>-1)?'prod':'cat')};this._eo.w_id=this.instanceID;this._panel=new YAHOO.widget.Panel("rn_"+this.instanceID+"_Tree",{close:false,visible:false,constraintoviewport:true});this._panel.setHeader("");this._panel.render();YAHOO.util.Dom.setStyle(this._panel.innerElement,"overflow-y","auto");if(this.data.js.defaultData){this._buildTree();this._notifyHierValues();}};RightNow.Widget.ProductCategoryInput.prototype={_notifyHierValues:function()
{if(this._tree){var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;var hierValues=this._getSelectedNodesMessage();if(hierValues&&hierValues.length>1){hierValues.shift();}
hierValues=hierValues.join("; ");eo.data={"field":this.data.attrs.data_type,"value":hierValues};RightNow.Event.fire("evt_fieldChange",eo);}},_buildTree:function()
{var treeDiv=document.getElementById("rn_"+this.instanceID+"_Tree");if(treeDiv&&YAHOO.widget.TreeView)
{this._tree=new YAHOO.widget.TreeView(treeDiv);this._tree.setDynamicLoad(RightNow.Event.createDelegate(this,this._getSubLevelRequest));var root=this._tree.getRoot(),defaultValues=false,hierData=this.data.js.hierData||this.data.js.hierDataNone;var selectedNode;if(this.data.js.hierData&&this.data.js.hierDataNone)
delete this.data.js.hierData;for(var i=0,node,length=hierData.length;i<length;i++)
{for(var j=0,nodeData;j<hierData[i].length;j++)
{nodeData=hierData[i][j];if(i!==0&&nodeData.parentID)
root=this._tree.getNodeByProperty("hierValue",nodeData.parentID);node=new YAHOO.widget.MenuNode(nodeData.label,root);node.hierValue=nodeData.value;node.href='javascript:void(0);';node.className="NodeLevel"+node.depth;if(nodeData.selected)
{defaultValues=true;this._currentIndex=node.index;selectedNode=node;this._defaultIndex=node.index;}
if(!nodeData.hasChildren)
{node.dynamicLoadComplete=true;node.iconMode=1;}}
if(root){root.loadComplete();}}
var noValueNode=this._tree.getRoot().children[0];noValueNode.isLeaf=true;YAHOO.util.Dom.addClass(noValueNode.getEl(),"rn_NoValueNode");this._noValueNodeIndex=noValueNode.index;this._tree.subscribe("enterKeyPressed",this._enterPressed,null,this);this._tree.subscribe('clickEvent',this._selectNode,null,this);this._tree.subscribe('expandComplete',function(node){this._panel.innerElement.scrollTop=node.getEl().offsetTop-20;},null,this);this._tree.collapseAll();YAHOO.util.Dom.setStyle("rn_"+this.instanceID+"_Tree","display","block");if(defaultValues){this._displaySelectedNodesAndClose(false);this._expandNode=selectedNode;}}},_displayAccessibleDialog:function()
{if(!this._tree)
this._buildTree();if(!(this._dialog))
{var handleDismiss=function()
{this.hide();};this._buttons=[{text:RightNow.Interface.getMessage("CANCEL_CMD"),handler:handleDismiss,isDefault:false}];YAHOO.util.Dom.removeClass(this._accessibleView,"rn_Hidden")
this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_nothing_selected,this._accessibleView,{"buttons":this._buttons,"width":"400px"});}
else
{var currentlySelectedSpan=document.getElementById("rn_"+this.instanceID+"_IntroCurrentSelection");var introLink=document.getElementById("rn_"+this.instanceID+"_Intro");if(currentlySelectedSpan&&introLink)
{var currentNode=this._tree.getNodeByIndex(this._currentIndex);if(!currentNode)
{currentNode={};currentNode.hierValue=0;}
var localInstanceID=this.instanceID;introLink.onclick=function(){try{document.getElementById("rn_"+localInstanceID+"_AccessibleLink_"+currentNode.hierValue).focus();}catch(e){}};var selectedNodes=this._getSelectedNodesMessage();currentlySelectedSpan.innerHTML=RightNow.Text.sprintf(RightNow.Interface.getMessage("SELECTION_PCT_S_ACTIVATE_LINK_JUMP_MSG"),selectedNodes);}}
this._dialog.show();return false;},_toggleAccessibleView:function()
{if(this.data.attrs.data_type==="categories"&&this.data.js.linkingOn)
this._eo.data.linkingProduct=RightNow.UI.Form.currentProduct;if(this._flatTreeViewData)
this._displayAccessibleDialog();else
RightNow.Event.fire("evt_accessibleTreeViewRequest",this._eo);},_getAccessibleTreeViewResponse:function(e,args)
{if(args[0].data.hm_type!=this._eo.data.hm_type)
return;var evtObj=args[0];if(evtObj.data.data_type==this.data.attrs.data_type)
{this._flatTreeViewData=evtObj.data.accessibleLinks;var noValue={0:RightNow.Interface.getMessage("NO_VAL_LBL"),1:0,hier_list:0,level:0};if(!YAHOO.lang.isArray(this._flatTreeViewData))
{var tempArray=[];for(var i in this._flatTreeViewData)
if(!isNaN(parseInt(i)))
tempArray[i]=this._flatTreeViewData[i];this._flatTreeViewData=tempArray;}
this._flatTreeViewData.unshift(noValue);var htmlList="<p><a href='javascript:void(0)' id='rn_"+this.instanceID+"_Intro'"+"onclick='try{document.getElementById(\"rn_"+this.instanceID+"_AccessibleLink_"+noValue[1]+"\").focus();}catch(e){}'>"+RightNow.Text.sprintf(RightNow.Interface.getMessage("PLS_SEL_PCT_S_LINKS_DEPTH_ANNOUNCED_MSG"),this.data.attrs.label_input)+" <span id='rn_"+this.instanceID+"_IntroCurrentSelection'>"+RightNow.Text.sprintf(RightNow.Interface.getMessage("SELECTION_PCT_S_ACTIVATE_LINK_JUMP_MSG"),noValue[0])+"</span></a></p>";var previousLevel=-1;for(var i in this._flatTreeViewData)
{if(this._flatTreeViewData.hasOwnProperty(i))
{var item=this._flatTreeViewData[i];if(item.level>previousLevel)
htmlList+="<ol>";while(item.level<previousLevel)
{htmlList+="</li></ol>";previousLevel--;}
if(item.level===previousLevel)
htmlList+="</li>";htmlList+="<li>"+'<a href="javascript:void(0)" id="rn_'+this.instanceID+'_AccessibleLink_'+item[1]+'" class="rn_AccessibleHierLink" hierList="'+item['hier_list']+'">'+item[0]+'</a>';previousLevel=item.level;}}
for(var i=previousLevel;i>=0;--i)
htmlList+="</li></ol>";htmlList+="<div id='rn_"+this.instanceID+"_AccessibleErrorLocation'></div>";this._accessibleView.innerHTML=htmlList;var allNodes=YAHOO.util.Dom.getElementsByClassName("rn_AccessibleHierLink","a",this._accessibleView);YAHOO.util.Event.addListener(allNodes,"click",this._accessibleLinkClick,null,this);this._displayAccessibleDialog();}},_accessibleLinkClick:function(e)
{var element=YAHOO.util.Event.getTarget(e);var hierArray=element.getAttribute("hierList").split(",");var i=hierArray.length-1;var currentNode=null;while(!currentNode&&i>=0)
{currentNode=this._tree.getNodeByProperty("hierValue",parseInt(hierArray[i]));i--;}
i++;if(this._noValueNodeIndex===currentNode.index||currentNode.hierValue==hierArray[hierArray.length-1])
{this._tree.fireEvent('clickEvent',{node:currentNode});}
else
{var onExpandComplete=function(expandingNode)
{if(expandingNode.nextToExpand)
{var nextNode=this._tree.getNodeByProperty("hierValue",parseInt(expandingNode.nextToExpand));if(nextNode)
{nextNode.nextToExpand=hierArray[++i];nextNode.expand();}}
else if(i===hierArray.length)
{this._tree.unsubscribe("expandComplete",onExpandComplete,null);this._tree.fireEvent('clickEvent',{node:expandingNode});}
return true;};this._tree.subscribe("expandComplete",onExpandComplete,null,this);currentNode.nextToExpand=hierArray[++i];currentNode.expand();}
return false;},_toggleProductCategoryPicker:function(event)
{if(!this._tree)
this._buildTree();if(this._expandNode){this._expandNode.expand();this._expandNode=null;}
if(this._panel.cfg.getProperty("visible")===false)
{this._panel.syncPosition();this._panel.show();var currentNode=this._tree.getNodeByIndex(this._currentIndex);if(currentNode&&currentNode.focus)
{try{currentNode.focus();}catch(e){}}
else if(this._tree.getRoot().children[0]&&this._tree.getRoot().children[0].focus)
{try{this._tree.getRoot().children[0].focus();}catch(e){}}
this._toggleProductCategoryPicker._closeListener=this._toggleProductCategoryPicker._closeListener||function(event)
{if(this._panel.cfg.getProperty("visible"))
{var coordinates=YAHOO.util.Event.getXY(event);if((event.type==="click"&&YAHOO.util.Event.getTarget(event).id===this._displayField.id)||coordinates[0]===0||coordinates[1]===0)
return;coordinates=new YAHOO.util.Point(coordinates[0],coordinates[1]);var panelRegion=YAHOO.util.Dom.getRegion("rn_"+this.instanceID+"_Tree"),buttonRegion=YAHOO.util.Dom.getRegion(this._displayField);if(panelRegion&&buttonRegion&&(!panelRegion.contains(coordinates)&&!buttonRegion.contains(coordinates)))
{this._displaySelectedNodesAndClose();YAHOO.util.Event.removeListener(document,this._toggleProductCategoryPicker._closeListener);}}};YAHOO.util.Event.addListener(document,"click",this._toggleProductCategoryPicker._closeListener,null,this);}
else
{this._displaySelectedNodesAndClose();YAHOO.util.Event.removeListener(document,this._toggleProductCategoryPicker._closeListener);}},_getSelectedNodesMessage:function()
{this._currentIndex=this._currentIndex||1;var hierValues=[],currentNode=this._tree.getNodeByIndex(this._currentIndex);while(currentNode&&!currentNode.isRoot())
{hierValues.push(currentNode.label);currentNode=currentNode.parent;}
return hierValues.reverse();},_displaySelectedNodesAndClose:function(focus)
{this._eo.data.value=this._currentIndex;RightNow.Event.fire("evt_productCategorySelected",this._eo);this._panel.hide();YAHOO.util.Dom.setAttribute(this._displayField,"aria-busy","true");if(this._dialog&&this._dialog.cfg.getProperty("visible"))
this._dialog.hide();if(this._currentIndex<=this._noValueNodeIndex||(this._currentIndex==this._defaultIndex&&this.data.attrs.data_type==="products"))
{this._displayFieldVisibleText.innerHTML=this.data.attrs.label_nothing_selected;var description=document.getElementById("rn_"+this.instanceID+"_TreeDescription");if(description)
description.innerHTML=this.data.attrs.label_nothing_selected;}
else
{var hierValues=this._getSelectedNodesMessage(),field=this._displayFieldVisibleText;var inner="";if(hierValues.length>0){inner+="<span class='NodeLevel"+(hierValues.length-1)+"'>"+hierValues[hierValues.length-1];inner+="</span>";}
if(YAHOO.env.ua.webkit){setTimeout(function(){field.innerHTML=inner;},1);}
else{field.innerHTML=inner;}
var description=document.getElementById("rn_"+this.instanceID+"_TreeDescription");if(description)
description.innerHTML=this.data.attrs.label_screen_reader_selected+hierValues;}
YAHOO.util.Dom.setAttribute(this._displayField,"aria-busy","false");if(this._displayField.focus&&!this._dialog&&focus)
try{this._displayField.focus();}catch(e){}},_enterPressed:function(keyEvent)
{this._selectNode({node:keyEvent});},_selectNode:function(clickEvent)
{if(clickEvent.node.isLeaf||!clickEvent.node.hasChildren()){this._currentIndex=clickEvent.node.index;this._selected=true;if(!clickEvent.node.expanded&&this._currentIndex!==this._noValueNodeIndex&&!clickEvent.node.dynamicLoadComplete||this.data.js.linkingOn)
this._getSubLevelRequest(clickEvent.node);else
{this._errorLocation="";this._checkRequiredLevel();}
this._displaySelectedNodesAndClose(true);if(clickEvent.event)
YAHOO.util.Event.preventDefault(clickEvent.event);this._notifyHierValues();return false;}},_getSubLevelRequest:function(expandingNode)
{if(this._nodeBeingExpanded)return;this._nodeBeingExpanded=true;this._eo.data.level=expandingNode.depth+1;this._eo.data.value=expandingNode.hierValue;this._eo.data.label=expandingNode.label;this._currentIndex=expandingNode.index;if(this.data.attrs.data_type==="products")
{RightNow.UI.Form.currentProduct=this._eo.data.value;RightNow.UI.Form.linkingOn=this.data.js.linkingOn;RightNow.UI.Form.linkingFilter=this.data.attrs.data_type;}
this._eo.data.reset=false;if(this._eo.data.linking_on)
{if(this.data.attrs.data_type==="categories")
{if(expandingNode.children.length)
{this._nodeBeingExpanded=false;return;}
this._eo.data.reset=(this._eo.data.value<1);}
else if(this._eo.data.value<1&&this.data.attrs.data_type==="products")
{var eo=new RightNow.Event.EventObject();eo.data={"reset_linked_category":true,"data_type":"categories","reset":true};this._nodeBeingExpanded=false;RightNow.Event.fire("evt_menuFilterGetResponse",eo);return;}}
if(this.data.js.link_map)
{this._eo.data.link_map=this.data.js.link_map;delete this.data.js.link_map;}
RightNow.Event.fire("evt_menuFilterRequest",this._eo);if(this._eo.data.link_map)
delete this._eo.data.link_map;this._nodeBeingExpanded=false;},_getSubLevelResponse:function(type,args)
{var evtObj=args[0];if((evtObj.w_id&&evtObj.w_id===this.instanceID)||(this.data.js.linkingOn&&evtObj.data.data_type==="categories"&&this.data.attrs.data_type===evtObj.data.data_type))
{if(evtObj.data.reset_linked_category)
{var postData={"filter":"products","lvl":(evtObj.data.level+1),"id":RightNow.UI.Form.currentProduct,"linking":RightNow.UI.Form.linkingOn};var eo=new RightNow.Event.EventObject();RightNow.Ajax.makeRequest("../../../../../../https@help.elsevier.com\ci\ajaxrequestmin\gethiervalues",postData,{"successHandler":this._updateLinkMap,"scope":this,"data":eo,"type":"GETPOST"});if(this.data.js.link_map)
delete this.data.js.link_map;if(!this._tree||evtObj.data.reset)
{this._buildTree();this._linkedCategorySubset=false;}
this._flatTreeViewData=null;var currentRoot=this._tree.getRoot();if(!evtObj.data.reset)
{this._linkedCategorySubset=true;currentRoot.dynamicLoadComplete=false;this._tree.removeChildren(currentRoot);var tempNode=new YAHOO.widget.MenuNode(RightNow.Interface.getMessage("NO_VAL_LBL"),currentRoot,false);tempNode.hierValue=0;tempNode.href='javascript:void(0);';tempNode.className="rn_NoValueNode";tempNode.isLeaf=true;this._noValueNodeIndex=this._currentIndex=tempNode.index;}
this._expandNode=null;this._displayFieldVisibleText.innerHTML=this.data.attrs.label_nothing_selected;var description=document.getElementById("rn_"+this.instanceID+"_TreeDescription");if(description)
description.innerHTML=this.data.attrs.label_screen_reader_selected+this.data.attrs.label_nothing_selected;}
else
{var currentRoot=this._tree.getNodeByIndex(this._currentIndex);}
var hierLevel=evtObj.data.level,hierData=evtObj.data.hier_data;if(hierLevel<7)
{currentHierValue=0;if(currentRoot.hierValue){currentHierValue=currentRoot.hierValue;}
linkedSubs=null;if(this._ajaxLinkMap){linkedSubs=this._ajaxLinkMap[currentHierValue];}
for(var i=0,tempNode,hierValue,hasChildrenIndex;i<hierData.length;i++)
{hierValue=hierData[i][0];visibleSub=false;if(linkedSubs){for(var s=0;s<linkedSubs.length;s++){if(linkedSubs[s][0]==hierValue){visibleSub=true;break;}}}
if((visibleSub||currentHierValue==0)&&(!currentRoot.children[i]||currentRoot.children[i].hierValue!==hierValue))
{hasChildrenIndex=hierData[i].length-1;tempNode=new YAHOO.widget.MenuNode(hierData[i][1],currentRoot,false);tempNode.hierValue=hierValue;tempNode.href='javascript:void(0);';if(!hierData[i][hasChildrenIndex])
{tempNode.dynamicLoadComplete=true;tempNode.iconMode=1;}}}
currentRoot.loadComplete();if(hierData.length===0&&!this._selected)
{this._displaySelectedNodesAndClose();}
else if(this._selected&&this.data.attrs.required_lvl)
{this._errorLocation="";this._checkRequiredLevel();this._selected=false;}}}},_updateLinkMap:function(o){if(o.argument!=null){var eventObject=o.argument;if(o.responseText!==undefined){var results=RightNow.JSON.parse(o.responseText);if(results){this._ajaxLinkMap=results.link_map;}}}},_setButtonClick:function()
{var hierValues=[];if(this._currentIndex>this._noValueNodeIndex)
{YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_Hidden");var currentNode=this._tree.getNodeByIndex(this._currentIndex),index=currentNode.depth+1,temp;while(currentNode&&!currentNode.isRoot())
{temp={"id":currentNode.hierValue,"label":currentNode.label};hierValues[index]=temp;currentNode=currentNode.parent;index--;}
this._currentIndex=this._noValueNodeIndex;var description=document.getElementById("rn_"+this.instanceID+"_TreeDescription");if(this._displayField&&description)
description.innerHTML=this._displayFieldVisibleText.innerHTML=this.data.attrs.label_nothing_selected;}
else
{if(this._errorMessageDiv===undefined)
{this._errorMessageDiv=document.createElement("div");this._errorMessageDiv=YAHOO.util.Dom.insertBefore(this._errorMessageDiv,"rn_"+this.instanceID);YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_MessageBox");YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_ErrorMessage");}
this._errorMessageDiv.innerHTML="<b><a href='javascript:void(0);' onclick='document.getElementById(\""+this._displayField.id+"\").focus(); return false;'>"+
this.data.attrs.label_nothing_selected+"</a></b>";YAHOO.util.Dom.removeClass(this._errorMessageDiv,"rn_Hidden");var errorLink=YAHOO.util.Dom.getElementBy(function(){return true;},"A",this._errorMessageDiv);if(errorLink)
errorLink.focus();return;}
this._eo.data.hierSetData=hierValues;RightNow.Event.fire("evt_menuFilterSelectRequest",this._eo);},_onValidateRequest:function(type,args)
{this._parentForm=this._parentForm||RightNow.UI.findParentForm("rn_"+this.instanceID);this._eo.data.form=this._parentForm;if(RightNow.UI.Form.form===this._parentForm)
{this._errorLocation=args[0].data.error_location;if(this._checkRequiredLevel())
{if(this.data.attrs.table==="contacts")
this._eo.data.profile=true;var hierValues=[];if(this._currentIndex!==this._noValueNodeIndex)
{var currentNode=this._tree.getNodeByIndex(this._currentIndex);while(currentNode&&!currentNode.isRoot())
{hierValues.push(currentNode.hierValue);currentNode=currentNode.parent;}}
this._eo.data.value=hierValues.reverse();var tempCache=this._eo.data.cache;delete this._eo.data.cache;RightNow.Event.fire("evt_formFieldValidateResponse",this._eo);this._eo.data.cache=tempCache;}}
else
{RightNow.Event.fire("evt_formFieldValidateResponse",this._eo);}
RightNow.Event.fire("evt_formFieldCountRequest");},_checkRequiredLevel:function()
{if(this.data.attrs.required_lvl&&!YAHOO.util.Dom.hasClass('foo','rn_Hidden'))
{if(!this._tree)
{this._buildTree();this._currentIndex=this._noValueNodeIndex;this._displaySelectedNodesAndClose();}
var currentNode=this._tree.getNodeByIndex(this._currentIndex);this._removeRequiredError(currentNode);var currentDepth=(currentNode)?currentNode.depth+1:1;if(this.data.js.linkingOn&&this.data.attrs.data_type==="categories"&&this._linkedCategorySubset)
{if(this._tree.getNodeCount()===1)
{return true;}
else if(currentDepth<this.data.attrs.required_lvl&&(currentNode.hasChildren(false)||this._currentIndex===this._noValueNodeIndex))
{this._displayRequiredError(currentNode);return false;}}
else if((!currentNode)||(this._currentIndex===this._noValueNodeIndex)||((currentNode.hasChildren(false))&&(currentDepth<this.data.attrs.required_lvl)))
{this._displayRequiredError(currentNode);return false;}}
return true;},_removeRequiredError:function(currentNode)
{YAHOO.util.Dom.removeClass(this._displayField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");currentNode=(this._displayRequiredError.errorNode)?this._displayRequiredError.errorNode:currentNode;if(currentNode)
YAHOO.util.Dom.removeClass(currentNode.getEl(),"rn_ErrorField");YAHOO.util.Dom.replaceClass("rn_"+this.instanceID+"_RequiredLabel","rn_RequiredLabel","rn_Hidden");if(this._accessibleErrorMessageDiv)
YAHOO.util.Dom.addClass(this._accessibleErrorMessageDiv,"rn_Hidden");},_displayRequiredError:function(currentNode)
{YAHOO.util.Dom.addClass(this._displayField,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");if(!currentNode)
currentNode=this._tree.getRoot().children[0];YAHOO.util.Dom.addClass(currentNode.getEl(),"rn_ErrorField");this._displayRequiredError.errorNode=currentNode;var message=this.data.attrs.label_nothing_selected;if(this._currentIndex!==this._noValueNodeIndex)
message=(this.data.attrs.label_required.indexOf("%s")>-1)?RightNow.Text.sprintf(this.data.attrs.label_required,currentNode.label):this.data.attrs.label_required;var requiredLabel=document.getElementById("rn_"+this.instanceID+"_RequiredLabel");if(requiredLabel)
{requiredLabel.innerHTML=message;YAHOO.util.Dom.replaceClass(requiredLabel,"rn_Hidden","rn_RequiredLabel");}
var commonErrorDiv=document.getElementById(this._errorLocation);if(commonErrorDiv)
{if(RightNow.UI.Form.chatSubmit&&RightNow.UI.Form.errorCount==1)
commonErrorDiv.innerHTML="";var errorMessage="<div><b><a href='#' onclick='document.getElementById(\""+this._displayField.id+"\").focus(); return false;'>"+
this.data.attrs.label_input+" - "+message+"</a></b></div> ";commonErrorDiv.innerHTML+=errorMessage;RightNow.UI.Form.errorCount++;RightNow.UI.formError=true;}
if(this._dialog&&this._dialog.cfg.getProperty("visible"))
{if(!this._accessibleErrorMessageDiv)
this._accessibleErrorMessageDiv=document.getElementById("rn_"+this.instanceID+"_AccessibleErrorLocation");var errorMessage="<div><b><a id='rn_"+this.instanceID+"_FocusLink' href='javascript:void(0);' onclick='try{document.getElementById(\""+"rn_"+this.instanceID+"_AccessibleLink_"+currentNode.hierValue+"\").focus();} catch(e){} return false;'>"+
this.data.attrs.label_input+" - "+message+"</a></b></div> ";this._accessibleErrorMessageDiv.innerHTML=errorMessage;YAHOO.util.Dom.addClass(this._accessibleErrorMessageDiv,"rn_MessageBox");YAHOO.util.Dom.addClass(this._accessibleErrorMessageDiv,"rn_ErrorMessage");YAHOO.util.Dom.removeClass(this._accessibleErrorMessageDiv,"rn_Hidden");var errorLink=document.getElementById("rn_"+this.instanceID+"_FocusLink");RightNow.UI.updateVirtualBuffer();if(errorLink)
errorLink.focus();}},_initializeHint:function()
{var hint_link=document.createElement("a");hint_link.id="rn_"+this.instanceID+"_HintLink";hint_link.href="";hint_link.innerHTML="<img src='../../../../../../https@help.elsevier.com\euf\assets\images\help.gif' alt='?'/>";YAHOO.util.Dom.addClass(hint_link,"rn_HintIcon");var overlay=document.createElement("div");overlay.id="rn_"+this.instanceID+"_Hint";YAHOO.util.Dom.addClass(overlay,"rn_HintBox");if(this._displayField)
{YAHOO.util.Dom.insertAfter(hint_link,this._displayField);YAHOO.util.Dom.insertAfter(overlay,hint_link);}
overlay=new YAHOO.widget.Overlay(overlay,{visible:false});overlay.setBody(this.data.attrs.hint);overlay.render();YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Hint","rn_Hidden");YAHOO.util.Event.addListener(hint_link,"click",function(e){YAHOO.util.Event.preventDefault(e);});YAHOO.util.Event.addListener(hint_link,"mouseover",function(){overlay.show();});YAHOO.util.Event.addListener(hint_link,"mouseout",function(){overlay.hide();});}};
RightNow.Widget.HintDisplay=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._hidden=false;this._lastDynamicFieldValues=null;this._div=document.getElementById("rn_"+this.instanceID);if(!this._div)return;if(this.data.js.fieldVisibility){if(!this._lastDynamicFieldValues){this._hidden=true;this.data.attrs.required=false;if(this._div){YAHOO.util.Dom.addClass(this._div,"rn_Hidden");}
this._lastDynamicFieldValues=new Array();}}
RightNow.Event.subscribe("evt_fieldChange",this._onDynamicFieldChange,this,this.data.js.fieldVisibility);var eo=new RightNow.Event.EventObject();RightNow.Event.fire("evt_hierValueNotificationRequest",eo);if(!Array.indexOf){Array.prototype.indexOf=function(obj){for(var i=0;i<this.length;i++){if(this[i]==obj){return i;}}
return-1;}}};RightNow.Widget.HintDisplay.prototype={_onDynamicFieldChange:function(type,args,vis){var eventObj=args[0];var trigger=eventObj.data.field;fieldVisibility=vis;if(!fieldVisibility||!fieldVisibility[trigger]){return;}
currentValue=eventObj.data.value;if(!this._lastDynamicFieldValues||!this._lastDynamicFieldValues[trigger]||currentValue!=this._lastDynamicFieldValues[trigger]){if(fieldVisibility[trigger]&&(fieldVisibility[trigger].length>0)){if(fieldVisibility[trigger].indexOf(currentValue)>=0){this._hidden=false;if(this._div){YAHOO.util.Dom.removeClass(this._div,"rn_Hidden");}}
else{this._hidden=true;if(this._div){YAHOO.util.Dom.addClass(this._div,"rn_Hidden");}}}
this._lastDynamicFieldValues[trigger]=currentValue;}}};
RightNow.Widget.SmartAssistantDialog=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._dialogBody=document.getElementById("rn_"+this.instanceID);this._askForm=document.getElementById("rn_AskQuestionForm");RightNow.Event.subscribe("evt_formButtonSubmitResponse",this._displayResults,this);RightNow.Event.subscribe("evt_toggleForm",this._displayDialog,this);RightNow.Event.subscribe("evt_cancelFormRequest",this._onCancel,this);RightNow.UI.Form.smartAssistant=true;};RightNow.Widget.SmartAssistantDialog.prototype={_displayResults:function(evt,args)
{var result=args[0];if(result&&result.sa)
{RightNow.UI.Form.smartAssistant=false;var saDisplay="",displayButton=true,inlineContent=false,answerIDs=[],displayedAnswers=0;if(result.sa.length>0)
{for(var i=0,saReturn;i<result.sa.length;i++)
{saReturn=result.sa[i];if(saReturn.type===1)
{if(this.data.attrs.accesskeys_enabled&&this.data.attrs.label_accesskey&&this.data.attrs.display_answers_inline)
{var keyComboString,ua=YAHOO.env.ua,os,userAgentString=navigator&&navigator.userAgent;if(userAgentString){if((/windows|win32/i).test(userAgentString))
os='windows';else if((/macintosh/i).test(userAgentString))
os='macintosh';}
if(os){if(ua.ie){keyComboString=RightNow.Interface.getMessage("ALT_LBL");}
else if(ua.gecko){if(os==="windows")
keyComboString=RightNow.Interface.getMessage("ALT_PLUS_SHIFT_LBL");else
keyComboString=RightNow.Interface.getMessage("CTRL_LBL");}
else if(ua.webkit){if(os==="windows")
keyComboString=RightNow.Interface.getMessage("ALT_LBL");else
keyComboString=RightNow.Interface.getMessage("CTRL_PLUS_OPT_LBL");}
else{keyComboString=RightNow.Interface.getMessage("ACCESSKEY_LBL");}}
else{keyComboString=RightNow.Interface.getMessage("ACCESSKEY_LBL");}
saDisplay+="<div class='rn_AccesskeyPrompt'> "+RightNow.Text.sprintf(this.data.attrs.label_accesskey,keyComboString,saReturn.val.length)+"</div>";}
saDisplay+="<ul class='rn_List"+
((this.data.attrs.display_answers_inline)?" rn_InlineAnswers":"")+"'>";for(var j=0;j<saReturn.val.length;j++)
{if(this.data.attrs.display_answers_inline)
{answerIDs.push("rn_"+this.instanceID+"_Answer"+saReturn.val[j][0]);saDisplay+="<li class='rn_ExpandAnswer'><a href='javascript:void(0)'";if(this.data.attrs.accesskeys_enabled)
saDisplay+=" accesskey='"+(j+1)+"'";saDisplay+=" class='rn_InlineAnswerLink rn_ExpandAnswer' id='"+answerIDs[j]+"'>"+saReturn.val[j][1]+"<span class='rn_ScreenReaderOnly' role='alert' id='"+answerIDs[j]+"_Alternative'> "+this.data.attrs.label_collapsed+"</span></a></li>";}
else
{saDisplay+="<li><a target='_blank' href='../../../../../../https@help.elsevier.com\app\"+RightNow.Interface.getConfig('CP_ANSWERS_DETAIL_URL')+'/a_id/'+saReturn.val[j][0]+result.sessionParm+"'>"+saReturn.val[j][1]+"</a></li>";}}
saDisplay+="</ul>";displayedAnswers++;}
else if(saReturn.type===2)
{saDisplay+="<div class='rn_Answer'>"
+" <div class='rn_Summary'>"+saReturn.val[0][1]+"</div>"
+" <div class='rn_Solution'>"+saReturn.val[0][2]+"</div>"
+"</div>";inlineContent=true;displayedAnswers++;}
if(typeof saReturn.add_flag!=="undefined"&&saReturn.add_flag==false)
displayButton=false;}}
if(displayedAnswers==0)
{RightNow.Event.fire("evt_saNoResults");return;}
else
{RightNow.Event.fire("evt_saDisplay");}
if(this._dialogBody)
{dialogContent=document.getElementById("rn_"+this.instanceID+"_DialogContent");if(dialogContent)
{dialogContent.innerHTML=saDisplay;if(answerIDs.length)
this._enableInlineAnswers(answerIDs);if(inlineContent||!answerIDs.length)
this._modifyLinkTargets(dialogContent);}
YAHOO.util.Dom.removeClass(this._dialogBody,"rn_Hidden");if(this._askForm)
{YAHOO.util.Dom.addClass(this._askForm,"rn_Hidden");}}}},_modifyLinkTargets:function(rootElement)
{var Dom=YAHOO.util.Dom,links=Dom.getElementsBy(function(){return true;},"a",rootElement);for(var i=0,length=links.length;i<length;i++)
{Dom.setAttribute(links[i],"target","_blank");}},_extendLinksTargetsForProduct:function(rootElement)
{var msgLinks=rootElement.getElementsByTagName("a");for(var i=0;i<msgLinks.length;i++)
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
newHref+=this.data.js.appendedParameters;msgLinks[i].setAttribute('href',newHref);break;}}}},_enableInlineAnswers:function(answerIDs)
{this._answersLoaded={};RightNow.Event.subscribe("evt_getAnswerResponse",this._displayAnswerContent,this);YAHOO.util.Event.on(answerIDs,"click",function(evt){YAHOO.util.Event.stopEvent(evt);var clicked=YAHOO.util.Event.getTarget(evt),answerID=RightNow.Text.getSubstringBetween(clicked.id,"_Answer"),eventObject;if(answerID!==null)
{answerID=parseInt(answerID,10);if(typeof this._answersLoaded[answerID]==="undefined")
{eventObject=new RightNow.Event.EventObject();eventObject.data.answerID=answerID;eventObject.w_id=this.instanceID;clicked.innerHTML+="<span class='rn_Loading' aria-live='assertive'><span class='rn_ScreenReaderOnly'>"+RightNow.Interface.getMessage("LOADING_ELLIPSES_LBL")+"</span></span>";this._showingAnswer=clicked;if(this._dialogBody)
this._dialogBody.setAttribute("aria-busy","true");RightNow.Event.fire("evt_getAnswerRequest",eventObject);}
else
{this._toggleAnswerContent(answerID,!this._answersLoaded[answerID]);}}},null,this);},_displayAnswerContent:function(evt,args)
{var answer=args[0];if(args[1].w_id===this.instanceID&&this._showingAnswer&&this._showingAnswer.id.indexOf(args[1].data.answerID)>-1&&answer.a_id)
{this._answersLoaded[answer.a_id.value]=true;var answerWrapper=document.createElement("span"),url=answer.url.value,contents=answer.solution.value,fileAttachmentID=answer.fileID.value;if(fileAttachmentID&&url)
contents="<a href='../../../../../../https@help.elsevier.com\ci\fattach\get\"+fileAttachmentID+"\'>"+url+"</a> <img src='../../../../../../https@help.elsevier.com\app\ask_scopus\p\8150\session\images\icons\www.gif.htm' alt=''/>";else if(url)
contents="<a href='"+url+"'>"+url+"</a> <img src='../../../../../../https@help.elsevier.com\app\ask_scopus\p\8150\session\images\icons\www.gif.htm' alt=''/>";answerWrapper.id="rn_"+this.instanceID+"_AnswerContent"+answer.a_id.value;answerWrapper.className="rn_Answer rn_AnswerDetail rn_Hidden";answerWrapper.innerHTML=((answer.description.value)?"<span class='rn_AnswerSummary'>"+answer.description.value+"</span>":"")+"<span class='rn_AnswerSolution'>"+contents+"</span>";this._extendLinksTargetsForProduct(answerWrapper);this._modifyLinkTargets(answerWrapper);YAHOO.util.Dom.insertAfter(answerWrapper,this._showingAnswer);this._showingAnswer.removeChild(this._showingAnswer.lastChild);this._showingAnswer=null;this._toggleAnswerContent(answer.a_id.value,true);if(this._dialogBody)
this._dialogBody.setAttribute("aria-busy","false");}},_toggleAnswerContent:function(answerID,expand)
{var id="rn_"+this.instanceID+"_Answer",toggle=document.getElementById(id+answerID),toggle2=document.getElementById(id+answerID).parentNode,answer=document.getElementById(id+"Content"+answerID),alt=document.getElementById(id+answerID+"_Alternative"),replaceClass=YAHOO.util.Dom.replaceClass,setAttribute=YAHOO.util.Dom.setAttribute;if(expand)
{for(var i in this._answersLoaded)
{if(this._answersLoaded.hasOwnProperty(i)&&i!=answerID&&this._answersLoaded[i]===true)
{replaceClass(id+i,"rn_ExpandedAnswer","rn_ExpandAnswer");replaceClass(id+"Content"+i,"rn_ExpandedAnswerContent","rn_Hidden");element=document.getElementById(id+i).parentNode;replaceClass(element,"rn_ExpandedAnswer","rn_ExpandAnswer");document.getElementById(id+i+"_Alternative").innerHTML=this.data.attrs.label_collapsed;this._answersLoaded[i]=false;}}
replaceClass(answer,"rn_Hidden","rn_ExpandedAnswerContent");replaceClass(toggle,"rn_ExpandAnswer","rn_ExpandedAnswer");replaceClass(toggle2,"rn_ExpandAnswer","rn_ExpandedAnswer");alt.innerHTML=this.data.attrs.label_expanded;var toggleRegion=YAHOO.util.Region.getRegion(toggle);if(!YAHOO.util.Dom.getClientRegion().contains(toggleRegion))
{if(toggleRegion.y<=0&&toggle.scrollIntoView)
toggle.scrollIntoView();else
window.scrollTo(0,toggleRegion.y-20);}}
else
{replaceClass(answer,"rn_ExpandedAnswerContent","rn_Hidden");replaceClass(toggle,"rn_ExpandedAnswer","rn_ExpandAnswer");replaceClass(toggle2,"rn_ExpandedAnswer","rn_ExpandAnswer");alt.innerHTML=this.data.attrs.label_collapsed;}
this._answersLoaded[answerID]=expand;},_displayDialog:function()
{if(this._dialogBody)
{YAHOO.util.Dom.removeClass(this._dialogBody,"rn_Hidden");}},_onCancel:function()
{if(this._askForm)
{YAHOO.util.Dom.removeClass(this._askForm,"rn_Hidden");}
if(this._dialogBody)
{YAHOO.util.Dom.addClass(this._dialogBody,"rn_Hidden");}}};
RightNow.Widget.FormSubmit=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._requestInProgress=false;this._formButton=document.getElementById("rn_"+this.instanceID+"_Button");this._cancelButton=document.getElementById("rn_"+this.instanceID+"_CancelButton");this._formSubmitFlag=document.getElementById("rn_"+this.instanceID+"_Submission");if(!this._formButton||!this._formSubmitFlag)return;this._statusMessage=document.getElementById("rn_"+this.instanceID+"_StatusMessage");this._parentForm=RightNow.UI.findParentForm("rn_"+this.instanceID);this._entryID=null;this._willConfirm=false;this._submitCount=0;this._noResults=false;this._saDisplayed=false;this._errorMessageDiv=document.getElementById(this.data.attrs.error_location);if(!this._errorMessageDiv)
{var errorNode=document.createElement("div");errorNode.id="rn_"+this.instanceID+"_ErrorLocation";this._errorMessageDiv=YAHOO.util.Dom.insertBefore(errorNode,this._formButton);}
this._errorMessageDiv.tabIndex=-1;if(this._formSubmitFlag.value==="true")
{this._formButton.disabled=true;return;}
if(this._parentForm)
{this._enableClickListener();RightNow.Event.subscribe("evt_formButtonSubmitResponse",this._formSubmitResponse,this);RightNow.Event.subscribe("evt_formValidatedResponse",this._onFormValidated,this);RightNow.Event.subscribe("evt_formFailValidationResponse",this._onFormValidationFail,this);RightNow.Event.subscribe("evt_fileUploadRequest",this._disableClickListener,this);RightNow.Event.subscribe("evt_fileUploadResponse",this._enableClickListener,this);RightNow.Event.subscribe("evt_submitFormRequest",this._onButtonClick,this);RightNow.Event.subscribe("evt_saDisplay",this._saDisplay,this);RightNow.Event.subscribe("evt_saNoResults",this._saNoResults,this);RightNow.Event.subscribe("evt_formFieldValidateResponse",this._updateHierValues,this);if(this.data.js.sa_flag_name!="")
{RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidate,this);}}
else
{RightNow.UI.addDevelopmentHeaderError('FormSubmit must be placed within a form with a unique ID.');}
this._reportQuestionAction("hit",1);};RightNow.Widget.FormSubmit.prototype={_updateHierValues:function(type,args){var eventObject=args[0];if(eventObject&&eventObject.data){if(eventObject.data.data_type=="products"){this.data.js.products=eventObject.data.value;}
if(eventObject.data.data_type=="categories"){this.data.js.categories=eventObject.data.value;}}},_receiveEntryID:function(result)
{this._entryID=RightNow.JSON.parse(result['responseText']);},_reportQuestionAction:function(action,count,callback,args)
{var postData={"prods":RightNow.JSON.stringify(this.data.js.products),"cats":RightNow.JSON.stringify(this.data.js.categories),"entryID":this._entryID};postData["c"+action]=count;RightNow.Ajax.makeRequest("../../../../../../https@help.elsevier.com\ci\ajaxcustom\reportcustomquestionstats",postData,{successHandler:callback!=null?callback:this._receiveEntryID,scope:this,data:args});},_saDisplay:function(type,args)
{this._enableClickListener();if(this._cancelButton){YAHOO.util.Dom.removeClass(this._cancelButton,"rn_Hidden");}
if(this._statusMessage){YAHOO.util.Dom.addClass(this._statusMessage,"rn_Hidden");}
this._reportQuestionAction("display",1);this._saDisplayed=true;},_saNoResults:function(type,args)
{this._enableClickListener();this._noResults=true;this._onButtonClick();},_onButtonClick:function(type,args)
{if(this._requestInProgress)return false;this._disableClickListener();this._statusMessage.innerHTML="";YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_Hidden");if(this.data.attrs.error_header){this._errorMessageDiv.innerHTML="<div class='rn_ErrorHeader'><b>"+this.data.attrs.error_header+"</b></div>";}
else{this._errorMessageDiv.innerHTML="";}
var eo=new RightNow.Event.EventObject();eo.w_id=this.instanceID;eo.data={"form":this._parentForm,"error_location":this._errorMessageDiv.id,"f_tok":this.data.js.f_tok};if(YAHOO.env.ua.ie!==0)
if(window.external&&"AutoCompleteSaveForm"in window.external)
window.external.AutoCompleteSaveForm(document.getElementById(this._parentForm));RightNow.Event.fire("evt_formButtonSubmitRequest",eo);},_onCancelClick:function(type,args)
{this._willConfirm=false;if(this._cancelButton){YAHOO.util.Dom.addClass(this._cancelButton,"rn_Hidden");}
RightNow.Event.fire("evt_cancelFormRequest");this._reportQuestionAction("cancel",1);},_onValidate:function(type,args)
{var eo=new RightNow.Event.EventObject();eo.data={"name":this.data.js.sa_flag_name,"value":this._saDisplayed,"table":this.data.js.table,"required":false,"prev":this.data.js.prev,"form":RightNow.UI.findParentForm("rn_"+this.instanceID)};if(this.data.js.customID)
{eo.data.custom=true;eo.data.customID=this.data.js.customID;eo.data.customType=this.data.js.type;}
else
{eo.data.custom=false;}
eo.w_id=this.data.info.w_id;RightNow.Event.fire("evt_formFieldValidateResponse",eo);RightNow.Event.fire("evt_formFieldCountRequest");},_onFormValidated:function()
{if(RightNow.UI.Form.form===this._parentForm&&RightNow.UI.Form.formFields.length>0)
{YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_LoadingIcon","rn_Hidden");if(this._statusMessage)
this._statusMessage.innerHTML=RightNow.Interface.getMessage('SUBMITTING_ELLIPSIS_MSG');}},_onFormValidationFail:function()
{YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_MessageBox");YAHOO.util.Dom.addClass(this._errorMessageDiv,"rn_ErrorMessage");YAHOO.util.Dom.removeClass(this._errorMessageDiv,"rn_Hidden");this._errorMessageDiv.focus();this._enableClickListener();},_formSubmitResponse:function(type,args)
{if(!this._noResults||this._submitCount<1){if(this._willConfirm){this._reportQuestionAction("confirm",1,this._formSubmitResponseContinue,args);}
else{this._reportQuestionAction("submit",1,this._formSubmitResponseContinue,args);this._submitCount++;}}
else{var result={"argument":args};this._formSubmitResponseContinue(result);}},_formSubmitResponseContinue:function(resultObject)
{if(resultObject['responseText']){this._receiveEntryID(resultObject);}
var result=resultObject.argument[0];if(!result)
{if(this._statusMessage)
{this._statusMessage.innerHTML=RightNow.Interface.getMessage('ERROR_REQUEST_ACTION_COMPLETED_MSG');}
RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage('ERROR_REQUEST_ACTION_COMPLETED_MSG'),{icon:"WARN"});}
else if(result.sa)
{this._willConfirm=true;for(var i in result.sa)
{if(typeof result.sa[i].add_flag!=="undefined"&&result.sa[i].add_flag==false)
{this._disableClickListener();document.getElementById("rn_"+this.instanceID).innerHTML="";return;}}}
else if(result.status===1)
{this._reportQuestionAction("create",1,this._formSubmitResponseSuccess,resultObject.argument);}
else if(result.status==-1)
{RightNow.Url.navigate("../../../../../../https@help.elsevier.com\app\error\error_id\5"+result.sessionParm);}
else
{if(result.message)
{this._errorMessageDiv.innerHTML+="<div><b>"+result.message+"</b></div>";this._errorMessageDiv.tabIndex=0;this._onFormValidationFail();this._errorMessageDiv.tabIndex=-1;}
else
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage('ERROR_PAGE_PLEASE_S_TRY_MSG'),{icon:"WARN"});}}
this._enableClickListener();YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_LoadingIcon","rn_Hidden");if(this._statusMessage)
this._statusMessage.innerHTML="";},_formSubmitResponseSuccess:function(result)
{if(result['responseText']){this._receiveEntryID(result);}
var result=result.argument[0];this._formSubmitFlag.value="true";this._navigateToUrl=function()
{if(this.data.attrs.on_success_url)
{if(result.i_id)
{RightNow.Url.navigate(this.data.attrs.on_success_url+"/inc_id/"+result.i_id+result.sessionParm);}
else if(result.refno)
{RightNow.Url.navigate(this.data.attrs.on_success_url+'/refno/'+result.refno+result.sessionParm);}
else
{var sessionValue=result.sessionParm.substr(result.sessionParm.lastIndexOf("/")+1);if(!sessionValue&&this.data.js.redirectSession)
sessionValue=this.data.js.redirectSession;RightNow.Url.navigate(RightNow.Url.addParameter(this.data.attrs.on_success_url,'session',sessionValue));}}
else
{RightNow.Url.navigate(window.location+result.sessionParm);}};if(this.data.attrs.label_confirm_dialog!=='')
{var confirmDialog=RightNow.UI.Dialog.messageDialog(this.data.attrs.label_confirm_dialog,{exitCallback:{fn:this._navigateToUrl,scope:this},width:'250px'});confirmDialog.show();}
else
{this._navigateToUrl();return;}},_enableClickListener:function()
{this._formButton.disabled=this._requestInProgress=false;YAHOO.util.Event.addListener(this._formButton,"click",this._onButtonClick,null,this);if(this._cancelButton){this._cancelButton.disabled=false;if(!YAHOO.util.Event.getListeners(this._cancelButton,"click")){YAHOO.util.Event.addListener(this._cancelButton,"click",this._onCancelClick,null,this);}}},_disableClickListener:function()
{this._formButton.disabled=this._requestInProgress=true;YAHOO.util.Event.removeListener(this._formButton,"click",this._onButtonClick);if(this._cancelButton){this._cancelButton.disabled=true;YAHOO.util.Event.removeListener(this._cancelButton,"click",this._onCancelClick,null,this);}}};
RightNow.Widget.FileAttachmentUpload2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._eo.w_id=this.data.info.w_id;this._eo.instanceID=this.instanceID;this._attachmentCount=this.data.js.attachmentCount||0;this._attachments=[];this._parentForm=RightNow.UI.findParentForm("rn_"+this.instanceID);this._origEncType="";this._attachmentList=null;this._statusMessage=document.getElementById("rn_"+this.instanceID+"_StatusMessage");this._inputField=document.getElementById("rn_"+this.instanceID+"_FileInput");if(!this._inputField)return;if(this.data.attrs.valid_file_extensions)
this._validExtensions=this.data.attrs.valid_file_extensions.toLowerCase().replace(' ','').split(',');YAHOO.util.Event.addListener(this._inputField,"change",this._onFileAdded,null,this);YAHOO.util.Event.addListener(this._inputField,"keypress",this._onKeyPress,null,this);YAHOO.util.Event.addListener(this._inputField,"paste",function(){return false;});if(this._parentForm)
{this._origEncType=document.getElementById(this._parentForm).enctype;RightNow.Event.subscribe("evt_fileUploadResponse",this._fileUploadReturn,this);RightNow.Event.subscribe("evt_formFieldValidateRequest",this._onValidateUpdate,this);}
else
{RightNow.UI.addDevelopmentHeaderError("FileAttachmentUpload2 must be placed within a form with a unique ID.");}
this.data.attrs.max_attachments=(this.data.attrs.max_attachments===0)?Number.MAX_VALUE:this.data.attrs.max_attachments;if(this._attachmentCount===this.data.attrs.max_attachments)
this._inputField.disabled=true;};RightNow.Widget.FileAttachmentUpload2.prototype={_onKeyPress:function(event)
{var Key=YAHOO.util.KeyListener.KEY,keyPressed=event.keyCode;if(keyPressed&&keyPressed!==Key.ENTER&&keyPressed!==Key.TAB)
{YAHOO.util.Event.stopEvent(event);}
else if(YAHOO.env.ua.ie&&keyPressed===Key.ENTER)
{YAHOO.util.Event.stopEvent(event);}},_onFileAdded:function()
{if(this._inputField.value===""||this._uploading)
return;var Dom=YAHOO.util.Dom;if(this._validExtensions)
{Dom.removeClass(this._inputField.id,"rn_ErrorField");Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");var index=this._inputField.value.lastIndexOf('.'),fileExtension,allowSubmit=false;if(index!==-1&&index!==(this._inputField.value.length-1))
fileExtension=this._inputField.value.substring(index+1).toLowerCase();if(fileExtension)
{for(var i=0;i<this._validExtensions.length;i++)
{if(this._validExtensions[i]===fileExtension)
{allowSubmit=true;break;}}}
if(!allowSubmit)
{Dom.addClass(this._inputField.id,"rn_ErrorField");Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");if(this._statusMessage)
{Dom.removeClass(this._statusMessage,"rn_ScreenReaderOnly");this._statusMessage.innerHTML=RightNow.Text.sprintf(this.data.attrs.label_invalid_extension,'.'+this._validExtensions.join(", ."));}
return;}}
this._uploading=true;Dom.removeClass("rn_"+this.instanceID+"_LoadingIcon","rn_Hidden");if(this._statusMessage)
{Dom.removeClass(this._statusMessage,"rn_ScreenReaderOnly");this._statusMessage.innerHTML=RightNow.Interface.getMessage("UPLOADING_ELLIPSIS_MSG");}
var parentForm=document.getElementById(this._parentForm);parentForm.enctype=parentForm.encoding="multipart/form-data";YAHOO.util.Connect.setForm(parentForm,true);RightNow.Event.fire("evt_fileUploadRequest",this._eo);},_fileUploadReturn:function(type,response)
{if(response[1].instanceID===this.instanceID)
{YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_LoadingIcon","rn_Hidden");if(this._statusMessage)
{YAHOO.util.Dom.addClass(this._statusMessage,"rn_ScreenReaderOnly");this._statusMessage.innerHTML=RightNow.Interface.getMessage("FILE_UPLOAD_COMPLETE_LBL");this._statusMessage.tabIndex=0;RightNow.UI.updateVirtualBuffer();this._statusMessage.focus();}
var attachmentInfo=response[0],displayLimitMessage=false,originalFileName=this._inputField.value,lastIndex;this._inputField.value="";if(YAHOO.env.ua.ie||YAHOO.env.ua.webkit)
{var inputField=this._inputField.cloneNode(false);this._inputField.parentNode.replaceChild(inputField,this._inputField);this._inputField=document.getElementById(inputField.id);if(YAHOO.env.ua.ie>8||YAHOO.env.ua.webkit)
YAHOO.util.Event.addListener(this._inputField,"change",this._onFileAdded,null,this);}
var parentForm=document.getElementById(this._parentForm);parentForm.enctype=parentForm.encoding=this._origEncType;this._uploading=false;if(!attachmentInfo)
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("ERROR_REQUEST_ACTION_COMPLETED_MSG"),{icon:"WARN"});return;}
else if(attachmentInfo.error===2)
{RightNow.UI.Dialog.messageDialog(this.data.attrs.label_generic_error,{icon:"WARN"});return;}
else if(attachmentInfo.error===4||attachmentInfo.error===88)
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("FILE_PATH_FOUND_MSG"),{icon:"WARN"});return;}
else if(attachmentInfo.error===10)
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("FILE_ATT_UPLOAD_EMPTY_PLS_ENSURE_MSG"));return;}
else if(attachmentInfo.errorMessage)
{RightNow.UI.Dialog.messageDialog(attachmentInfo.errorMessage,{icon:"WARN"});return;}
this._attachmentCount++;if(this._attachmentCount===this.data.attrs.max_attachments)
{this._inputField.disabled=true;displayLimitMessage=true;}
else if(this._attachmentCount>this.data.attrs.max_attachments)
{this._inputField.disabled=true;return;}
if(attachmentInfo.name.lastIndexOf('*')!==-1)
{originalFileName=originalFileName.replace(/\\/g,'/'),lastIndex=originalFileName.lastIndexOf('/');if(lastIndex!==-1)
originalFileName=originalFileName.substr(lastIndex+1);attachmentInfo.name=originalFileName;}
attachmentInfo.name=attachmentInfo.name.replace("&amp;","&");var nextAttachment={"name":attachmentInfo.name,"tmp_name":attachmentInfo.tmp_name,"type":attachmentInfo.type,"size":attachmentInfo.size};this._attachments.push(nextAttachment);attachmentInfo.size/=1024;attachmentInfo.size=Math.round(attachmentInfo.size*100)/100;if(!this._attachmentList)
this._attachmentList=YAHOO.util.Dom.insertAfter(document.createElement("ul"),this._statusMessage);this._attachmentList.innerHTML+="<li>"+attachmentInfo.name+"&nbsp;("+attachmentInfo.size+RightNow.Interface.getMessage("KB_LBL")+")&nbsp;<a href='' onclick='RightNow.Widget.getWidgetInstance(\""+this.instanceID+"\").removeClick(this, "+(this._attachments.length-1)+");return false;'/>"+this.data.attrs.label_remove+" <span class='rn_ScreenReaderOnly'>"+attachmentInfo.name+"</span></a></li>";if(displayLimitMessage)
this._attachmentList.innerHTML+="<li>"+this.data.attrs.label_max_attachment_limit+"</li>";}},removeClick:function(item,index)
{this._attachments[index]=null;item.parentNode.parentNode.removeChild(item.parentNode);if(this._statusMessage)
{this._statusMessage.innerHTML=RightNow.Interface.getMessage("FILE_DELETED_LBL");YAHOO.util.Dom.addClass(this._statusMessage,"rn_ScreenReaderOnly");this._statusMessage.tabIndex=0;RightNow.UI.updateVirtualBuffer();this._statusMessage.focus();}
this._attachmentCount--;this._inputField.disabled=false;if(this._attachmentCount===this.data.attrs.max_attachments-1)
this._attachmentList.removeChild(this._attachmentList.lastChild);},_onValidateUpdate:function(type,args)
{this._eo.data={name:"fattach",custom:"false",table:"incidents",required:false,form:this._parentForm};if(RightNow.UI.Form.form===this._parentForm)
{this._formErrorLocation=args[0].data.error_location;YAHOO.util.Dom.removeClass(this._inputField,"rn_ErrorField");YAHOO.util.Dom.removeClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");var results=null,fattachIndex=0;if(this._attachmentCount<this.data.attrs.min_required_attachments)
{this._displayError(RightNow.Text.sprintf(this.data.attrs.label_min_required,'%s',this.data.attrs.min_required_attachments));RightNow.Event.fire("evt_formFieldCountRequest");return;}
if(this._attachmentCount>0)
{results={};for(var i=0,fileAttachment;i<this._attachments.length;i++)
{fileAttachment=this._attachments[i];if(fileAttachment!==null)
{results["fattach_item"+(fattachIndex++)]={localfname:fileAttachment.tmp_name,action:RightNow.Interface.Constants.ACTION_ADD,size:fileAttachment.size,private:0,userfname:fileAttachment.name,content_type:fileAttachment.type||"application/octet-stream"};}}}
this._eo.data.value=results;RightNow.Event.fire("evt_formFieldValidateResponse",this._eo);}
else
{RightNow.Event.fire("evt_formFieldValidateResponse",this._eo);}
RightNow.Event.fire("evt_formFieldCountRequest");},_displayError:function(errorMessage)
{var Form=RightNow.UI.Form;Form.errorCount++;if(this._formErrorLocation)
{var commonErrorDiv=document.getElementById(this._formErrorLocation);if(commonErrorDiv)
{if(Form.chatSubmit&&Form.errorCount===1)
commonErrorDiv.innerHTML="";var inputLabel=(this.data.attrs.label_error||this.data.attrs.label_input)+' ',label=(errorMessage.indexOf("%s")>-1)?RightNow.Text.sprintf(errorMessage,inputLabel):inputLabel+errorMessage;commonErrorDiv.innerHTML+="<div><b><a href='javascript:void(0);' onclick='document.getElementById(\""+
this._inputField.id+"\").focus(); return false;'>"+label+"</a></b></div> ";}}
YAHOO.util.Dom.addClass(this._inputField.id,"rn_ErrorField");YAHOO.util.Dom.addClass("rn_"+this.instanceID+"_Label","rn_ErrorLabel");}};