(function(){var Desk,EventLogger;window.Desk||(window.Desk={});Desk=window.Desk;Desk.EventLogger=EventLogger=function(){function EventLogger(){this.site_id=$('meta[name="site_id"]').attr("content");this.customer_id=$('meta[name="customer_id"]').attr("content");this.env=$('meta[name="env"]').attr("content");this.server=$('meta[name="public_events_server"').attr("content")}EventLogger.prototype.site_id=null;EventLogger.prototype.log=function(event,params){var k,opts,v;if(this.server==null)return;opts=
{type:"POST",url:"//"+this.server+"/events",contentType:"application/json",data:{site:this.site_id,type:event,actor:this.customer_id}};for(k in params){v=params[k];opts.data[k]=v}opts.data=JSON.stringify(opts.data);return $.ajax(opts)};return EventLogger}();$(function(){var articleId,articleUrlRegex,logger,matches,_ref;logger=new EventLogger;articleUrlRegex=/\/customer.*?\/portal\/articles\/(\d+)\-/;if(matches=window.location.href.match(articleUrlRegex)){articleId=matches[1];logger.log("kb.article.view",
{article:articleId})}if((_ref=$("a","#modal .inner.articles div.main ul#search-results"))!=null)_ref.each(function(idx,link){var _ref1;if(link&&link.href&&(articleId=(_ref1=link.href.match(articleUrlRegex))!=null?_ref1[1]:void 0))return logger.log("kb.article.suggest",{article:articleId})});$("a","#modal .inner.articles div.main ul#search-results").on("click",function(event){if(matches=this.href.match(articleUrlRegex)){articleId=matches[1];if(articleId)return logger.log("kb.article.deflect",{article:articleId})}});
return $(document).ajaxSend(function(event,jqxhr,settings){var rating,_ref1,_ref2;if(rating=(_ref1=settings.url.match(/rate\?rating=(1|0)/))!=null?_ref1[1]:void 0){articleId=(_ref2=window.location.href.match(articleUrlRegex))!=null?_ref2[1]:void 0;return logger.log("kb.article.csat.rate",{rating:rating,article:articleId})}})})}).call(this);
