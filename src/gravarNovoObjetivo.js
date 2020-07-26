$(() => {
    $('#enviar').click(() => {
        var testeTitulo = $("#objNome").val()
        if (testeTitulo == "") {
            window.alert("Por favor incluir pelo menos um título. Tente novamente.")
        } else {
            var dataCriaOrigem = $("#objDataCria").val()
            var dataCriaBR = ajustaDataBr(dataCriaOrigem)
            var dataFimOrigem = $("#objDataFim").val()
            var dataFimBR = ajustaDataBr(dataFimOrigem)
            var objetivos = { 
                objNome: $("#objNome").val(), 
                objStat: $("#objStat").val(),
                objDesc: $("#objDesc").val(),
                objMot: $("#objMot").val(),
                objRisk: $("#objRisk").val(),
                objDataCria: dataCriaBR,
                objDataFim: dataFimBR,
                userID: $("#userID").val()
            }
            novoObjetivo(objetivos)
        }
    })
})    

function novoObjetivo(objetivos) {
    $.post('/objetivos', objetivos)
}


