window.onload = function(){
    nazivVal = document.getElementById("nazivVal");
    autorVal = document.getElementById("autorVal");
    godinaVal = document.getElementById("godinaVal");
    idPjesma = document.getElementById("idPjesma");
    document.getElementById("naprid").addEventListener("click",povecaj);
    document.getElementById("natrag").addEventListener("click", smanji);
    document.getElementById("kraj").addEventListener("click",kraj);
    document.getElementById("pocetak").addEventListener("click", pocetak);
    document.getElementById("glavna").addEventListener("click",povratakGlavna)
    postaviPjesmu(brojac);
}

var brojac = 0;
var nazivVal;
var autorVal;
var godinaVal;
var idPjesma;
var zahtjev;
var zahtjev;
var srcVideo = "https://www.youtube.com/v/"

function postaviPjesmu(br)
{
  srcVideo = "https://www.youtube.com/v/"
  idPjesma.innerHTML = br;
  var kljuc = localStorage.key(br);
  console.log(kljuc);
  var item = localStorage.getItem(kljuc);
  item = JSON.parse(item);
  console.log(item);
  if(nazivVal){
    nazivVal.innerHTML = item.naziv;
    autorVal.innerHTML = item.autor;
    godinaVal.innerHTML = item.godina;
    zahtjev = new XMLHttpRequest;
    zahtjev.onreadystatechange = function(){
      if(zahtjev.readyState == 4 && zahtjev.status == 200){
        var odgovor = JSON.parse(zahtjev.responseText);
        srcVideo += odgovor.items[0].id.videoId;
        document.getElementById("video").src = srcVideo;
      }
    }
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +item.naziv +
    "-" + item.autor + "&maxResults=2&key=AIzaSyChr6PFx7xgvuleKHPtdE2yvXgEuc5e8Tc";
    console.log(url);
    zahtjev.open("GET",url,true);
    zahtjev.send();
  }
}

function povecaj()
{
  brojac += 1;
  if(brojac > localStorage.length - 1){brojac = localStorage.length - 1}
  console.log(brojac);
  postaviPjesmu(brojac);
}

function smanji(){
  brojac -= 1;
  if(brojac < 0){brojac = 0;}
  console.log(brojac);
  postaviPjesmu(brojac);
}

function kraj(){
  brojac = localStorage.length - 1;
  postaviPjesmu(brojac);
}

function pocetak(){
  brojac = 0;
  postaviPjesmu(brojac);
}

function povratakGlavna(){
  window.location = "index.html";
}
