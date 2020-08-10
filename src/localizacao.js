var map, infoWindow;
var posicaoSemGPS = {lat: -23.5465491, lng: -46.6909216};
var track = []
var posicao = {lat: 0, lng: 0}
var marcadorAtual
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: posicaoSemGPS,
        zoom: 18
    });
    obterLocalAtual()
}

var marcadorAtual = new google.maps.Marker({
    position: null,
    map,
    title: null,
});

function criarMarcador(pos, map, titulo) {
    
    marcadorAtual = new google.maps.Marker({
        position: pos,
        map,
        title: titulo
    });
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
    console.log("Gravando localização atual na Array...")

    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(function (position) {
            
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log("Posição recebida do navegador: Lat->"+pos.lat+". Lon->"+pos.lng+".")
            map.setCenter(pos);
            
            track.push(pos)
            var sizeArray = track.length
            for (let i=0; i<sizeArray; i++) {
                console.log(`Imprimindo array[${i}]: ${track[i]}.`)
            }

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
            console.log("Disparou FUNCTION QUE NÂO DEVIA!!")
        } 

    )} else {

        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        alert("Não foi possível encontrar a localização atual.")

    }
}

function addMarker(location, map, titulo) {
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
