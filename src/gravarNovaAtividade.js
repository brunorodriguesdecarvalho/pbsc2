$(() => {
    $('#enviar').click(() => {
        var testeTitulo = $("#ativNome").val()
        if (testeTitulo == "") {
            window.alert("Por favor incluir pelo menos um título. Tente novamente.")
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


