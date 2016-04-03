var sptool = {};
sptool.deBug = true;
sptool.doc = {};
sptool.auto = {};
sptool.isLoaded = false;
{
  {
    var consoleLog = function(){};
    if(sptool.deBug)
      consoleLog = function(title, content, hlColor, foColor){
        if(typeof content == "string"){
          console.log("%c| "+title+" %c "+content,
                    "color:"+hlColor+";",
                    "color:"+foColor+";");
        }

        else{
          console.log("%c| "+title+" %c\n "+content+"：",
                    "color:"+hlColor+";",
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
      
      if("undefined" === typeof Id) Id = link;
      if("undefined" === typeof requireId) requireId = link;
      att[targetAtt] = link;
      var importCode = sptool.doc.create(tagName,att);
      importCode.onload = function(){
        sptool.doc.importStacker[Id]=null
        LOG.SUCC("匯入完成",Id);
      };
      
      var me = function(){
        LOG.INFO("正在匯入",Id);
        sptool.doc.appendToHead(importCode);
      }
      if(sptool.doc.importStacker[requireId]==null) me();
      else {
        var old = sptool.doc.importStacker[requireId].onload;
          sptool.doc.importStacker[requireId].onload = function(){
          old();
          me();
        }
      }
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
  sptool.regAfterLoaded(function(){
    sptool.doc.head.appendChild(sptool.doc.create("meta",{charset:"UTF-8"}));
  });
  sptool.auto.all();
  var title = sptool.doc.create("title")
  title.textContent = "乙班09邱柏翰"+title;
  sptool.doc.appendToHead(title);
}

sptool.auto.jquery = function(){
  sptool.doc.import.js("https://code.jquery.com/jquery-1.12.0.min.js",
                       "jquery");
  sptool.doc.import.js("https://code.jquery.com/jquery-migrate-1.2.1.min.js",
                       "jquery migrate","jquery");
}
sptool.auto.bootstrap = function(){
  sptool.doc.appendToHead(sptool.doc.create("meta",{
    name:"viewport", content:"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
  }));
  sptool.doc.import.css("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
                        "bootstrap CSS");
  sptool.doc.import.css("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css",
                        "bootstrap theme");
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
  LOG.WARR("製作聲明 0304207","\nsuperTool is made by HANS")
}