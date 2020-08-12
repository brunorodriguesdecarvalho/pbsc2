var map, infoWindow, marcadorAtual, OnRec, OnTime, tempo = 0;
var posicaoSemGPS = {lat: -23.5465491, lng: -46.6909216};
var posicao = {lat: 0, lng: 0};
var track = [], markers = []; 

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: posicaoSemGPS,
        zoom: 18
    });
    obterLocalAtual()
}

function obterLocalAtual() {
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(function (position) {
            
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log("Posição recebida do navegador: Lat->"+pos.lat+". Lon->"+pos.lng+".")
            map.setCenter(pos);

            addMarker(pos, map, "Localização Atual");

            return pos
        },

        () => {
            handleLocationError(true, infoWindow, map.getCenter());
            console.log("Disparou FUNCTION QUE NÂO DEVIA!!")
        } 

    )} else {

        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        alert("Não foi possível encontrar a localização atual.")

    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Erro: Serviço de Geolocalização falhou.' : 'Erro: Seu navegador não oferece suporte a geolocalização.');
    infoWindow.open(map);
}

function gravarAtual(){
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(function (position) {
            
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log("Posição gravadada agora: Lat->"+pos.lat+". Lon->"+pos.lng+".")
            map.setCenter(pos);
            track.push(pos)

            var Path = new google.maps.Polyline({
                path: track,
                geodesic: true,
                strokeColor: '#0B00FF',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
        
            Path.setMap(map);

        },

        () => {
            handleLocationError(true, infoWindow, map.getCenter());
            alert("Disparou FUNCTION QUE NÂO DEVIA!!")
        },
        
        {enableHighAccuracy: true}

    )} else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        alert("Não foi possível encontrar a localização atual.")
    }
}

function mostrarBtnEncerrar() {
    document.getElementById("btnIniciarRun").style = "display: none";
    document.getElementById("btnAcabarRun").style = "display: fixed";
    console.log("Iniciando gravação da corrida...")
    OnRec = setInterval(gravarAtual, 1000)
    OnTime = setInterval(contagem, 1000)
    inicializarContador()
}

function mostrarBtnIniciar() {
    clearInterval(OnRec)
    clearInterval(OnTime)
    inicializarContador()
    console.log("Encerrando gravação da corrida...")
    document.getElementById("btnIniciarRun").style = "display: fixed";
    document.getElementById("btnAcabarRun").style = "display: none";
    var sizeArray = track.length
    for (let i=0; i<sizeArray; i++) {
        console.dir(`Resultado da corrida na parcial do segundo #[${i+1}]: Lat->${track[i].lat} |  Lng->${track[i].lng}.`)
    }
    if (sizeArray > 0) {
        track = []
    }
}


function addMarker(location, map, titulo) {
    clearMarkers()
    
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: titulo
    });
    markers.push(marker);
} // Sets the map on all markers in the array.

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
} 

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
} 

function inicializarContador(){
    document.getElementById("displayTimer").innerText=("00:00").toString()
    tempo=0
}

inicializarContador()

function contagem() {
    tempo += 1
    if(tempo<60) {
        document.getElementById("displayTimer").innerText=(tempo+"s").toString()
    } else if (tempo<3600) {
        var minuto = Math.floor(tempo / 60)
        var segundo = Math.floor(tempo % 60)
        document.getElementById("displayTimer").innerText=(minuto+"m"+segundo+"s").toString()
    } else {
        var hora = Math.floor(tempo / 60 / 60)
        var minuto = Math.floor(tempo / 60)
        var segundo = Math.floor(tempo % 60)
        document.getElementById("displayTimer").innerText=(hora+"h"+minuto+"m"+segundo+"s").toString()
    }
}