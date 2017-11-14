var idPodatka;
var infoHTML;
var idInput;

window.onload = function()
{
  if(localStorage.getItem(0) == null)
  {
    idPodatka = 0;
  }else{
    idPodatka = localStorage.length;
  }
  if(document.getElementById('dodajPjesmu') && document.getElementById('brisi')
  && document.getElementById('prikaziPopis')){
  document.getElementById('dodajPjesmu').addEventListener("click",dodajPjesmu);
  document.getElementById('brisi').addEventListener("click",obrisiPopis);
  document.getElementById('prikaziPopis').addEventListener("click",prijelaz);
}
  if(document.getElementById("info")){
    infoHTML = document.getElementById("info");
  }
  if(document.getElementById("idPodatka")){
    idInput = document.getElementById("idPodatka");
    idInput.value = idPodatka;
  }
}

function dodajPjesmu()
{
  var nazivP = document.getElementById('nazivPjesma').value;
  var nazivA = document.getElementById('nazivAutor').value;
  var godina = document.getElementById('godina').value;
  console.log(nazivP, nazivA);
  if(nazivP && nazivA)
  {
    var objekt = stvoriObjekt(nazivP, nazivA, godina);
    localStorage.setItem(idPodatka, objekt);
    idPodatka += 1;
    idInput.value = idPodatka;
  }
  infoHTML.innerHTML = "Podatak ime: " + nazivP + ", autor: "+nazivA + " spremljen!";
}

function obrisiPopis()
{
  localStorage.clear();
  idPodatka = 0;
  idInput.value = idPodatka;
}

function prijelaz()
{
  window.location = "popis.html";
}


function stvoriObjekt(naziv, autor, godina)
{
  var pjesma = {"naziv":naziv, "autor":autor, "godina":godina};
  var mojJSON = JSON.stringify(pjesma);
  return mojJSON;
}
