function calcularPace(){
    var hora = Number($("#runTempoH").val()) 
    var min = Number($("#runTempoM").val())
    var seg = Number($("#runTempoS").val())
    var Dist = Number($("#runKm").val())

    if (hora == 0 & min == 0 & seg == 0 ) {
        alert("O tempo não pode estar zerado. Por favor preencha os campos com um números maiores que 1 e tente calcular novamente.")
    } else if( hora.length == 0 & min.length == 0 & seg.length == 0 ) {
        const a = alert("Você não digitou o tempo. Por favor tente novamente.")
        return a
    } else if( Dist.length == 0 ) {
        const a = alert("Você não digitou a distância. Por favor preencha o campo e tente novamente.")
        return a
    }else if( Dist <= 0 ) {
        const a = alert("Você não digitou um valor válido para a distância. Por favor tente novamente.")
        return a
    } else {
        if (hora.length == 0) { hora = 0 }
        if (min.length == 0) { min = 0 }
        if (seg.length == 0) { seg = 0 }
        const somaSeg = (hora * 60 * 60) + (min * 60) + (seg)
        const paceMin = Math.floor(somaSeg / Dist / 60)
        const paceResto = Math.floor(somaSeg / Dist % 60)
        var paceFinal = (paceMin + "m" + paceResto + "s/Km.")
        document.getElementById("resultPace").innerHTML = paceFinal
        document.getElementById("resultPaceSegundos").innerHTML = (paceMin*60) + (paceResto)
    }
}