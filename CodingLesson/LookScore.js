/* 

》臺北市立大安高工資訊科程式設計實習課程之作業展示成績統計工具
》請複製並貼上以下程式碼於作業展示網頁之CONSOLE (於瀏覽器中使用 F12 開啟)
┌───────────────────────────────────────────────────────────────────────────────────┐
│                                COPY THIS AND PASTE                                │
├───────────────────────────────────────────────────────────────────────────────────┤
 document.body.appendChild(n=document.createElement("script")),n.setAttribute("src",
 "https://rawgit.com/chiuhans111/Works/master/CodingLesson/LookScore.js");
└───────────────────────────────────────────────────────────────────────────────────┘

》以下程式碼請勿複製、改做、或嘗試破解，請乖乖使用上方指令，謝謝。

┌──────────────────┐
│ -- CREATED BY -- │
├──────────────────┤
  HANS  2016/04/02
└──────────────────┘

*/

function f(c,b){for(var a=0;a<b;a++)c*=10;c=Math.round(c);for(a=0;a<b;a++)c/=10;return c}function g(c,b){var a=document.createElement("tr"),e;for(e in b){var d=document.createElement(c);d.textContent=b[e];a.appendChild(d)}return a}
function h(){var c=k,b=Number(m);return function(){var a=c.getElementsByTagName("tr"),e=[],d;for(d in a)a[d]instanceof Node&&e.push(a[d]);e.sort(function(a,c){return Number(a.getElementsByTagName("td")[b].textContent)-Number(c.getElementsByTagName("td")[b].textContent)});c.childNodes=[];for(d in e)c.appendChild(e[d])}}function n(c,b,a,e,d){this.name=c.trim();this.f=b;this.m=a;this.title=e.trim();this.time=d.trim()}
function p(){var c=q[t].getAttribute("title");if(null==c)return new n("","noScore",0,"","");var c="thisname:"+c.substr(0),b=["thisname:","\u5f97\u5206\uff1a","\u8a55\u8a9e\uff1a","\u6642\u9593\uff1a"],a=[],e;for(e in b){var d=b[e],l=d.length,d=c.search(d);a.push({start:d,end:d+l})}b=[];for(e in a)if(l=a[e].end,d=c.length,-1==a[e].start)b.push({f:0,text:""});else{for(var M in a){var r=a[M].start;r>l&&r<d&&(d=r)}b.push({f:1,text:c.slice(l,d)})}return 1==b[1].f?new n(b[0].text,"scored",Number(b[1].text),
b[2].text,b[3].text):new n(b[0].text,"noScore",0,"","")}
function u(){var c=Number(q[0].textContent);this.name=q[1].textContent.trim();this.i=c;this.a=[];this.g=this.b=this.h=0;this.c=[];this.j=function(){if(!(0>=this.a.length)){var b=0,a=0;this.c=[];for(var c in this.a)if("scored"==this.a[c].f){b+=Number(this.a[c].m);a++;var d=this.a[c].title;"(\u7121)"!=d&&this.c.push({name:this.a[c].name,text:d})}this.h=b;this.b=0!=a?b/a:0}};this.toString=function(){return this.i+"\t"+this.name+"\t"+this.h+"\t"+f(this.b,0)+"\t"+this.g};this.l=function(){var b="",a;for(a in this.c)b+=
this.c[a].name+"\t"+this.c[a].text+"\n";return b}}function v(){var c=w,b=[],a;for(a in c)b.push({id:a,data:c[a]});b.sort(function(a,b){return-a.data.b+b.data.b});for(a in b)c[b[a].id].g=Number(a)+1}var w;var x=[],y=document.getElementsByTagName("tbody")[1];
if(void 0==y)console.log("%c \u767c\u751f\u932f\u8aa4! \u72c0\u6cc1\u5982\u4e0b\uff1a\n%c   \u60a8\u5fc5\u9808\u5148\u9078\u64c7\u4e00\u500b\u73ed\u7d1a ","color:#ff3100","color:#000000"),w=null;else{var z=y.getElementsByTagName("tr"),A;for(A in z){var B=z[A];if(B instanceof Node){for(var q=B.getElementsByTagName("td"),C=new u,t=2;t<q.length;t++)C.a.push(p());C.j();x.push(C)}}w=x}
if(null!=w){v();var D=document.getElementsByTagName("body")[0];D.innerHTML+="<script src='https://code.jquery.com/jquery-1.12.0.min.js'>\x3c/script><script src='https://code.jquery.com/jquery-migrate-1.2.1.min.js'>\x3c/script><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' ><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css'><script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'>\x3c/script>";var E=
document.createElement("div");E.setAttribute("class","container");var F=document.createElement("div");F.setAttribute("class","col-md-12 panel-body");var G=w,H=[],I;for(I in G){var J=G[I];H.push([J.i,J.name,J.g,J.h,f(J.b,2)])}var K=document.createElement("table");K.setAttribute("class","table table-bordered table-hover");K.setAttribute("style","background:#ffffff");var L=document.createElement("thead"),k=document.createElement("tbody");L.appendChild(g("th",["\u5ea7\u865f","\u59d3\u540d","\u540d\u6b21",
"\u7e3d\u5206","\u5e73\u5747"]));for(var m in H){var N=g("td",H[m]);N.setAttribute("title",G[m].l());k.appendChild(N)}var O=L.getElementsByTagName("th");for(m in O){var P=O[m];P instanceof Node&&P.addEventListener("click",h())}K.appendChild(L);K.appendChild(k);F.appendChild(K);E.appendChild(F);D.appendChild(E);console.log("%c \u8a08\u7b97\u5b8c\u6210! \u7d50\u679c\u8acb\u898b\u7db2\u9801\u4e0b\u65b9\u8868\u683c\n%c  \u9ede\u64ca\u8868\u683c\u6a19\u7c64\u53ef\u4ee5\u9078\u64c7\u6392\u5e8f\u76ee\u6a19 ",
"color:#0080ff","color:#000000")};