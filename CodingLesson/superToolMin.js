var sptool={deBug:!0,doc:{}};sptool.doc.auto={};sptool.auto={};sptool.isLoaded=!1;sptool.helpTilEnd=!1;var consoleLog=function(){};sptool.deBug&&(consoleLog=function(a,c,f,b){"string"==typeof c?console.log("%c| "+a+" %c "+c,"color:"+f+";","color:"+b+";"):(console.log("%c| "+a+" %c\n "+c+"\uff1a","color:"+f+";","color:"+b+";"),console.log(c))});var colorLogFun=function(a,c){return function(f,b){consoleLog(f,b,a,c)}};
LOG={INFO:colorLogFun("#00b1ff","#000"),ERRO:colorLogFun("#ff2700","#000"),WARR:colorLogFun("#ff8900","#000"),SUCC:colorLogFun("#47bf12","#000")};sptool.afterLoaded=[];sptool.regAfterLoaded=function(a){sptool.isLoaded?a():sptool.afterLoaded.push(a)};
sptool.setup=function(a){sptool.doc.create=function(a,b,c){a=document.createElement(a);for(var e in b)a.setAttribute(e,b[e]);"undefined"!=typeof c&&(a.innerHTML=c);return a};sptool.doc.appendToHead=function(a){sptool.regAfterLoaded(function(){sptool.doc.head.appendChild(a)})};sptool.doc.importStacker={};var c=function(a,b,c){return function(e,d,g){"undefined"===typeof d&&(d=e);"undefined"===typeof g&&(g=e);b[c]=e;var l=sptool.doc.create(a,b);l.onload=function(){sptool.doc.importStacker[d]=null;var a=
0,b;for(b in sptool.doc.importStacker)null!=sptool.doc.importStacker[b]&&a++;LOG.SUCC("\u532f\u5165\u5b8c\u6210 \u5269\u9918"+a,d);0==a&&sptool.cover.hide()};var h=function(){LOG.INFO("\u6b63\u5728\u532f\u5165",d);sptool.doc.appendToHead(l)};if(null==sptool.doc.importStacker[g])h();else{var m=sptool.doc.importStacker[g].onload;sptool.doc.importStacker[g].onload=function(){m();h()}}sptool.doc.importStacker[d]=l}};sptool.doc["import"]={css:c("link",{rel:"stylesheet"},"href"),js:c("script",{},"src")};
document.addEventListener("DOMContentLoaded",function(){sptool.loaded(a)})};sptool.auto.all=function(a){var c=[sptool.auto.jquery,sptool.auto.bootstrap];"function"==typeof a&&c.push(a);sptool.setup(c)};sptool.auto.forClass=function(a){sptool.helpTilEnd=!0;sptool.auto.all();var c=sptool.doc.create("title");c.textContent="\u4e59\u73ed09\u90b1\u67cf\u7ff0"+a;sptool.doc.appendToHead(c)};
sptool.auto.jquery=function(){sptool.doc["import"].js("https://code.jquery.com/jquery-1.12.0.min.js","jquery");sptool.doc["import"].js("https://code.jquery.com/jquery-migrate-1.2.1.min.js","jquery migrate","jquery")};
sptool.auto.bootstrap=function(){sptool.doc.appendToHead(sptool.doc.create("meta",{name:"viewport",content:"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}));sptool.doc["import"].css("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css","bootstrap CSS");sptool.doc["import"].css("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css","bootstrap theme");sptool.doc["import"].js("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js",
"bootstrap","jquery")};
sptool.doc.setOnBootstrapMode=function(){var a=sptool.doc.body.innerHTML;sptool.doc.body.innerHTML="";var c=sptool.doc.create("div",{"class":"container"}),f=sptool.doc.create("div",{"class":"row"}),b=sptool.doc.create("div",{"class":"row"}),k=sptool.doc.create("div",{"class":"col-md-12"}),e=sptool.doc.create("div",{"class":"col-md-12"});f.appendChild(k);b.appendChild(e);c.appendChild(f);c.appendChild(b);f.innerHTML=a;b.innerHTML="<hr><br>super tool \u81ea\u52d5\u5957\u7248 made by cbs09";sptool.doc.body.appendChild(c);
var a=c.getElementsByTagName("table"),d;for(d in a)a[d]instanceof Node&&a[d].setAttribute("class","table table-hover")};sptool.doc.auto.sortTable=function(a,c,f){a=a.getElementsByTagName("tbody")[0];var b=a.getElementsByTagName("tr"),k=[],e;for(e in b)b[e]instanceof Node&&k.push(b[e]);k.sort(function(a,b){var e=a.getElementsByTagName("td")[c],h=b.getElementsByTagName("td")[c];return f(e,h)});a.innerHtml="";for(e in k)a.appendChild(k[e])};
sptool.doc.auto.table=function(a,c,f,b){"undefined"==typeof b&&(b={n:{up:"\u25b3",down:"\u25bd"},s:{up:"\u25b2",down:"\u25bc"}});var k=sptool.doc.create("table",{"class":"table table-hover"}),e=sptool.doc.create("thead"),d=sptool.doc.create("tbody"),g=sptool.doc.create("tr"),l=function(a,c){return function(){var f=0,d;for(d in b){for(var h in b[d])if(-1!=a.textContent.search(b[d][h])){f="up"==h?1:-1;"s"==d&&(f*=-1);break}if(0!=f)break}d=e.getElementsByTagName("th");for(var g in d)d[g]instanceof Node&&
(d[g].textContent=d[g].textContent.replace(b.s.up,b.n.up),d[g].textContent=d[g].textContent.replace(b.s.down,b.n.down));1==f?(LOG.INFO("dir=",a.textContent),a.textContent=a.textContent.replace(b.n.down,b.s.up),a.textContent=a.textContent.replace(b.n.up,b.s.up)):(a.textContent=a.textContent.replace(b.n.up,b.s.down),a.textContent=a.textContent.replace(b.n.down,b.s.down));sptool.doc.auto.sortTable(k,c,function(a,b){var c=a.textContent,d=b.textContent;if(isNaN(c)||isNaN(d)){var d=c=0,e;for(e in a.textContent)c+=
a.textContent.charCodeAt(e)*e;for(e in a.textContent)d+=b.textContent.charCodeAt(e)*e}return(c-d)*f})}},h;for(h in a){var m=sptool.doc.create("th");m.innerHTML=a[h];var n=0,p;for(p in b){for(var q in b[p])if(-1!=a[h].search(b[p][q])){n="up"==q?1:-1;"s"==p&&(n*=-1);break}if(0!=n)break}0!=n&&(m.onclick=l(m,h));g.appendChild(m)}e.appendChild(g);for(h in c){a=sptool.doc.create("tr");for(var r in c[h])g=c[h][r],l=sptool.doc.create("td"),l.innerHTML=g,"undefined"!=typeof f&&f(g,l),a.appendChild(l);d.appendChild(a)}k.appendChild(e);
k.appendChild(d);return k};
sptool.loaded=function(a){if(sptool.isLoaded)return!0;sptool.doc.html=document.getElementsByTagName("html")[0];sptool.doc.head=document.getElementsByTagName("head")[0];sptool.doc.body=document.getElementsByTagName("body")[0];var c=sptool.doc.body.getAttribute("style");sptool.doc.body.setAttribute("style"," font-family: \u5fae\u8edf\u6b63\u9ed1\u9ad4; "+c);if(sptool.helpTilEnd){var c=document.getElementsByClassName("container"),f=document.getElementsByClassName("container-fluid");0>=c.length&&0>=f.length&&
(LOG.ERRO("\u672a\u5957\u7528 bootstrap container","\n\u7cfb\u7d71\u5c07\u81ea\u52d5\u5c07\u5167\u6587\u5957\u7528\u7248\u578b"),sptool.doc.setOnBootstrapMode())}for(var b in a)a[b]();for(b in sptool.afterLoaded)sptool.afterLoaded[b]();sptool.isLoaded=!0;LOG.WARR("\u88fd\u4f5c\u8072\u660e","\n superTool is made by cbs09");sptool.cover.setup()};sptool.cover={};
sptool.cover.setup=function(){sptool.cover.object=sptool.doc.create("div",{style:"width: 100%; height: 100%;position: absolute; top: 0px; left:0px;background-color: rgb(255,255,255); zIndex: 9999;"});sptool.cover.opacity=255;sptool.doc.body.appendChild(sptool.cover.object)};sptool.cover.turnoff=function(){sptool.cover.opacity-=8;sptool.cover.object.style.backgroundColor="rgba(255,255,255,"+sptool.cover.opacity/255+")";return 0>=sptool.cover.opacity};
sptool.cover.hide=function(){sptool.cover.interval=setInterval(function(){sptool.cover.turnoff()&&(sptool.doc.body.removeChild(sptool.cover.object),clearInterval(sptool.cover.interval))},10)};