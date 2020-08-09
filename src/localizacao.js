var map, infoWindow;
var posicaoInicial = {lat: 23.5677861, lng: -46.7006432};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: posicaoInicial,
        zoom: 15
    });
    new google.maps.Marker({
        position: posicaoInicial,
        map,
        title: "Hello World!"
    });

infoWindow = new google.maps.InfoWindow;

//Try HTML5 geolocation.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}