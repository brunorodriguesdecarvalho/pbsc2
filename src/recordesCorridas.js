function queryRecordes(Dist) {
    var uri = '/corridas/best' + Dist //serve para URI dinâmica de pesquisa
    var KmRef = "Km" + Dist  //serve para localizar o Km correto de pesquisa dentro de cada registro de corrida
    var MelhorTempoRef = "RKm" + Dist //serve para indicar a localização de onde irá exibir os melhores tempos em cada Km

    $.get( uri , (corridas) => {
        var TempoSeg = corridas[0][KmRef] //Para poder ordenar na base e para calcular o tempo em minutos.
        var TempoMin = transSegMin(TempoSeg) 
        if (TempoSeg < 1) {
            document.getElementById(MelhorTempoRef).innerHTML = "Sem Info."
        } else {
            document.getElementById(MelhorTempoRef).innerHTML = TempoMin
        }
    } ) 
} 

for(let i=1; i<=21; i++) {
    queryRecordes(i)
}

