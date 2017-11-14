window.onload = function(){
  var i;
  for(i = 0; i < localStorage.length; i++){
    lista.push(localStorage.key(i));
  }
    nazivVal = document.getElementById("nazivVal");
    autorVal = document.getElementById("autorVal");
    godinaVal = document.getElementById("godinaVal");
    idPjesma = document.getElementById("idPjesma");
    document.getElementById("naprid").addEventListener("click",povecaj);
    document.getElementById("natrag").addEventListener("click", smanji);
    document.getElementById("kraj").addEventListener("click",kraj);
    document.getElementById("pocetak").addEventListener("click", pocetak);
    document.getElementById("glavna").addEventListener("click",povratakGlavna);
    document.getElementById("obrisi").addEventListener("click", obrisi);
    postaviPjesmu(brojac);
}

var brojac = 0;
var nazivVal;
var autorVal;
var godinaVal;
var idPjesma;
var zahtjev;
var zahtjev;
var flagNatrag = true;
var flagNaprijed = true;
var lista = [];

function postaviPjesmu(br)
{
  fadeIn(document.getElementById("prikazi"), document.getElementById("video"));
  var srcVideo = "https://www.youtube.com/v/"
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
  console.log(brojac);
  if(brojac > localStorage.length - 1){brojac = localStorage.length - 1}
  if(brojac == localStorage.length - 1){
  console.log(brojac);
  if(flagNaprijed){
  flagNaprijed = false;
  flagNatrag = true;
  postaviPjesmu(brojac);
  }
}else{
  flagNaprijed = true;
  flagNatrag = true;
  postaviPjesmu(brojac);
  }
}

function smanji(){
  brojac -= 1;
  console.log(brojac);
  console.log(lista);
  if(brojac < 0){brojac = 0;}
  if(brojac == 0){
    console.log(brojac);
    if(flagNatrag){
      postaviPjesmu(brojac);
      flagNatrag = false;
      flagNaprijed = true;
    }
  }else{
    postaviPjesmu(brojac);
    flagNatrag = true;
    flagNaprijed = true;
    }
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

function obrisi(){
  console.log(brojac);
  localStorage.removeItem(lista[brojac]);
  lista.splice(brojac,1);
  console.log(lista);
  if(localStorage.length == 0){
    povratakGlavna(brojac);
  }
  else if(brojac == 0 && localStorage.length != 0){
    brojac = 0;
    console.log("ovoj je "+brojac);
    if(brojac > localStorage.length - 1)
    {
      console.log("ušlo");
      brojac = localStorage.length - 1
    console.log(brojac);}
    postaviPjesmu(brojac);
  }else if(brojac != 0 && localStorage.length != 0){
    brojac -= 1;
    if(brojac < 0){brojac = 0;}
  postaviPjesmu(brojac);
  }
}

function fadeIn(element, element2){
  element2.style.display = "none";
  element.style.opacity = "0";
  var tick = function(){
    element.style.opacity = +element.style.opacity + 0.10;
    if(+element.style.opacity < 1){
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 14);
    }
  };
  tick();
  setTimeout(function(){
  element2.style.display = "inline-block";},500);
}
