function queryRecordes(Dist) {
    var uri = '/corridas/best' + Dist
    var Km = "Km" + Dist  
    var endKMDiscSeg = "SKm" + Dist
    var endKMDiscMin = "RKm" + Dist
    var endKMAccSeg = "SDKm" + Dist
    var endKMAccMin = "SAKm" + Dist
    var endKMAccSegAnt = "SDKm" + (Dist-1)
    $.get( uri , (corridas) => {
        var TempoSeg = corridas[0][Km] 
        var TempoMin = transSegMin(TempoSeg)
        if (TempoSeg == null) {
            document.getElementById(endKMDiscSeg).innerHTML = "Sem Info."
            document.getElementById(endKMDiscMin).innerHTML = "Sem Info."
            document.getElementById(endKMAccSeg).innerHTML = "Sem Info."
        } else {
            document.getElementById(endKMDiscSeg).innerHTML = TempoSeg
            document.getElementById(endKMDiscMin).innerHTML = TempoMin
            if( Dist == 1 ){ 
                document.getElementById(endKMAccSeg).innerHTML = TempoSeg
                document.getElementById(endKMAccMin).innerHTML = transSegMin(TempoSeg)
            }
            else {
                document.getElementById(endKMAccSeg).innerHTML = Number(document.getElementById(endKMAccSegAnt).innerHTML) + TempoSeg 
                document.getElementById(endKMAccMin).innerHTML = transSegMin(document.getElementById(endKMAccSeg).innerHTML)
            }
        }
    } ) 
} 

function transSegMin(SegParaTrans){
        
    var origem = SegParaTrans
    
    if(origem>0) {
        var minInt = Math.floor(origem/60)
        var minResto = origem - (minInt*60)

        if(minInt>59){
            Hora = Math.floor(minInt/60)
            var minIntResto = minInt - (Hora * 60)
            var StringMinSeg = Hora + "h" + minIntResto + "m" + minResto + "s."
        }else{
            var StringMinSeg = minInt + "m" + minResto + "s."
        }
        return StringMinSeg
    } else {return null} 
}

for(let i=1; i<=21; i++) {
    queryRecordes(i)
}

document.getElementsByClassName("ocultar").style = "display: hidden"
