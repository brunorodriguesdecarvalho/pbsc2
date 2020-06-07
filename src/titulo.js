var titulo = document.title
var buscadoispontos = titulo.search(":")
var tituloMain = titulo.substr(0, buscadoispontos)
var tituloSub = titulo.substr(buscadoispontos+1, 100)
document.getElementById('tituloMain').innerHTML=tituloMain + ":";
document.getElementById('tituloSub').innerHTML=tituloSub;