var dist = Number($("#runKm").val())

function novaCorrida(Corrida) {
    $.post('/run', Corrida)
}

$(() => {
    $('#enviar').click(() => {
        var rtH = Number($("#runTempoH").val()) * 60 * 60
        var rtM = Number($("#runTempoM").val()) * 60
        var rtS = Number($("#runTempoS").val())
        var Dist = Number($("#runKm").val())
        var rtF = rtH + rtM + rtS

        var Corrida = { 
            DistanciaTotal: Dist, 
            TempoFinalS: rtF,
            PaceOrigem: document.getElementById("resultPaceSegundos").innerHTML,
            DataCorridaOrigem: $("#runData").val(),
            userID: $("#userID").val(),
        }

        function criarParciais() {
            for (let i = 0 ; i < Math.floor(Corrida.DistanciaTotal) ; i++) {
                var KmAtual = "Km" + (i+1)
                if( Number($("#runTempoMKm"+(i+1)).val()) > 0 || Number($("#runTempoSKm"+(i+1)).val()) > 0)  {
                    Corrida[KmAtual] = (Number($("#runTempoMKm"+(i+1)).val()) * 60) + Number($("#runTempoSKm"+(i+1)).val())
                }   
            }
        }

        criarParciais()

        console.log(Corrida)

        if ( Corrida.DistanciaTotal < 1 ) {
            window.alert("Por favor incluir a distância total para efetuar a gravação. Tente novamente, por favor.")        
        } else if ( Corrida.DataCorridaOrigem == "" ) {
            window.alert("Por favor incluir a data da corrida para efetuar a gravação. Tente novamente, por favor.")   
        } else if ( Corrida.TempoTotalH == "" && Corrida.TempoTotalM == "" && Corrida.TempoTotalS == "" ) {
            window.alert("Por gentileza informar o tempo total. Por favor tente novamente.")
        } else if ( Corrida.PaceOrigem == "" ) {
            alert("Pace não foi calculado. Para gravar uma nova corrida, é necessário calcular o Pace pressionando o botão correspondente no formulário de cadastro de nova corrida. Por favor tente novamente")  
        } else {
            novaCorrida(Corrida)
        }
    })
})

