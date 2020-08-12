function calcular() {
    var latA = Number(document.getElementById("latA").value)
    var lngA = Number(document.getElementById("lngA").value)
    var latB = Number(document.getElementById("latB").value)
    var lngB = Number(document.getElementById("lngB").value)
    var DLat = latB - latA
    var DLng = lngB - lngA
    const fator = 1852
    var dist = Math.sqrt((DLat*fator)+(DLng*fator))
    var responder = document.getElementById("res")
    responder.value = dist
    console.log("Calculo realizado, resultado: "+dist)
}
