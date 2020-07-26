$(() => {
    $('#enviar').click(() => {
        var testeTitulo = $("#objNome").val()
        var testeDataCria = $("#objDataCria").val()
        var testeDataFim = $("#objDataFim").val()
        if (testeTitulo == "" || testeDataCria == "" || testeDataFim == "" ) {
            window.alert("Por favor incluir pelo menos um título, uma data de criação e um prazo. Esses 3 dados precisam ser informados. Tente novamente, por favor.")        
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


