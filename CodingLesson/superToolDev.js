/*
<head>
  <meta charset="UTF-8">
  <script src="https://rawgit.com/chiuhans111/Works/master/CodingLesson/superToolDev.js"></script>
  <script>
    sptool.auto.forClass("X-X");
  </script>
</head>
*/

var sptool = {};
sptool.deBug = true;
sptool.doc = {};
sptool.doc.auto = {};
sptool.auto = {};
sptool.isLoaded = false;
sptool.helpTilEnd = false; {
    {
        var consoleLog = function() {};
        if (sptool.deBug)
            consoleLog = function(title, content, hlColor, foColor) {
                if (typeof content == "string") {
                    console.log("%c| " + title + " %c " + content, "color:" + hlColor + ";", "color:" + foColor + ";");
                } else {
                    console.log("%c| " + title + " %c\n " + content + "：", "color:" + hlColor + ";", "color:" + foColor + ";");
                    console.log(content);
                }
            } // 發送客製化log訊息
        var colorLogFun = function(color1, color2) {
                return function(title, content) {
                    consoleLog(title, content, color1, color2);
                };
            } // 產生一個function用於發送客製化log訊息
    } //後台
    LOG = {
            INFO: colorLogFun("#00b1ff", "#000"),
            ERRO: colorLogFun("#ff2700", "#000"),
            WARR: colorLogFun("#ff8900", "#000"),
            SUCC: colorLogFun("#47bf12", "#000"),
        } // 客製化log訊息
} //console tool

sptool.afterLoaded = [];
sptool.regAfterLoaded = function(work) {
    if (sptool.isLoaded) {
        work();
    } else sptool.afterLoaded.push(work);
}
sptool.setup = function(worksToDo) {
    sptool.doc.create = function(tagName, att, content) {
        var node = document.createElement(tagName);
        for (var attName in att)
            node.setAttribute(attName, att[attName]);
        if ("undefined" != typeof content) node.innerHTML = content;
        return node;
    }
    sptool.doc.appendToHead = function(item) {
        sptool.regAfterLoaded(function() {
            sptool.doc.head.appendChild(item);
        });
    }
    sptool.doc.importStacker = {};
    var importFun = function(tagName, att, targetAtt) {
        return function(link, Id, requireId) {

            if ("undefined" === typeof Id) Id = link;
            if ("undefined" === typeof requireId) requireId = link;
            att[targetAtt] = link;
            var importCode = sptool.doc.create(tagName, att);
            importCode.onload = function() {
                sptool.doc.importStacker[Id] = null
                
                var count = 0;
                for(var i in sptool.doc.importStacker) if(sptool.doc.importStacker[i]!=null) count++;
                
                LOG.SUCC("匯入完成 剩餘"+count, Id);
                if(count==0) sptool.cover.hide();
            };

            var me = function() {
                LOG.INFO("正在匯入", Id);
                sptool.doc.appendToHead(importCode);
            }
            if (sptool.doc.importStacker[requireId] == null) me();
            else {
                var old = sptool.doc.importStacker[requireId].onload;
                sptool.doc.importStacker[requireId].onload = function() {
                    old();
                    me();
                }
            }
            sptool.doc.importStacker[Id] = importCode;
        }
    }

    sptool.doc.import = {
            css: importFun("link", {
                rel: "stylesheet"
            }, "href"),
            js: importFun("script", {}, "src")
        }
        //this must be last line
    
    //sptool.loaded(worksToDo);

    document.addEventListener("DOMContentLoaded", function() {
        sptool.loaded(worksToDo);
    });
}

sptool.auto.all = function(func) {
    var work = [sptool.auto.jquery, sptool.auto.bootstrap];
    if("function" == typeof func) work.push(func);
    sptool.setup(work);
}
sptool.auto.forClass = function(Unit) {
    sptool.helpTilEnd = true;
    sptool.auto.all();
    var title = sptool.doc.create("title")
    title.textContent = "乙班09邱柏翰" + Unit;
    sptool.doc.appendToHead(title);
    
}


sptool.auto.jquery = function() {
    sptool.doc.import.js("https://code.jquery.com/jquery-1.12.0.min.js", "jquery");
    sptool.doc.import.js("https://code.jquery.com/jquery-migrate-1.2.1.min.js", "jquery migrate", "jquery");
}
sptool.auto.bootstrap = function() {
    sptool.doc.appendToHead(sptool.doc.create("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    }));
    sptool.doc.import.css("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css", "bootstrap CSS");
    sptool.doc.import.css("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css", "bootstrap theme");
    sptool.doc.import.js("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js", "bootstrap", "jquery");
}



sptool.doc.setOnBootstrapMode = function() {
    var oldText = sptool.doc.body.innerHTML;
    sptool.doc.body.innerHTML = "";
    var newContain = sptool.doc.create("div", {
        class: "container"
    });
    var row1 = sptool.doc.create("div", {
        class: "row"
    });
    var row2 = sptool.doc.create("div", {
        class: "row"
    });
    var col1 = sptool.doc.create("div", {
        class: "col-md-12"
    });
    var col2 = sptool.doc.create("div", {
        class: "col-md-12"
    });
    row1.appendChild(col1);
    row2.appendChild(col2);
    newContain.appendChild(row1);
    newContain.appendChild(row2);
    row1.innerHTML = oldText;
    row2.innerHTML = "<hr><br>super tool 自動套版 made by cbs09";
    sptool.doc.body.appendChild(newContain);

    var table = newContain.getElementsByTagName("table");
    for (var i in table)
        if (table[i] instanceof Node) {
            table[i].setAttribute("class", "table table-hover");
        }

}



sptool.doc.auto.sortTable = function(table, col, compare) {
    var tableBody = table.getElementsByTagName("tbody")[0]
    var tableRows = tableBody.getElementsByTagName("tr");
    var data = [];
    for (var i in tableRows)
        if (tableRows[i] instanceof Node)
            data.push(tableRows[i]);
    data.sort(function(a, b) {
        var data1 = a.getElementsByTagName("td")[col];
        var data2 = b.getElementsByTagName("td")[col];
        return compare(data1, data2);
    });
    tableBody.innerHtml = "";
    for (var i in data) tableBody.appendChild(data[i]);
}
sptool.doc.auto.table = function(head, body, colorer, arrows) {
    if ("undefined" == typeof arrows) arrows = {
        n: {
            up: "△",
            down: "▽"
        },
        s: {
            up: "▲",
            down: "▼"
        }
    }
    var t = sptool.doc.create("table", {
        class: "table table-hover"
    });
    var h = sptool.doc.create("thead");
    var b = sptool.doc.create("tbody");
    var hr = sptool.doc.create("tr");
    var sortClick = function(th, i) {
        return function() {

            var dir = 0;
            for (var ns in arrows) {
                for (var ud in arrows[ns])
                    if (th.textContent.search(arrows[ns][ud]) != -1) {
                        
                        if (ud == "up") dir = 1;
                        else dir = -1;
                        if (ns == "s") dir *= -1;
                        break;
                    }
                if (dir != 0) break;
            } // find dir


            var tableHead = h.getElementsByTagName("th");

            for (var j in tableHead) {
                if (tableHead[j] instanceof Node) {
                    tableHead[j].textContent =
                        tableHead[j].textContent.replace(arrows.s.up, arrows.n.up);
                    tableHead[j].textContent =
                        tableHead[j].textContent.replace(arrows.s.down, arrows.n.down);
                }

            }
            
            
            if (dir == 1) {
                LOG.INFO("dir=", th.textContent);
                th.textContent = th.textContent.replace(arrows.n.down, arrows.s.up);
                th.textContent = th.textContent.replace(arrows.n.up, arrows.s.up);
            } else {
                th.textContent = th.textContent.replace(arrows.n.up, arrows.s.down);
                th.textContent = th.textContent.replace(arrows.n.down, arrows.s.down);
            }


            sptool.doc.auto.sortTable(t, i, function(a, b) {
                var d1 = a.textContent;
                var d2 = b.textContent;
                if (isNaN(d1) || isNaN(d2)) {
                    d1 = 0;
                    d2 = 0;
                    for (var i in a.textContent) d1 += a.textContent.charCodeAt(i) * i;
                    for (var i in a.textContent) d2 += b.textContent.charCodeAt(i) * i;
                }
                return (d1 - d2) * dir;
            });
        };
    }
    for (var i in head) {
        var th = sptool.doc.create("th");
        th.innerHTML = head[i];
        var dir = 0;
        for (var ns in arrows) {
            for (var ud in arrows[ns])
                if (head[i].search(arrows[ns][ud]) != -1) {
                    if (ud == "up") dir = 1;
                    else dir = -1;
                    if (ns == "s") dir *= -1;
                    break;
                }
            if (dir != 0) break;
        } // find dir
        if (dir != 0)
            th.onclick = sortClick(th, i);

        hr.appendChild(th);
    }
    h.appendChild(hr);
    for (var i in body) {
        var r = sptool.doc.create("tr");
        for (var j in body[i]) {
            var data = body[i][j]
            var td = sptool.doc.create("td");
            td.innerHTML = data;
            if ("undefined" != typeof colorer)
                colorer(data, td);
            r.appendChild(td);
        }
        b.appendChild(r);
    }
    t.appendChild(h);
    t.appendChild(b);
    return t;
}

sptool.loaded = function(worksToDo) {
    if (sptool.isLoaded) return true;
    sptool.doc.html = document.getElementsByTagName("html")[0];
    sptool.doc.head = document.getElementsByTagName("head")[0];
    sptool.doc.body = document.getElementsByTagName("body")[0];
    var oldStyle = sptool.doc.body.getAttribute("style");
    sptool.doc.body.setAttribute("style", " font-family: 微軟正黑體; " + oldStyle);
    if (sptool.helpTilEnd) {
        var container = document.getElementsByClassName("container");
        var containerF = document.getElementsByClassName("container-fluid");
        if (container.length <= 0 && containerF.length <= 0) {
            LOG.ERRO("未套用 bootstrap container", "\n系統將自動將內文套用版型");
            sptool.doc.setOnBootstrapMode();
        }
    }

    //this must be last line
    for (var i in worksToDo) worksToDo[i]();
    for (var i in sptool.afterLoaded) sptool.afterLoaded[i]();
    sptool.isLoaded = true;
    LOG.WARR("製作聲明", "\n superTool is made by cbs09");
    sptool.cover.setup();
}

sptool.cover = {};
sptool.cover.setup = function(){
    sptool.cover.object = sptool.doc.create("div",{
        style : "width: 100%; height: 100%;"+
        "position: absolute; top: 0px; left:0px;"+
        "background-color: rgb(255,255,255); zIndex: 9999;"
    });
    sptool.cover.opacity = 255;
    sptool.doc.body.appendChild(sptool.cover.object);
}
sptool.cover.turnoff = function(){
    sptool.cover.opacity -= 4;
    sptool.cover.object.style.backgroundColor = 
        "rgba(255,255,255,"+(sptool.cover.opacity/255)+")";
    return sptool.cover.opacity <= 0;
}
sptool.cover.hide = function(){
    sptool.cover.interval = setInterval(function(){
        if(sptool.cover.turnoff()) {
            sptool.doc.body.removeChild(
                sptool.cover.object);
            clearInterval(sptool.cover.interval);
        }
    },14);
}
