var urlBegin = "https://sites.google.com/a/mail.taivs.tp.edu.tw/cwds/downloads/unit";
var numFix = function(num, dig) {
    var m = 1;
    while (m <= num) {
        m *= 10;
        dig--;
    }
    while (dig--) {
        num = "0" + num;
    }
    return String(num);
}
var links = [
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDoyMDYxNDY1MzliYjA4M2Vl",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDo0ZDgyYzU1ZTM2ZDVkN2Vl",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDo0OTkyZTc2MmIzZGMzOGQ",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDo2YjUyYzMxYzJkNDE4ZmY0",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDo2NGY5NjYyM2YwYTJkMzQw",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDo2MzUzYWNmYWIwOGQ2ZWUy",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDoxZTVhMWJjNDQ2MGUyYTEw",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDoxNmZhYjQxMTExNzI1YWE2",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDo2MjFlYzBlMjE5MjRiYTk2",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDoxNTE4MjBkNjQzZjY4NDI3",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDo2YzkyZjZmODE0Yjk1NGFl",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDo1NWQ1ODlhZTE3ODJkNzg3",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDozMmY3N2E2YWYzMmE3YzA1",
    "https://docs.google.com/viewer?a=v&pid=sites&srcid=bWFpbC50YWl2cy50cC5lZHUudHd8Y3dkc3xneDozOWUzM2JhZWE1ZWE4ZmUw"
];

var put = document.getElementById("getUnitBookHere");
for(var i in links){
    var a = sptool.doc.create("a",{href:links[i], target:"_blank"});
    var div = sptool.doc.create("div",{class:"panel"});
    a.textContent = "講義 Unit " + numFix(Number(i)+1,2);
    div.appendChild(a);
    put.appendChild(div);
}