//Esse arquivo é responsável pela base de envio para gravação no banco de dados, contendo as informações completas sobre cada corrida para gravar.

var dist = Number($("#runKm").val())

function novaCorrida(Corrida) {
    $.post('/run', Corrida)
    console.log("enviado para Post")
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
        console.log("Objeto Corrida criado e iniciado")

        criarParciais(Corrida)
        //criarParciaisAcc(Corrida)
        Corrida.PaceTotalLer = transSegMin(Corrida.PaceOrigem)
        Corrida.TempoTotalLer = transSegMin(Corrida.TempoFinalS)

        console.log("Objeto Corrida finalizado")
        
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
        console.log("Terminou função base")
    })
})

