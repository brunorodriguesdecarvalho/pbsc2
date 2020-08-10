var map, infoWindow;
var posicaoInicial = {lat: -23.5465491, lng: -46.6909216};
var track = []
var posicao = {lat: 0, lng: 0}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: posicaoInicial,
        zoom: 14
    });

    new google.maps.Marker({
        position: posicaoInicial,
        map,
        title: "Posição Inicial!"
      });

    infoWindow = new google.maps.InfoWindow;

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
            map.setCenter(pos);
            new google.maps.Marker({
                position: pos,
                map,
                title: "Posição Browser!"
            });
        
            var resposta = {lat: pos.lat , lng: pos.lng}
        
            console.log("Resposta do objeto: " + resposta)
            return resposta
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
    alert("Gravando localização atual na Array...")
    track.push(obterLocalAtual())
    console.dir(track)
}
//backup...


function preencherHistoria() {
    var Coordinates = track
      var Path = new google.maps.Polyline({
        path: Coordinates,
        geodesic: true,
        strokeColor: '#0B00FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      Path.setMap(map);
}

function testeBackup() {
    var flightPlanCoordinates = [
        {lat: -23.54628437009063, lng: -46.689233779907234}, 
        {lat: -23.545733579365486, lng: -46.68884754180908},
        {lat: -23.545241799982602, lng: -46.68957710266114},
        {lat: -23.54535982720223, lng: -46.68979167938233},
        {lat: -23.545989303917665, lng: -46.68981313705445},
        {lat: -23.546520422552213, lng: -46.690456867218025},
        {lat: -23.54691384237976, lng: -46.689920425415046},
        {lat: -23.546677790624496, lng: -46.689555644989014}
      ];
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#0B00FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
}