var map, infoWindow;
var posicaoInicial = {lat: -23.553286, lng: -46.702505};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: posicaoInicial,
        zoom: 13
    });

    infoWindow = new google.maps.InfoWindow;

    //Try HTML5 geolocation.
    obterLocalAtual();

    var marker = new google.maps.Marker({
        position: posicaoInicial,
        map: map,
        title: 'Hello World!'
    });
}

function obterLocalAtual() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            console.log("Posição recebida do navegador: Lat->"+ pos.lat+". Lon->"+ pos.lng+".")
            infoWindow.setContent('Localiazação via Browser Encontrada');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
            console.log("Disparou FUNCTION QUE NÂO DEVIA!!")
        });
    }
    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        alert("Não foi possível encontrar a localização atual.")
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function teste(){
    alert("testando e provando")
    console.log("testando e provando")
}