$(() => {
    $('#enviar').click(() => {
        var objetivos = { 
            objNome: $("#objNome").val(), 
            objStat: $("#objStat").val(),
            objDesc: $("#objDesc").val(),
            objMot: $("#objMot").val(),
            objRisk: $("#objRisk").val(),
            objDataCria: $("#objDataCria").val(),
            objDataFim: $("#objDataFim").val(),
            userID: $("#userID").val()
        }
        novoObjetivo(objetivos)
    })
})    

function novoObjetivo(objetivos) {
    $.post('/objetivos', objetivos)
}


