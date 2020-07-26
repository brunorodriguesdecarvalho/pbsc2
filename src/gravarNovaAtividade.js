$(() => {
    $('#enviar').click(() => {
        var testeTitulo = $("#ativNome").val()
        var testeDataCria = $("#ativDataCria").val()
        var testeDataFim = $("#ativDataFim").val()
        if (testeTitulo == "" || testeDataCria == "" || testeDataFim == "" ) {
            window.alert("Por favor incluir pelo menos um título, uma data de criação e um prazo. Esses 3 dados precisam ser informados. Tente novamente, por favor.")        
        } else {
            var dataCriaOrigem = $("#ativDataCria").val()
            var dataCriaBR = ajustaDataBr(dataCriaOrigem)
            var dataFimOrigem = $("#ativDataFim").val()
            var dataFimBR = ajustaDataBr(dataFimOrigem)
            var atividades = { 
                ativNome: $("#ativNome").val(), 
                ativIni: $("#ativIni").val(),
                ativStat: $("#ativStat").val(),
                ativDesc: $("#ativDesc").val(),
                ativMot: $("#ativMot").val(),
                ativRisk: $("#ativRisk").val(),
                ativDataCria: dataCriaBR,
                ativDataFim: dataFimBR,
                userID: $("#userID").val()
            }
            novoAtividade(atividades)
        }
    })
})    

function novoAtividade(atividades) {
    $.post('/atividades', atividades)
}


