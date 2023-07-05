
var palabras = [["KINAL"], ["TRABAJO"], ["TALLER"], ["CALCULO"], ["DIBUJO"], ["ESTUDIO",], ["MAESTRO"], ["ALUMNO"], ["JOVENES"], ["QUINTO"], ["PROYECTO"], ["TAREAS"], ["PROGRAMAR"], ["AMIGOS"], ["HOLA"]];
var palabra = "";
var rand;
var esconder = [];
var espacio = document.getElementById("palabra");
var cont = 6;
var buttons = document.getElementsByClassName('letra');
var btnInicio = document.getElementById("reset");


function generaPalabra() {
  rand = (Math.random() * 19).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
}

function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    esconder[i] = "_";
  }
  espacio.innerHTML = esconder.join("");
}

function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
    }
  }
}


function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) esconder[i] = letra;
    }
    espacio.innerHTML = esconder.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}


function compruebaFin() {
  if( esconder.indexOf("_") == -1 ) {
    document.getElementById("msg-final").innerHTML = "Felicidades !!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function() { location.reload() };
  }else if( cont == 0 ) {
    document.getElementById("msg-final").innerHTML = "Game Over";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
}

window.onload = inicio();
