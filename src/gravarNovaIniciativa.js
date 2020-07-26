$(() => {
    $('#enviar').click(() => {
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
    })
})    

function novoIniciativa(iniciativas) {
    $.post('/iniciativas', iniciativas)
}


