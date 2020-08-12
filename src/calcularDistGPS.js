function calcularDistancia() {
    var latA = Number(document.getElementById("latA").value)
    var lngA = Number(document.getElementById("lngA").value)
    var latB = Number(document.getElementById("latB").value)
    var lngB = Number(document.getElementById("lngB").value)
    distGPS(latA, lngA, latB, lngB)
}

function distGPS(latA, lngA, latB, lngB){
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((latB - latA) * p)/2 + 
            c(latA * p) * c(latB * p) * 
            (1 - c((lngB - lngA) * p))/2;
    var dist = Number((12742 * Math.asin(Math.sqrt(a))).toFixed(3))
    console.log("distancia atual: " +dist)
    return dist
}


function calcularVelocidade() {
    var distancia = Number(document.getElementById("distancia").value)
    var tempo = Number(document.getElementById("tempo").value)
    var velocidadeS = distancia / tempo
    var velocidadeK = velocidadeS * 3.6
    var resS = document.getElementById("velMS")
    var resK = document.getElementById("velKmH")
    resS.value = velocidadeS
    resK.value = velocidadeK
}