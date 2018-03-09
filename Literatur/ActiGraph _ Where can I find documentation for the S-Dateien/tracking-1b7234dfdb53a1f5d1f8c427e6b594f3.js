(function($){Desk=window.Desk||{};var trackableEventName="trackingEvent",trackableClickSelector="[data-tracking-action=click]";Desk.Tracking={Settings:{},Locations:{},Event:function(data){$.extend(this,data,{timestamp:new Date,location:Desk.Tracking.getLocation(data),attributes:Desk.Tracking.additionalAttrs(data),groups:Desk.Tracking.groups(data),custom:Desk.Tracking.customAttrs(data),junkAccount:Desk.Tracking.junkAccount(data)})},plugin:function(callback){if(typeof callback!=="function")return;$(document).on(trackableEventName,
function(event,trackingEvent){$.proxy(callback,Desk.Tracking,trackingEvent)()})},watch:function(eventType,selector){$(document).on(eventType,selector,Desk.Tracking.handle)},notify:function(eventData){$.each(eventData,function(key,value){var property=key.replace(/(-|data|tracking)/g,"").toLowerCase();delete eventData[key];eventData[property]=value});var trackableEvent=new Desk.Tracking.Event(eventData);setTimeout(function(){$(document).trigger(trackableEventName,trackableEvent)})},handle:function(e){e.stopPropagation();
return false},getLocation:function(data){if(typeof data["model"]!="undefined"&&data["model"]!="")return data["model"];var key=data["route"].toLowerCase();key=Desk.Tracking.parseLocation(key);var loc=Desk.Tracking.Locations[key];if(loc)return Desk.Tracking.Locations[key];else{key=key.split("/");key=key[1].charAt(0).toUpperCase()+key[1].slice(1);return key}},parseLocation:function(path){var module=path.split("/");for(var i=0;i<module.length;i++)if(!isNaN(parseFloat(module[i]))&&isFinite(module[i]))module[i]=
":id";path=module.join("/");return path},submit:function(url,data){return false},sleep:function(milliSeconds){var startTime=(new Date).getTime();while((new Date).getTime()<startTime+milliSeconds);},junkAccount:function(eventData){var domain=document.location.hostname;if(/^zzz-/.test(domain))return true;return false},additionalAttrs:function(eventData){var addAttrs=typeof eventData.additional==="object"?eventData.additional:JSON.parse(eventData.additional.toString());delete eventData["additional"];
return addAttrs},customAttrs:function(eventData){if(eventData.customattrs===null||typeof eventData.customattrs=="undefined")return false;var addAttrs=typeof eventData.customattrs==="object"?eventData.customattrs:JSON.parse(eventData.customattrs.toString());return addAttrs},groups:function(eventData){var segGroups=["All"];eventData.siteid%2==0?segGroups.push("Even"):segGroups.push("Odd");return segGroups},Base64:{_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output=
"";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Desk.Tracking.Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=(chr1&3)<<4|chr2>>4;enc3=(chr2&15)<<2|chr3>>6;enc4=chr3&63;if(isNaN(chr2))enc3=enc4=64;else if(isNaN(chr3))enc4=64;output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";
var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64)output=output+String.fromCharCode(chr2);if(enc4!=64)output=output+String.fromCharCode(chr3)}output=
Desk.Tracking.Base64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128)utftext+=String.fromCharCode(c);else if(c>127&&c<2048){utftext+=String.fromCharCode(c>>6|192);utftext+=String.fromCharCode(c&63|128)}else{utftext+=String.fromCharCode(c>>12|224);utftext+=String.fromCharCode(c>>6&63|128);utftext+=String.fromCharCode(c&63|128)}}return utftext},_utf8_decode:function(utftext){var string=
"";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if(c>191&&c<224){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode((c&31)<<6|c2&63);i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode((c&15)<<12|(c2&63)<<6|c3&63);i+=3}}return string}}};Desk.Tracking.watch("click",trackableClickSelector)})(jQuery);
(function($){Desk.Tracking.Locations={"/site-cancelled":"Billing","/welcome":"On-boarding","/agent":"Agent Desktop","/admin/dashboard":"Admin","/reporting/dashboard":"Business Insights","/admin/channels/email/mailboxes/:id/step_three":"Admin","/admin/settings/mail-servers/new":"Admin","/admin/settings/mail-servers":"Admin","/admin/channels/twitter/accounts/confirm":"Admin","/admin/channels/twitter/accounts":"Admin","/admin/channels/facebook/pages/confirm":"Admin","/admin/channels/facebook/pages":"Admin",
"/admin/team/users/new":"Admin","/admin/team/users/:id/edit":"Admin","/agent/case/:id":"Agent Desktop","/agent/tickets":"Agent Desktop","/agent/tickets/:id/edit":"Agent Desktop","/agent/ticket_filters/bulk_menu_change":"Agent Desktop","/admin/team/users":"Admin","/admin/billing/subscription":"Billing"}})(jQuery);
(function($){Desk.Tracking.plugin(function(eventData){var self=this;var data=$.extend(true,{},this.Settings.google_analytics,{"ec":eventData.location,"ea":eventData.name,"el":eventData.attributes.Status,"cid":eventData.siteid,"t":"event","dh":window.location.host});this.submit("https://www.google-analytics.com/collect?"+$.param(data))})})(jQuery);
(function($){Desk.Tracking.plugin(function(eventData){var self=this;var data=$.extend({},this.Settings.totango,{sdr_a:eventData.name,sdr_o:eventData.siteid,"sdr_o.Status":eventData.attributes.Status,"sdr_o.Licenses":eventData.attributes.Licenses,"sdr_o.groups":eventData.groups.join(),sdr_u:eventData.userid,sdr_m:eventData.location});if(eventData.custom!==false){var attrsMap={};$.each(eventData.custom,function(key,val){var tempKey="sdr_o."+key;attrsMap[tempKey]=val});$.extend(data,attrsMap);delete eventData.custom}data["sdr_o.junkAccount"]=
eventData.junkAccount;this.submit("https://sdr.totango.com/pixel.gif/?",data)})})(jQuery);
