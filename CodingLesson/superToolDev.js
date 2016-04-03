var sptool = {};
sptool.doc = {};
sptool.auto = {};
sptool.isLoaded = false;
{
  {
    var consoleLog = function(title, content, hlColor, foColor){
      if(typeof content == "string"){
        console.log("%c| "+title+" %c\n"+content,
                  "color:"+hlColor+"; font-size:14px;",
                  "color:"+foColor+";");
      }

      else{
        console.log("%c| "+title+" %c\n "+content+"：",
                  "color:"+hlColor+"; font-size:14px;",
                  "color:"+foColor+";");
        console.log(content);
      }
    }// 發送客製化log訊息
    var colorLogFun = function(color1, color2){ 
    return function(title, content){
      consoleLog(title, content, color1, color2);
    };
  }// 產生一個function用於發送客製化log訊息
  }//後台
  LOG = {
    INFO: colorLogFun("#00b1ff", "#000"),
    ERRO: colorLogFun("#ff2700", "#000"),
    WARR: colorLogFun("#ff8900", "#000"),
    SUCC: colorLogFun("#47bf12", "#000"),
  }// 客製化log訊息
}//console tool

sptool.afterLoaded = [];
sptool.regAfterLoaded = function(work){
  if(sptool.isLoaded){
    work();
  }else sptool.afterLoaded.push(work);
}
sptool.setup = function(worksToDo){
  sptool.doc.create = function(tagName, att){
    var node = document.createElement(tagName);
    for(var attName in att)
      node.setAttribute(attName,att[attName]);
    return node;
  }
  sptool.doc.appendToHead = function(item){
    sptool.regAfterLoaded(function(){
      sptool.doc.head.appendChild(item);
    });
  }
  sptool.doc.importStacker = {};
  var importFun = function(tagName, att, targetAtt){
    return function(link, Id, requireId){
      if("undefined" == typeof id) id = link;
      if("undefined" == typeof requireId) requireId = link;
      att[targetAtt] = link;
      var importCode = sptool.doc.create(tagName,att);
      importCode.onload = function(){
        sptool.doc.importStacker[Id]=null
        LOG.SUCC("匯入完成","預載已告一段落");
      };
      var me = function(){
        LOG.INFO("正在匯入",link);
        sptool.doc.appendToHead(importCode);
      }
      if(sptool.doc.importStacker[requireId]==null) me();
      else sptool.doc.importStacker[requireId].onload = me;
      sptool.doc.importStacker[Id]=importCode;
    }
  }
  
  sptool.doc.import = {
    css: importFun("link",{rel:"stylesheet"},"href"),
    js: importFun("script",{},"src")
  }
  //this must be last line
  document.addEventListener("DOMContentLoaded",function(){
    sptool.loaded(worksToDo);
  });
}
sptool.auto.all = function(){
  sptool.setup([sptool.auto.jquery,sptool.auto.bootstrap]);
}
sptool.auto.forClass = function(title){
  sptool.doc.appendToHead(sptool.doc.create("meta",{charset:"UTF-8"}));
  sptool.auto.all();
  var title = sptool.doc.create("title")
  title.textContent = "乙班09邱柏翰"+title;
  sptool.doc.appendToHead(title);
}

sptool.auto.jquery = function(){
  sptool.doc.import.js("https://code.jquery.com/jquery-1.12.0.min.js",
                       "jquery");
  sptool.doc.import.js("https://code.jquery.com/jquery-migrate-1.2.1.min.js",
                       "jqueryMin","jquery");
}
sptool.auto.bootstrap = function(){
  sptool.doc.appendToHead(sptool.doc.create("meta",{
    name:"viewport", content:"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
  }));
  sptool.doc.import.css("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css");
  sptool.doc.import.css("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css");
  sptool.doc.import.js("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js",
                       "bootstrap","jquery");
}

sptool.loaded = function(worksToDo){
  if(sptool.isLoaded) return true;
  sptool.doc.html = document.getElementsByTagName("html")[0];
  sptool.doc.head = document.getElementsByTagName("head")[0];
  sptool.doc.body = document.getElementsByTagName("body")[0];
  //this must be last line
  for(var i in worksToDo) worksToDo[i]();
  for(var i in sptool.afterLoaded) sptool.afterLoaded[i]();
  sptool.isLoaded = true;
}