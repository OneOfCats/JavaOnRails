
RightNow.Widget.ProductCategoryList2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this.postData=null;RightNow.Event.subscribe("evt_searchFiltersResponse",this._onSearchFiltersResponse,this);RightNow.Event.subscribe("evt_searchFiltersResponse",this._addKeywordToCategorylinks,this);RightNow.Event.subscribe("evt_reportResponse",this._onReportResponse,this);this.initArgs=new Object();if(!this.data.js.filters||!this.data.js.filters.keyword)
{this.initArgs[0]=new Object();this.initArgs[0]['data']="";this.initArgs[0]['w_id']="";this.initArgs[0]['filters']=new Object();this.initArgs[0]['filters']['data']="";this.initArgs[0]['filters']['report_id']=this.data.attrs.report_id;this.initArgs[0]['filters']['rnSearchType']="keyword";this.initArgs[0]['filters']['searchName']="keyword";}
else
{this.initArgs[0]=this.data.js.filters.keyword;}
this._onSearchFiltersResponse(null,this.initArgs);this._onReportResponse(null,null);};RightNow.Widget.ProductCategoryList2.prototype={_onSearchFiltersResponse:function(type,args)
{if(args!=null&&args[0]!=null&&args[0]['filters']!=undefined&&args[0]['filters']['rnSearchType']!=undefined&&args[0]['filters']['rnSearchType']=="keyword")
{this.postData={"prodID":this.data.js.product_id,"catIDs":RightNow.JSON.stringify(this.data.js.categories),"report_id":this.data.attrs.report_id,"keyword":RightNow.JSON.stringify(args!=null?args[0]:new Object()),"format":RightNow.JSON.stringify(this.data.js.format),"filters":RightNow.JSON.stringify(this.data.js.filters),"reportToken":this.data.js.reportToken};}},_onReportResponse:function(type,args)
{if(this.postData!=null)
{var eo=new RightNow.Event.EventObject();RightNow.Ajax.makeRequest("../../../../../https@help.elsevier.com\ci\ajaxcustom\getanswercounts",this.postData,{successHandler:this._resetAnswerCounters,scope:this,data:eo});}},_resetAnswerCounters:function(eventObject)
{var fstlLvlCats=YAHOO.util.Dom.getElementsByClassName("rn_AnswersCount","span","rn_"+this.instanceID);var count=0;var answerCounts=RightNow.JSON.parse(eventObject['responseText']);for(var i in answerCounts)
{if(i!=0&&count<fstlLvlCats.length)
{if(answerCounts[i]>0){fstlLvlCats[count].innerHTML="("+answerCounts[i]+")";}
count++;}}
this.postData=null;},_addKeywordToCategorylinks:function(type,args)
{if(args!=null&&args[0]!=null&&args[0]['filters']!=undefined&&args[0]['filters']['rnSearchType']!=undefined&&args[0]['filters']['rnSearchType']=="keyword")
{var kw=args[0]['data'];var catLinks=YAHOO.util.Dom.getElementsByClassName("rn_CatLink","a","rn_"+this.instanceID);for(var i=0;i<catLinks.length;i++)
{var href=catLinks[i].getAttribute('href');var hrefArray=href.split("//");var kwReplaced=false;if(hrefArray.length<2)
{hrefArray=href.split('/');href="";}
else if(hrefArray.length==2)
{href=hrefArray[0]+"/";hrefArray=hrefArray[1].split('/');}
for(var j=0;j<hrefArray.length;j++)
{if((hrefArray[j]=="kw")&&(hrefArray.length>j+1)&&!kwReplaced)
{hrefArray[j+1]=kw;if(kw=="")
{hrefArray[j]=kw;}
kwReplaced=true;}
if(hrefArray[j]!="")
{href+="/"+hrefArray[j];}}
if(!kwReplaced)
{href+="../../../../../https@help.elsevier.com\kw\"+kw;}
catLinks[i].setAttribute('href',href);}}}};
RightNow.Widget.Multiline2=function(data,instanceID){this.data=data;this.instanceID=instanceID;this._reportingInProgress=false;this._previousSearch=this.data.js.previous_search_term;this._eo=new RightNow.Event.EventObject();this._contentName="rn_"+this.instanceID+"_Content";this._loadingName="rn_"+this.instanceID+"_Loading"
if(RightNow.Event.isHistoryManagerFragment())
this._setLoading(true);RightNow.Event.subscribe("evt_reportResponse",this._onReportChanged,this);RightNow.Event.subscribe("evt_searchInProgressRequest",this._searchInProgress,this);this._setFilter();RightNow.Event.fire("evt_setInitialFiltersRequest",this._eo);};RightNow.Widget.Multiline2.prototype={_setFilter:function()
{this._eo.w_id=this.instanceID;this._eo.filters={"report_id":this.data.attrs.report_id,"token":this.data.js.r_tok,"allFilters":this.data.js.filters,"format":this.data.js.format};this._eo.filters.format.parmList=this.data.attrs.add_params_to_url;},_searchInProgress:function(type,args)
{if(args[0].filters.report_id==this.data.attrs.report_id)
{document.body.setAttribute("aria-busy","true");this._setLoading(true);}},_setLoading:function(loading)
{if(loading)
{var element=document.getElementById(this._contentName);if(element)
{YAHOO.util.Dom.setStyle(element,"height",element.offsetHeight+"px");if(YAHOO.env.ua.ie)
YAHOO.util.Dom.addClass(element,"rn_Hidden");else
(new YAHOO.util.Anim(element,{opacity:{to:0}},0.4,YAHOO.util.Easing.easeIn)).animate();YAHOO.util.Dom.addClass(this._loadingName,"rn_Loading");}}
else
{YAHOO.util.Dom.removeClass(this._loadingName,"rn_Loading");if(YAHOO.env.ua.ie)
YAHOO.util.Dom.removeClass(this._contentName,"rn_Hidden");else
(new YAHOO.util.Anim(this._contentName,{opacity:{to:1}},0.4,YAHOO.util.Easing.easeIn)).animate();}},_onReportChanged:function(type,args)
{var newdata=args[0].data;this._setLoading(false);if(!this._reportingInProgress&&this._previousSearch!=args[0].data.search_term){this._reportKeywordChange(newdata.report_id,null,args);}
var alertDiv=document.getElementById("rn_"+this.instanceID+"_Alert");if(newdata.report_id==this.data.attrs.report_id)
{var currentPageSize=newdata.per_page;var cols=newdata.headers.length;var str="";var report=document.getElementById(this._contentName);if(!report)
return;if(newdata.total_num>0)
{if(alertDiv)
alertDiv.innerHTML=this.data.attrs.label_screen_reader_search_success_alert;if(newdata.row_num)
str+='<ol start="'+newdata.start_num+'">';else
str+='<ul>';for(var i=0;i<currentPageSize;i++)
{str+='<li>';str+='<span class="rn_Element1">'+newdata.data[i][0]+'&nbsp;</span>';str+=(newdata.data[i][1])?'<span class="rn_Element2">'+newdata.data[i][1]+'</span>':'';str+='<br/>';str+=(newdata.data[i][2])?'<span class="rn_Element3">'+newdata.data[i][2]+'</span><br/>':'';for(var j=3;j<cols;j++)
{str+='<span class="rn_ElementsHeader">'+newdata.headers[j]['heading'];if(newdata.headers[j]['heading']!="")
str+=':&nbsp;';str+='</span>';str+='<span class="rn_ElementsData">'+newdata.data[i][j]+'</span><br/>';}
str+='</li>';}
if(newdata.row_num)
str+='</ol>';else
str+='</ul>';report.innerHTML=str;}
else
{report.innerHTML="";if(alertDiv)
alertDiv.innerHTML=this.data.attrs.label_screen_reader_search_no_results_alert;}
YAHOO.util.Dom.setStyle(report,"height","auto");RightNow.Url.transformLinks(report);document.body.setAttribute("aria-busy","false");var anchors=report.getElementsByTagName('a');if(anchors&&anchors[0])
anchors[0].focus();}},_reportKeywordChange:function(reportID,callback,args)
{var postData={"repodtID":reportID,"filters":RightNow.JSON.stringify(args[0].filters.allFilters.filters),"perPage":args[0].data.total_num,"prods":RightNow.JSON.stringify(this.data.js.products),"cats":RightNow.JSON.stringify(this.data.js.categories)};this._reportingInProgress=true;this._previousSearch=args[0].data.search_term;RightNow.Ajax.makeRequest("../../../../../https@help.elsevier.com\ci\ajaxcustom\reportcustomkeywordsearch",postData,{successHandler:callback!=null?callback:this._receiveKeywordReporting,scope:this,data:args});},_receiveKeywordReporting:function()
{this._reportingInProgress=false;}};
RightNow.Widget.Paginator=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._eo=new RightNow.Event.EventObject();this._currentPage=this.data.js.currentPage;RightNow.Event.subscribe("evt_reportResponse",this._onReportChanged,this);for(var i=this.data.js.startPage;i<=this.data.js.endPage;i++)
{YAHOO.util.Event.addListener("rn_"+this.instanceID+"_PageLink_"+i,"click",this._onPageChange,i,this);}
YAHOO.util.Event.addListener("rn_"+this.instanceID+"_ForwardLink","click",this._onForward,null,this);YAHOO.util.Event.addListener("rn_"+this.instanceID+"_BackLink","click",this._onBack,null,this);this._setFilters();};RightNow.Widget.Paginator.prototype={_setFilters:function()
{this._eo.w_id=this.data.info.w_id;this._eo.data.per_page=this.data.attrs.per_page;this._eo.data.page=this._currentPage;this._eo.filters.report_id=this.data.attrs.report_id;},_onPageChange:function(evt,pageNumber)
{YAHOO.util.Event.preventDefault(evt);if(this._currentlyChangingPage||!pageNumber||pageNumber===this._currentPage)
return;this._currentlyChangingPage=true;RightNow.Event.fire("evt_searchInProgressRequest",this._eo);pageNumber=(pageNumber<1)?1:pageNumber;this._eo.data.page=this._currentPage=pageNumber;RightNow.Event.fire("evt_pageRequest",this._eo);},_onForward:function(evt)
{YAHOO.util.Event.preventDefault(evt);if(this._currentlyChangingPage)return;this._currentlyChangingPage=true;RightNow.Event.fire("evt_searchInProgressRequest",this._eo);this._currentPage++;this._eo.data.page=this._currentPage;RightNow.Event.fire("evt_pageRequest",this._eo);},_onBack:function(evt)
{YAHOO.util.Event.preventDefault(evt);if(this._currentlyChangingPage)return;this._currentlyChangingPage=true;RightNow.Event.fire("evt_searchInProgressRequest",this._eo);this._currentPage--;this._eo.data.page=this._currentPage;RightNow.Event.fire("evt_pageRequest",this._eo);},_onReportChanged:function(type,args)
{var newData=args[0];newData=newData.data;if(args[0].filters.report_id==this.data.attrs.report_id)
{this._currentPage=newData.page;var totalPages=newData.total_pages;if(totalPages<2||newData.truncated)
YAHOO.util.Dom.addClass("rn_"+this.instanceID,"rn_Hidden");else
{var pagesContainer=document.getElementById("rn_"+this.instanceID+"_Pages");if(pagesContainer)
{pagesContainer.innerHTML="";var startPage,endPage;if(this.data.attrs.maximum_page_links===0)
startPage=endPage=this._currentPage;else if(totalPages>this.data.attrs.maximum_page_links)
{var split=Math.round(this.data.attrs.maximum_page_links/2);if(this._currentPage<=split)
{startPage=1;endPage=this.data.attrs.maximum_page_links;}
else
{var offsetFromMiddle=this._currentPage-split;var maxOffset=offsetFromMiddle+this.data.attrs.maximum_page_links;if(maxOffset<=newData.total_pages)
{startPage=1+offsetFromMiddle;endPage=maxOffset;}
else
{startPage=newData.total_pages-(this.data.attrs.maximum_page_links-1);endPage=newData.total_pages;}}}
else
{startPage=1;endPage=totalPages;}
for(var i=startPage,link,titleString;i<=endPage;i++)
{if(i===this._currentPage)
{link=document.createElement("span");YAHOO.util.Dom.addClass(link,"rn_CurrentPage");link.innerHTML=i;}
else
{link=document.createElement("a");link.id="rn_"+this.instanceID+"_PageLink_"+i;link.href=this.data.js.pageUrl+i;link.innerHTML=i;titleString=this.data.attrs.label_page;if(titleString)
{titleString=titleString.replace(/%s/,i);titleString=titleString.replace(/%s/,newData.total_pages);link.title=titleString;}}
pagesContainer.appendChild(link);YAHOO.util.Event.addListener(link,"click",this._onPageChange,i,this);}
YAHOO.util.Dom.removeClass("rn_"+this.instanceID,"rn_Hidden");}}
var forwardButton=document.getElementById("rn_"+this.instanceID+"_ForwardLink");if(forwardButton)
{var forwardSpan=document.getElementById("rn_"+this.instanceID+"_ForwardSpan");if(newData.total_pages>newData.page)
{YAHOO.util.Dom.removeClass(forwardButton,"rn_Hidden");forwardButton.href=this.data.js.pageUrl+(this._currentPage+1);if(forwardSpan)
{YAHOO.util.Dom.addClass(forwardSpan,"rn_Hidden","rn_Hidden");}}
else
{YAHOO.util.Dom.addClass(forwardButton,"rn_Hidden","rn_Hidden");if(forwardSpan)
{YAHOO.util.Dom.removeClass(forwardSpan,"rn_Hidden");}}}
var backButton=document.getElementById("rn_"+this.instanceID+"_BackLink");if(backButton)
{var backSpan=document.getElementById("rn_"+this.instanceID+"_BackSpan");if(newData.page>1)
{YAHOO.util.Dom.removeClass(backButton,"rn_Hidden");backButton.href=this.data.js.pageUrl+(this._currentPage-1);if(backSpan)
{YAHOO.util.Dom.addClass(backSpan,"rn_Hidden");}}
else
{YAHOO.util.Dom.addClass(backButton,"rn_Hidden");if(backSpan)
{YAHOO.util.Dom.removeClass(backSpan,"rn_Hidden");}}}}
this._currentlyChangingPage=false;}};
RightNow.Widget.ResultInfo2=function(data,instanceID){this.data=data;this.instanceID=instanceID;RightNow.Event.subscribe("evt_reportResponse",this._onReportChanged,this);};RightNow.Widget.ResultInfo2.prototype={_onReportChanged:function(type,args)
{if(args[0].data&&args[0].data.report_id==this.data.attrs.report_id)
{var newData=args[0].data,resultQuery="",parameterList="";if(this.data.attrs.add_params_to_url!==""&&args[0].filters&&args[0].filters.allFilters&&args[0].filters.allFilters.format)
{args[0].filters.allFilters.format.parmList=this.data.attrs.add_params_to_url;parameterList=RightNow.Url.buildUrlLinkString(args[0].filters.allFilters);}
if(newData.search_term)
{var stopWords=newData.stopword,noDictWords=newData.not_dict,searchTerms=newData.search_term.split(" "),displayedNoResultsMsg=false;for(var i=0,word,strippedWord;i<searchTerms.length;i++)
{word=searchTerms[i];strippedWord=word.replace(/\W/,"");if(stopWords&&strippedWord&&stopWords.indexOf(strippedWord)!==-1)
word="<strike title='"+this.data.attrs.label_common+"'>"+word+"</strike>";else if(noDictWords&&strippedWord&&noDictWords.indexOf(strippedWord)!==-1)
word="<strike title='"+this.data.attrs.label_dictionary+"'>"+word+"</strike>";else
word="<a href='"+RightNow.Url.addParameter(this.data.js.linkUrl+word+parameterList,"session",RightNow.Url.getSession())+"'>"+word+"</a>";resultQuery+=word+" ";}
resultQuery=YAHOO.lang.trim(resultQuery);}
var spellingDiv=document.getElementById("rn_"+this.instanceID+"_Spell");if(spellingDiv)
{if(newData.spelling)
{spellingDiv.innerHTML=this.data.attrs.label_spell+' <a href="'+this.data.js.linkUrl+newData.spelling+parameterList+'">'+newData.spelling+' </a>';YAHOO.util.Dom.removeClass(spellingDiv,"rn_Hidden");}
else
{YAHOO.util.Dom.addClass(spellingDiv,"rn_Hidden");}}
var noResultsDiv=document.getElementById("rn_"+this.instanceID+"_NoResults");if(noResultsDiv)
{if(newData.total_num===0&&resultQuery)
{noResultsDiv.innerHTML=this.data.attrs.label_no_results+"<br/><br/>"+this.data.attrs.label_no_results_suggestions;YAHOO.util.Dom.removeClass(noResultsDiv,"rn_Hidden");displayedNoResultsMsg=true;}
else
{YAHOO.util.Dom.addClass(noResultsDiv,"rn_Hidden");}}
var resultsDiv=document.getElementById("rn_"+this.instanceID+"_Results");if(resultsDiv)
{if(!displayedNoResultsMsg&&!newData.truncated)
{if(resultQuery.length>0)
resultsDiv.innerHTML=RightNow.Text.sprintf(this.data.attrs.label_results_search_query,newData.start_num,newData.end_num,newData.total_num,resultQuery);else
resultsDiv.innerHTML=RightNow.Text.sprintf(this.data.attrs.label_results,newData.start_num,newData.end_num,newData.total_num);YAHOO.util.Dom.removeClass(resultsDiv,"rn_Hidden");}
else
{YAHOO.util.Dom.addClass(resultsDiv,"rn_Hidden");}}}}};