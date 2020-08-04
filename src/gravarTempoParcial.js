function gravarTempoParcial(tempoParcial, Dist) {
    var i 
    var Par = {}
    for (i=0; i<Math.floor(Dist); i++) {
        var nomeProp = "Km"+(i+1)
        var endValorMin = "#runTempoMKm" + (i+1)      
        var valorAtualMin = Number($(endValorMin).val()) * 60
        var endValorSeg = "#runTempoSKm" + (i+1)        
        var valorAtualSeg = Number($(endValorSeg).val())
        var valorAtual = valorAtualMin + valorAtualSeg
        ParObj = Object.create(Par)
        Object.defineProperty(ParObj, nomeProp, {
            value: valorAtual,
            writable: true,
            enumerable: true,
            configurable: true
        })
        tempoParcial.push(ParObj)
        console.dir("Tempo Parcial no loop (" + (i+1) + "): " + tempoParcial)
    }
    document.getElementById("demo").innerHTML = tempoParcial
    return tempoParcial
}
