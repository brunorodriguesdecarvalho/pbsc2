$(() => {
    $('#enviar').click(() => {
        var testeTitulo = $("#iniNome").val()
        var testeDataCria = $("#iniDataCria").val()
        var testeDataFim = $("#iniDataFim").val()
        if (testeTitulo == "" || testeDataCria == "" || testeDataFim == "" ) {
            window.alert("Por favor incluir pelo menos um título, uma data de criação e um prazo. Esses 3 dados precisam ser informados. Tente novamente, por favor.")        
        } else {
            var dataCriaOrigem = $("#iniDataCria").val()
            var dataCriaBR = ajustaDataBr(dataCriaOrigem)
            var dataFimOrigem = $("#iniDataFim").val()
            var dataFimBR = ajustaDataBr(dataFimOrigem)
            var iniciativas = { 
                iniNome: $("#iniNome").val(), 
                iniObj: $("#iniObj").val(),
                iniStat: $("#iniStat").val(),
                iniDesc: $("#iniDesc").val(),
                iniMot: $("#iniMot").val(),
                iniRisk: $("#iniRisk").val(),
                iniDataCria: dataCriaBR,
                iniDataFim: dataFimBR,
                userID: $("#userID").val()
            }
            novoIniciativa(iniciativas)
        }
    })
})    

function novoIniciativa(iniciativas) {
    $.post('/iniciativas', iniciativas)
}


