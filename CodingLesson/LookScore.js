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

function h(d,c){for(var a=0;a<c;a++)d*=10;d=Math.round(d)+"";var e="";for(a in d)e+=d[a],a==d.length-c-1&&(e+=".");return e}function k(d,c){var a=document.createElement("tr"),e;for(e in c){var b=document.createElement(d);b.textContent=c[e];a.appendChild(b)}return a}
function l(){var d=m,c=n,a=Number(q),e=d.getElementsByTagName("tr"),b=c.textContent,f=-1;if(-1!=b.search("\u25b3")||-1!=b.search("\u25b2"))f=1;return function(){var b=c.parentElement.getElementsByTagName("th"),g;for(g in b)b[g]instanceof Node&&(b[g].textContent=b[g].textContent.replace("\u25b2","\u25b3"),b[g].textContent=b[g].textContent.replace("\u25bc","\u25bd"));c.textContent=c.textContent.replace("\u25b3","\u25b2");c.textContent=c.textContent.replace("\u25bd","\u25bc");b=[];for(g in e)e[g]instanceof
Node&&b.push(e[g]);b.sort(function(b,c){return(Number(b.getElementsByTagName("td")[a].textContent)-Number(c.getElementsByTagName("td")[a].textContent))*f});d.childNodes=[];for(g in b)d.appendChild(b[g])}}function r(d,c,a,e,b){this.name=d.trim();this.c=c;this.o=a;this.title=e.trim();this.time=b.trim()}
function t(){var d=u[v].getAttribute("title"),c=u[v];if(null==d)return new r("","noScore",0,"","");var d="thisname:"+d.substr(0),a=["thisname:","\u5f97\u5206\uff1a","\u8a55\u8a9e\uff1a","\u6642\u9593\uff1a"],e=[],b;for(b in a){var f=a[b],p=f.length,f=d.search(f);e.push({start:f,end:f+p})}a=[];for(b in e)if(p=e[b].end,f=d.length,-1==e[b].start)a.push({c:0,text:""});else{for(var g in e){var w=e[g].start;w>p&&w<f&&(f=w)}a.push({c:1,text:d.slice(p,f)})}return 1==a[1].c?new r(a[0].text,"scored",Number(a[1].text),
a[2].text,a[3].text):-1!=c.getElementsByTagName("img")[0].getAttribute("src").search("ok")?new r(a[0].text,"done",0,"",""):new r(a[0].text,"drop",0,"","")}
function x(){var d=Number(u[0].textContent);this.name=u[1].textContent.trim();this.j=d;this.a=[];this.g=this.b=this.h=0;this.f=[];this.i=0;this.l=function(){if(!(0>=this.a.length)){var c=0,a=0,d=0;this.f=[];for(var b in this.a){if("scored"==this.a[b].c){c+=Number(this.a[b].o);a++;var f=this.a[b].title;"(\u7121)"!=f&&this.f.push({name:this.a[b].name,text:f})}"drop"!=this.a[b].c&&d++}this.h=c;this.b=0!=a?c/a:0;this.i=d/this.a.length}};this.toString=function(){return this.j+"\t"+this.name+"\t"+this.h+
"\t"+h(this.b,0)+"\t"+this.g};this.m=function(){var c="",a;for(a in this.f)c+=this.f[a].name+"\t"+this.f[a].text+"\n";return c}}function y(){var d=z,c=[],a;for(a in d)c.push({id:a,data:d[a]});c.sort(function(a,b){return-a.data.b+b.data.b});for(a in c)d[c[a].id].g=Number(a)+1}var z;var A=[],B=document.getElementsByTagName("tbody")[1];
if(void 0==B)console.log("%c \u767c\u751f\u932f\u8aa4! \u72c0\u6cc1\u5982\u4e0b\uff1a\n%c   \u60a8\u5fc5\u9808\u5148\u9078\u64c7\u4e00\u500b\u73ed\u7d1a ","color:#ff3100","color:#000000"),z=null;else{var C=B.getElementsByTagName("tr"),D;for(D in C){var E=C[D];if(E instanceof Node){for(var u=E.getElementsByTagName("td"),F=new x,v=2;v<u.length;v++)F.a.push(t());F.l();A.push(F)}}z=A}
if(null!=z){y();var G=document.getElementsByTagName("body")[0];G.innerHTML+="<script src='https://code.jquery.com/jquery-1.12.0.min.js'>\x3c/script><script src='https://code.jquery.com/jquery-migrate-1.2.1.min.js'>\x3c/script><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' ><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css'><script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'>\x3c/script>";var H=
document.createElement("div");H.setAttribute("class","container");var I=document.createElement("div");I.setAttribute("class","col-md-12 panel-body");var J=z,K=[],L;for(L in J){var M=J[L];K.push([M.j,M.name,M.g,M.h,h(M.b,2),h(100*M.i,2)])}var N=document.createElement("table");N.setAttribute("class","table table-bordered table-hover");N.setAttribute("style","background:#ffffff");var O=document.createElement("thead"),m=document.createElement("tbody");O.appendChild(k("th","\u5ea7\u865f \u25b3;\u59d3\u540d \u25b3;\u540d\u6b21 \u25b3;\u7e3d\u5206 \u25bd;\u5e73\u5747 \u25bd;\u5b8c\u6210\u7387 (%) \u25bd".split(";")));
for(var q in K){var P=k("td",K[q]);P.setAttribute("title",J[q].m());m.appendChild(P)}var Q=O.getElementsByTagName("th");for(q in Q){var n=Q[q];n instanceof Node&&n.addEventListener("click",l())}N.appendChild(O);N.appendChild(m);I.appendChild(N);H.appendChild(I);G.appendChild(H);console.log("%c \u8a08\u7b97\u5b8c\u6210! \u7d50\u679c\u8acb\u898b\u7db2\u9801\u4e0b\u65b9\u8868\u683c\n%c  \u9ede\u64ca\u8868\u683c\u6a19\u7c64\u53ef\u4ee5\u9078\u64c7\u6392\u5e8f\u76ee\u6a19 ","color:#0080ff","color:#000000")};