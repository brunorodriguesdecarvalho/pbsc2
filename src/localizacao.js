var map, infoWindow;
var posicaoInicial = {lat: -23.5465491, lng: -46.6909216};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: posicaoInicial,
        zoom: 18
    });

    new google.maps.Marker({
        position: posicaoInicial,
        map,
        title: "Posição Inicial!"
      });

    infoWindow = new google.maps.InfoWindow;

    //Try HTML5 geolocation.
    obterLocalAtual();
}

function obterLocalAtual() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            console.log("Posição recebida do navegador: Lat->"+pos.lat+". Lon->"+pos.lng+".")
            infoWindow.setContent("Localiazação via Browser Encontrada. Lat:"+pos.lat+".Lon:"+pos.lng+".");
            infoWindow.open(map);
            map.setCenter(pos);
            new google.maps.Marker({
                position: pos,
                map,
                title: "Posição Browser!"
              });
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
    infoWindow.setContent(browserHasGeolocation ? 'Erro: Serviço de Geolocalização falhou.' : 'Erro: Seu navegador não oferece suporte a geolocalização.');
    infoWindow.open(map);
}

function teste(){
    alert("testando e provando")
    console.log("testando e provando")
}