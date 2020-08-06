//Essa função serve para calcular o tempo total da corrida com base nos tempos parciais informados pelo usuário.

function calcularTempoTotal() {
    //A quantidade de campos que precisom somar é igual ao KM
    var qtd = Number($("#runKm").val())
    var testFracaoKm = (qtd % Math.floor(qtd))

    var somaSeg = 0
    var somaMin = 0
    var somaHora = 0

    for(i=1; i<=qtd;i++){
        var paraSomar = Number($("#runTempoSKm"+i).val())
        somaSeg += paraSomar
    }

    if(somaSeg >= 60) {
        somaMin += Math.floor(somaSeg / 60)
        somaSeg %= 60
    }

    for(i=1; i<=qtd;i++){
        var paraSomar = Number($("#runTempoMKm"+i).val())
        somaMin += paraSomar
    }

    if(somaMin >= 60) {
        somaHora += Math.floor(somaMin / 60)
        somaMin %= 60
    }

    if( somaHora == 0 && somaMin == 0 && somaSeg == 0 ) {
        alert("Atenção: É necessário preencher os valores dos campos dos tempos para cada KM. Por favor tente novamente.")
    } else {
        
        if(testFracaoKm!=0) {
            var paraResgatarSeg = Number($("#runTempoSKmFrac").val())
            if(paraResgatarSeg>59){
                somaMin += Math.floor(paraResgatarSeg / 60)
                paraResgatarSeg %= 60
            }
            somaSeg += paraResgatarSeg
            
            if(somaSeg>59) {
                somaMin += Math.floor(somaSeg / 60)
                somaSeg %= 60
            }
        
            var paraResgatarMin = Number($("#runTempoMKmFrac").val())
            if(paraResgatarMin>59){
                somaHora += Math.floor(paraResgatarMin / 60)
                paraResgatarMin %= 60
            }
            somaMin += paraResgatarMin

            if(somaMin>59) {
                somaHora += Math.floor(somaMin / 60)
                somaMin %= 60
            }
        }
        
        document.getElementById("runTempoH").value = somaHora
        document.getElementById("runTempoM").value = somaMin
        document.getElementById("runTempoS").value = somaSeg

        calcularPace()
        criarParciaisAcc()
    }
}