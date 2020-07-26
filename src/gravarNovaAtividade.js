$(() => {
    $('#enviar').click(() => {
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
    })
})    

function novoAtividade(atividades) {
    $.post('/atividades', atividades)
}


