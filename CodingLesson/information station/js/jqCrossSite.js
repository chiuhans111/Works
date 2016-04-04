jQuery.ajax=function(d){function e(a){return!f.test(a)&&/:\/\//.test(a)}var c=location.protocol,f=RegExp(c+"//"+location.hostname),g="http"+(/^https/.test(c)?"s":"")+"://query.yahooapis.com/v1/public/yql?callback=?";return function(a){var b=a.url;/get/i.test(a.type)&&!/json/i.test(a.dataType)&&e(b)&&(a.url=g,a.dataType="json",a.data={q:'select * from html where url="{URL}" and xpath="*"'.replace("{URL}",b+(a.data?(/\?/.test(b)?"&":"?")+jQuery.param(a.data):"")),format:"xml"},!a.success&&a.complete&&
(a.success=a.complete,delete a.complete),a.success=function(a){return function(b){a&&a.call(this,{responseText:b.results[0].replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi,"")},"success")}}(a.success));return d.apply(this,arguments)}}(jQuery.ajax);


var getUrl = function(URL, SUCCESS) {
    $.ajax({
        url: URL,
        type: 'GET',
        success: function(res) {
            var text = res.responseText;
            // then you can manipulate your text as you wish
            SUCCESS(text);
        }
    });
}