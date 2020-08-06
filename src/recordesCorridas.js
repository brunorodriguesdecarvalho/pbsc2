function queryRecordesDisc(Dist) {
    var uri = '/corridas/best/disc' + Dist //serve para URI dinâmica de pesquisa
    var KmRef = "Km" + Dist  //serve para localizar o Km correto de pesquisa dentro de cada registro de corrida
    var MelhorTempoRef = "MTDisc" + Dist //serve para indicar a localização de onde irá exibir os melhores tempos em cada Km

    $.get( uri , (corridas) => {
        var TempoSeg = corridas[0][KmRef] //Para poder ordenar na base e para calcular o tempo em minutos.
        var TempoMin = transSegMin(TempoSeg) 
        if (TempoSeg < 1) {
            document.getElementById(MelhorTempoRef).innerHTML = "Sem Info."
        } else {
            document.getElementById(MelhorTempoRef).innerHTML = TempoMin
        }
    }) 
} 



function queryRecordesAcc(Dist){
    var uri = '/corridas/best/acc' + Dist //serve para URI dinâmica de pesquisa
    var KmRef = "KmAcc" + Dist  //serve para localizar o Km correto de pesquisa dentro de cada registro de corrida
    var MelhorTempoRef = "MTAcc" + Dist //serve para indicar a localização de onde irá exibir os melhores tempos em cada Km

    $.get( uri , (corridas) => {
        var TempoSeg = corridas[0][KmRef] //Para poder ordenar na base e para calcular o tempo em minutos.
        var TempoMin = transSegMin(TempoSeg) 
        if (TempoSeg < 1) {
            document.getElementById(MelhorTempoRef).innerHTML = "Sem Info."
        } else {
            document.getElementById(MelhorTempoRef).innerHTML = TempoMin
        }
    }) 
}

function queryPaceAcc(Dist){
    var uri = '/corridas/best/pace' + Dist //serve para URI dinâmica de pesquisa
    var KmRef = "PaceSegAcc" + Dist  //serve para localizar o Km correto de pesquisa dentro de cada registro de corrida
    var MelhorTempoRef = "Pace" + Dist //serve para indicar a localização de onde irá exibir os melhores tempos em cada Km

    $.get( uri , (corridas) => {
        var TempoSeg = corridas[0][KmRef] //Para poder ordenar na base e para calcular o tempo em minutos.
        var TempoMin = transSegMin(TempoSeg) 
        if (TempoSeg < 1) {
            document.getElementById(MelhorTempoRef).innerHTML = "Sem Info."
        } else {
            document.getElementById(MelhorTempoRef).innerHTML = TempoMin
        }
    }) 
}

for(let i=1; i<=21; i++) {
    queryRecordesDisc(i)
    queryRecordesAcc(i)
    queryPaceAcc(i)
}
