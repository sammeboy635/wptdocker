HARImporter.HARBase=class{constructor(data){if(!data||typeof data!=='object')
throw'First parameter is expected to be an object';}
static _safeDate(data){const date=new Date(data);if(!Number.isNaN(date.getTime()))
return date;throw'Invalid date format';}
static _safeNumber(data){const result=Number(data);if(!Number.isNaN(result))
return result;throw'Casting to number results in NaN';}
static _optionalNumber(data){return data!==undefined?HARImporter.HARBase._safeNumber(data):undefined;}
static _optionalString(data){return data!==undefined?String(data):undefined;}
customAsString(name){const value=(this)['_'+name];return value!==undefined?String(value):undefined;}
customAsNumber(name){let value=(this)['_'+name];if(value===undefined)
return;value=Number(value);if(Number.isNaN(value))
return;return value;}
customAsArray(name){const value=(this)['_'+name];return Array.isArray(value)?value:undefined;}};HARImporter.HARRoot=class extends HARImporter.HARBase{constructor(data){super(data);this.log=new HARImporter.HARLog(data['log']);}};HARImporter.HARLog=class extends HARImporter.HARBase{constructor(data){super(data);this.version=String(data['version']);this.creator=new HARImporter.HARCreator(data['creator']);this.browser=data['browser']?new HARImporter.HARCreator(data['browser']):undefined;this.pages=Array.isArray(data['pages'])?data['pages'].map(page=>new HARImporter.HARPage(page)):[];if(!Array.isArray(data['entries']))
throw'log.entries is expected to be an array';this.entries=data['entries'].map(entry=>new HARImporter.HAREntry(entry));this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARCreator=class extends HARImporter.HARBase{constructor(data){super(data);this.name=String(data['name']);this.version=String(data['version']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARPage=class extends HARImporter.HARBase{constructor(data){super(data);this.startedDateTime=HARImporter.HARBase._safeDate(data['startedDateTime']);this.id=String(data['id']);this.title=String(data['title']);this.pageTimings=new HARImporter.HARPageTimings(data['pageTimings']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARPageTimings=class extends HARImporter.HARBase{constructor(data){super(data);this.onContentLoad=HARImporter.HARBase._optionalNumber(data['onContentLoad']);this.onLoad=HARImporter.HARBase._optionalNumber(data['onLoad']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HAREntry=class extends HARImporter.HARBase{constructor(data){super(data);this.pageref=HARImporter.HARBase._optionalString(data['pageref']);this.startedDateTime=HARImporter.HARBase._safeDate(data['startedDateTime']);this.time=HARImporter.HARBase._safeNumber(data['time']);this.request=new HARImporter.HARRequest(data['request']);this.response=new HARImporter.HARResponse(data['response']);this.cache={};this.timings=new HARImporter.HARTimings(data['timings']);this.serverIPAddress=HARImporter.HARBase._optionalString(data['serverIPAddress']);this.connection=HARImporter.HARBase._optionalString(data['connection']);this.comment=HARImporter.HARBase._optionalString(data['comment']);this._fromCache=HARImporter.HARBase._optionalString(data['_fromCache']);this._initiator=this._importInitiator(data['_initiator']);this._priority=HARImporter.HARBase._optionalString(data['_priority']);this._resourceType=HARImporter.HARBase._optionalString(data['_resourceType']);this._webSocketMessages=this._importWebSocketMessages(data['_webSocketMessages']);}
_importInitiator(initiator){if(typeof initiator!=='object')
return;return new HARImporter.HARInitiator(initiator);}
_importWebSocketMessages(inputMessages){if(!Array.isArray(inputMessages))
return;const outputMessages=[];for(const message of inputMessages){if(typeof message!=='object')
return;outputMessages.push(new HARImporter.HARWebSocketMessage(message));}
return outputMessages;}};HARImporter.HARRequest=class extends HARImporter.HARBase{constructor(data){super(data);this.method=String(data['method']);this.url=String(data['url']);this.httpVersion=String(data['httpVersion']);this.cookies=Array.isArray(data['cookies'])?data['cookies'].map(cookie=>new HARImporter.HARCookie(cookie)):[];this.headers=Array.isArray(data['headers'])?data['headers'].map(header=>new HARImporter.HARHeader(header)):[];this.queryString=Array.isArray(data['queryString'])?data['queryString'].map(qs=>new HARImporter.HARQueryString(qs)):[];this.postData=data['postData']?new HARImporter.HARPostData(data['postData']):undefined;this.headersSize=HARImporter.HARBase._safeNumber(data['headersSize']);this.bodySize=HARImporter.HARBase._safeNumber(data['bodySize']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARResponse=class extends HARImporter.HARBase{constructor(data){super(data);this.status=HARImporter.HARBase._safeNumber(data['status']);this.statusText=String(data['statusText']);this.httpVersion=String(data['httpVersion']);this.cookies=Array.isArray(data['cookies'])?data['cookies'].map(cookie=>new HARImporter.HARCookie(cookie)):[];this.headers=Array.isArray(data['headers'])?data['headers'].map(header=>new HARImporter.HARHeader(header)):[];this.content=new HARImporter.HARContent(data['content']);this.redirectURL=String(data['redirectURL']);this.headersSize=HARImporter.HARBase._safeNumber(data['headersSize']);this.bodySize=HARImporter.HARBase._safeNumber(data['bodySize']);this.comment=HARImporter.HARBase._optionalString(data['comment']);this._transferSize=HARImporter.HARBase._optionalNumber(data['_transferSize']);this._error=HARImporter.HARBase._optionalString(data['_error']);}};HARImporter.HARCookie=class extends HARImporter.HARBase{constructor(data){super(data);this.name=String(data['name']);this.value=String(data['value']);this.path=HARImporter.HARBase._optionalString(data['path']);this.domain=HARImporter.HARBase._optionalString(data['domain']);this.expires=data['expires']?HARImporter.HARBase._safeDate(data['expires']):undefined;this.httpOnly=data['httpOnly']!==undefined?!!data['httpOnly']:undefined;this.secure=data['secure']!==undefined?!!data['secure']:undefined;this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARHeader=class extends HARImporter.HARBase{constructor(data){super(data);this.name=String(data['name']);this.value=String(data['value']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARQueryString=class extends HARImporter.HARBase{constructor(data){super(data);this.name=String(data['name']);this.value=String(data['value']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARPostData=class extends HARImporter.HARBase{constructor(data){super(data);this.mimeType=String(data['mimeType']);this.params=Array.isArray(data['params'])?data['params'].map(param=>new HARImporter.HARParam(param)):[];this.text=String(data['text']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARParam=class extends HARImporter.HARBase{constructor(data){super(data);this.name=String(data['name']);this.value=HARImporter.HARBase._optionalString(data['value']);this.fileName=HARImporter.HARBase._optionalString(data['fileName']);this.contentType=HARImporter.HARBase._optionalString(data['contentType']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARContent=class extends HARImporter.HARBase{constructor(data){super(data);this.size=HARImporter.HARBase._safeNumber(data['size']);this.compression=HARImporter.HARBase._optionalNumber(data['compression']);this.mimeType=String(data['mimeType']);this.text=HARImporter.HARBase._optionalString(data['text']);this.encoding=HARImporter.HARBase._optionalString(data['encoding']);this.comment=HARImporter.HARBase._optionalString(data['comment']);}};HARImporter.HARTimings=class extends HARImporter.HARBase{constructor(data){super(data);this.blocked=HARImporter.HARBase._optionalNumber(data['blocked']);this.dns=HARImporter.HARBase._optionalNumber(data['dns']);this.connect=HARImporter.HARBase._optionalNumber(data['connect']);this.send=HARImporter.HARBase._safeNumber(data['send']);this.wait=HARImporter.HARBase._safeNumber(data['wait']);this.receive=HARImporter.HARBase._safeNumber(data['receive']);this.ssl=HARImporter.HARBase._optionalNumber(data['ssl']);this.comment=HARImporter.HARBase._optionalString(data['comment']);this._blocked_queueing=HARImporter.HARBase._optionalNumber(data['_blocked_queueing']);this._blocked_proxy=HARImporter.HARBase._optionalNumber(data['_blocked_proxy']);}};HARImporter.HARInitiator=class extends HARImporter.HARBase{constructor(data){super(data);this.type=HARImporter.HARBase._optionalString(data['type']);this.url=HARImporter.HARBase._optionalString(data['url']);this.lineNumber=HARImporter.HARBase._optionalNumber(data['lineNumber']);}};HARImporter.HARWebSocketMessage=class extends HARImporter.HARBase{constructor(data){super(data);this.time=HARImporter.HARBase._optionalNumber(data['time']);this.opcode=HARImporter.HARBase._optionalNumber(data['opcode']);this.data=HARImporter.HARBase._optionalString(data['data']);this.type=HARImporter.HARBase._optionalString(data['type']);}};;HARImporter.Importer=class{static requestsFromHARLog(log){const pages=new Map();for(const page of log.pages)
pages.set(page.id,page);log.entries.sort((a,b)=>a.startedDateTime-b.startedDateTime);const pageLoads=new Map();const requests=[];for(const entry of log.entries){let pageLoad=pageLoads.get(entry.pageref);const documentURL=pageLoad?pageLoad.mainRequest.url():entry.request.url;let initiator=null;if(entry._initiator){initiator={type:entry._initiator.type,url:entry._initiator.url,lineNumber:entry._initiator.lineNumber};}
const request=new SDK.NetworkRequest('har-'+requests.length,entry.request.url,documentURL,'','',initiator);const page=pages.get(entry.pageref);if(!pageLoad&&page){pageLoad=HARImporter.Importer._buildPageLoad(page,request);pageLoads.set(entry.pageref,pageLoad);}
HARImporter.Importer._fillRequestFromHAREntry(request,entry,pageLoad);if(pageLoad)
pageLoad.bindRequest(request);requests.push(request);}
return requests;}
static _buildPageLoad(page,mainRequest){const pageLoad=new SDK.NetworkLog.PageLoad(mainRequest);pageLoad.startTime=page.startedDateTime;pageLoad.contentLoadTime=page.pageTimings.onContentLoad*1000;pageLoad.loadTime=page.pageTimings.onLoad*1000;return pageLoad;}
static _fillRequestFromHAREntry(request,entry,pageLoad){if(entry.request.postData)
request.setRequestFormData(true,entry.request.postData.text);else
request.setRequestFormData(false,null);request.connectionId=entry.connection||'';request.requestMethod=entry.request.method;request.setRequestHeaders(entry.request.headers);if(entry.response.content.mimeType&&entry.response.content.mimeType!=='x-unknown')
request.mimeType=entry.response.content.mimeType;request.responseHeaders=entry.response.headers;request.statusCode=entry.response.status;request.statusText=entry.response.statusText;let protocol=entry.response.httpVersion.toLowerCase();if(protocol==='http/2.0')
protocol='h2';request.protocol=protocol.replace(/^http\/2\.0?\+quic/,'http/2+quic');const issueTime=entry.startedDateTime.getTime()/1000;request.setIssueTime(issueTime,issueTime);const contentSize=entry.response.content.size>0?entry.response.content.size:0;const headersSize=entry.response.headersSize>0?entry.response.headersSize:0;const bodySize=entry.response.bodySize>0?entry.response.bodySize:0;request.resourceSize=contentSize||(headersSize+bodySize);let transferSize=entry.response.customAsNumber('transferSize');if(transferSize===undefined)
transferSize=entry.response.headersSize+entry.response.bodySize;request.setTransferSize(transferSize>=0?transferSize:0);const fromCache=entry.customAsString('fromCache');if(fromCache==='memory')
request.setFromMemoryCache();else if(fromCache==='disk')
request.setFromDiskCache();const contentData={error:null,content:null,encoded:entry.response.content.encoding==='base64'};if(entry.response.content.text!==undefined)
contentData.content=entry.response.content.text;request.setContentDataProvider(async()=>contentData);HARImporter.Importer._setupTiming(request,issueTime,entry.time,entry.timings);request.setRemoteAddress(entry.serverIPAddress||'',80);request.setResourceType(HARImporter.Importer._getResourceType(request,entry,pageLoad));const priority=entry.customAsString('priority');if(Protocol.Network.ResourcePriority.hasOwnProperty(priority))
request.setPriority((priority));const messages=entry.customAsArray('webSocketMessages');if(messages){for(const message of messages){if(message.time===undefined)
continue;if(!Object.values(SDK.NetworkRequest.WebSocketFrameType).includes(message.type))
continue;if(message.opcode===undefined)
continue;if(message.data===undefined)
continue;const mask=message.type===SDK.NetworkRequest.WebSocketFrameType.Send;request.addFrame({time:message.time,text:message.data,opCode:message.opcode,mask:mask,type:message.type});}}
request.finished=true;}
static _getResourceType(request,entry,pageLoad){const customResourceTypeName=entry.customAsString('resourceType');if(customResourceTypeName){const customResourceType=Common.ResourceType.fromName(customResourceTypeName);if(customResourceType)
return customResourceType;}
if(pageLoad&&pageLoad.mainRequest===request)
return Common.resourceTypes.Document;const resourceTypeFromMime=Common.ResourceType.fromMimeType(entry.response.content.mimeType);if(resourceTypeFromMime!==Common.resourceTypes.Other)
return resourceTypeFromMime;const resourceTypeFromUrl=Common.ResourceType.fromURL(entry.request.url);if(resourceTypeFromUrl)
return resourceTypeFromUrl;return Common.resourceTypes.Other;}
static _setupTiming(request,issueTime,entryTotalDuration,timings){function accumulateTime(timing){if(timing===undefined||timing<0)
return-1;lastEntry+=timing;return lastEntry;}
let lastEntry=timings.blocked>=0?timings.blocked:0;const proxy=timings.customAsNumber('blocked_proxy')||-1;const queueing=timings.customAsNumber('blocked_queueing')||-1;const ssl=timings.ssl>=0?timings.ssl:0;if(timings.connect>0)
timings.connect-=ssl;const timing={proxyStart:proxy>0?lastEntry-proxy:-1,proxyEnd:proxy>0?lastEntry:-1,requestTime:issueTime+(queueing>0?queueing:0)/1000,dnsStart:timings.dns>=0?lastEntry:-1,dnsEnd:accumulateTime(timings.dns),connectStart:timings.connect>=0?lastEntry:-1,connectEnd:accumulateTime(timings.connect)+ssl,sslStart:timings.ssl>=0?lastEntry:-1,sslEnd:accumulateTime(timings.ssl),workerStart:-1,workerReady:-1,sendStart:timings.send>=0?lastEntry:-1,sendEnd:accumulateTime(timings.send),pushStart:0,pushEnd:0,receiveHeadersEnd:accumulateTime(timings.wait)};accumulateTime(timings.receive);request.timing=timing;request.endTime=issueTime+Math.max(entryTotalDuration,lastEntry)/1000;}};;