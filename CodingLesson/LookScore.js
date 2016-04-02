/*  臺北市立大安高工資訊科程式設計實習課程之作業展示成績統計工具
  ┌──────────────────┐
  │ created by Hans  │
  │        2016/04/02│
  └──────────────────┘
       
  ┌────────────────────────────────────────────┐
  │請複製以下短碼於作業展示網頁以F12開啟Console並貼上
  ├──────────────────────────────────────────┤
  
       
*/
function pRound(num, dig){
  for(var i=0;i<dig;i++) num*=10;
  num = Math.round(num);
  for(var i=0;i<dig;i++) num/=10;
  return num;
}
function genTrNodes(td, data){
  var node = document.createElement("tr");
  for(var i in data){
    var d = document.createElement(td);
    d.textContent = data[i];
    node.appendChild(d);
  }
  return node;
}

function gfForSortTable(table, rowId){
  return function(){
    var gettt = table.getElementsByTagName("tr");
    var tt = [];
    for(var i in gettt) if(gettt[i] instanceof Node)tt.push(gettt[i]);
    tt.sort(function(a,b){
      return Number(a.getElementsByTagName("td")[rowId].textContent)
        -Number(b.getElementsByTagName("td")[rowId].textContent);
    });
    table.childNodes = [];
    for(var i in tt) table.appendChild(tt[i]);
  }
}
var theTable = "";
function genTable(title, data){
  var node = document.createElement("table");
  node.setAttribute("class","table table-bordered table-hover");
  node.setAttribute("style","background:#ffffff");
  var h = document.createElement("thead");
  var b = document.createElement("tbody");
  theTable = b;
  h.appendChild(genTrNodes("th", title));
  for(var i in data){
    var tr = genTrNodes("td", data[i]);
    tr.setAttribute("title", students[i].getTitles());
    b.appendChild(tr);
  }
  var ths = h.getElementsByTagName("th");
  console.log(ths);
  for(var i in ths){
    var th = ths[i];
    if(th instanceof Node)
    th.setAttribute("onclick","gfForSortTable(theTable, "+i+")()");
  }
  node.appendChild(h);
  node.appendChild(b);
  return node;
}

function score(name, stats, score, title, time){
  this.name = name.trim();
  this.stats = stats;
  this.score = score;
  this.title = title.trim();
  this.time = time.trim();
}
function getSubString(string, cuts){
  this.subPoints = [];
  for(var i in cuts){
    var word = cuts[i];
    var leng = word.length;
    var pos = string.search(word);
    this.subPoints.push({start:pos, end:pos+leng});
  }
  var result = [];
  for(var i in subPoints){
    var start = subPoints[i].end;
    var end = string.length;
    if(subPoints[i].start == -1) {
      result.push({stats: 0, text: ""});
    }
    else{
      for(var j in subPoints){
        var n = subPoints[j].start;
        if(n>start && n<end)end = n;
      }
      result.push({stats: 1, text:string.slice(start, end)});
    }
  }
  return result;
}
function getScoreByString(string){
  if(string==null) return new score("", "noScore", 0, "", "");
  var start = 0;
  //for(var i in string) if(string[i]==' ' && string[Number(i)+1]!=' '){start = Number(i)+1; break;}
  string = "thisname:"+string.substr(start);
  var result = getSubString(string,["thisname:","得分：","評語：","時間："]);
  if(result[1].stats==1){
    return new score(result[0].text, "scored", Number(result[1].text),result[2].text,result[3].text);
  }else{
    return new score(result[0].text, "noScore", 0, "", "");
  }
}

var students = [];
function student(name, number){
  this.name = name.trim();
  this.number = number;
  this.scores = [];
  this.sum = 0;
  this.ava = 0;
  this.rank = 0;
  this.titles = [];
  this.calcScore = function(){
    if(this.scores.length<=0) return;
    var sum = 0;
    var count = 0;
    this.titles = [];
    for(var i in this.scores){
      if(this.scores[i].stats=="scored"){
        sum += Number(this.scores[i].score);
        count++;
        
        var text = this.scores[i].title;
        if(text!="(無)"){
          this.titles.push({name:this.scores[i].name, text: text});
        }
      }
    }
      
    this.sum = sum;
    if(count!=0)
    this.ava = sum/count;
    else this.ava = 0;
  }
  
  this.toString = function(){
    return this.number+"\t"+this.name+"\t"+this.sum+"\t"+pRound(this.ava,0)+"\t"+this.rank;
  }
  
  this.getTitles = function(){
    var s = "";
    for(var i in this.titles) s+=this.titles[i].name+"\t"+this.titles[i].text+"\n";
    return s;
  }
}

function getData(){
  var table = document.getElementsByTagName("tbody")[1];
  var trs = table.getElementsByTagName("tr");
  for(var i in trs){
    var tr = trs[i];
    if(!(tr instanceof Node)) continue;
    var tds = tr.getElementsByTagName("td");
    var s = new student(tds[1].textContent, Number(tds[0].textContent));
    for(var j = 2; j<tds.length;j++){
      s.scores.push(getScoreByString(tds[j].getAttribute("title")));
    }
    s.calcScore();
    students.push(s);
  }
}

function calcRank(){
  var rStudents = [];
  for(var i in students){
    rStudents.push({id:i, data:students[i]});
  }
  rStudents.sort(function(a,b){return -a.data.ava+b.data.ava});
  for(var i in rStudents){
    students[rStudents[i].id].rank = Number(i)+1;
  }
}

function genStudentTable(students){
  var data = [];
  for(var i in students){
    var s = students[i];
    data.push([s.number, s.name, s.rank, s.sum, pRound(s.ava,2)]);
  }
  return genTable(["座號","姓名","名次","總分","平均"], data);
}

function dothework(){
  getData();
  calcRank();

  var body = document.getElementsByTagName("body")[0];

  body.innerHTML+=(
    "<script src='https://code.jquery.com/jquery-1.12.0.min.js'></script>"+
  "<script src='https://code.jquery.com/jquery-migrate-1.2.1.min.js'></script>"+
  "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' >"+
  "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css'>"+
  "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'></script>");

  var contain = document.createElement("div");
  contain.setAttribute("class","container");
  var div = document.createElement("div");
  div.setAttribute("class","col-md-12 panel-body");
  var table = genStudentTable(students);
  div.appendChild(table);

  contain.appendChild(div);
  body.appendChild(contain);
}