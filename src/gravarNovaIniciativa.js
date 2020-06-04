$(() => {
    $('#enviar').click(() => {
        var iniciativas = { 
            iniNome: $("#iniNome").val(), 
            iniObj: $("#iniObj").val(),
            iniStat: $("#iniStat").val(),
            iniDesc: $("#iniDesc").val(),
            iniMot: $("#iniMot").val(),
            iniRisk: $("#iniRisk").val(),
            iniDataCria: $("#iniDataCria").val(),
            iniDataFim: $("#iniDataFim").val(),
            userID: $("#userID").val()
        }
        novoIniciativa(iniciativas)
    })
})    

function novoIniciativa(iniciativas) {
    $.post('/iniciativas', iniciativas)
}


