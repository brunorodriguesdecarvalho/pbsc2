//Essa função serve para alimentar os dados que serão enviados para gravar na base de dados com as informações dos tempos parciais.

function gravarParciais(Dados) {
    for (let i = 0 ; i < Math.floor(Dados.DistanciaTotal) ; i++) {
        var KmAtual = "Km" + (i+1)
        if( Number($("#runTempoMKm"+(i+1)).val()) > 0 || Number($("#runTempoSKm"+(i+1)).val()) > 0)  {
            Dados[KmAtual] = (Number($("#runTempoMKm"+(i+1)).val()) * 60) + Number($("#runTempoSKm"+(i+1)).val())
        }   
    }
}

function gravarParciaisAcc(Dados) {
    for (let i = 0 ; i < Math.floor(Dados.DistanciaTotal) ; i++) {
        var KmAtual = "KmAcc" + (i+1)
        var gravar = document.getElementById("TempoMKmAcc"+(i+1)).innerHTML
        if( gravar > 0 )  {
            Dados[KmAtual] = gravar
        }
        console.log("O que será gravado("+(i+1)+"): " + gravar)
    }
}

//Essa função serve para acumular o tempo no km

function criarParciaisAcc(){
    console.log("Iniciou Criar Parciais")
    var distanciaArrendondada = Math.floor(Number($("#runKm").val()))
    console.log("Distância que chegou: " + distanciaArrendondada)
    for(let i = 0; i < distanciaArrendondada; i++){
        var preencher = document.getElementById("TempoMKmAcc"+(i+1))
        console.log("Aonde será preenchido ("+(i+1)+"): " + preencher)
        var origemMin = Number($("#runTempoMKm"+(i+1)).val()) * 60
        var origemSeg = Number($("#runTempoSKm"+(i+1)).val())
        var parapreencherAgora = origemMin + origemSeg
        var refAcumular
        if(i>0){
            refAcumular = Number(document.getElementById("TempoMKmAcc"+(i)).innerHTML)
            console.log("Acumulado agora (" + (i+1) + "): " + refAcumular)
            preencher.innerHTML = parapreencherAgora + refAcumular
        } else {
            preencher.innerHTML = parapreencherAgora
        }
    }
    console.log("Terminou de criar parciais")
}