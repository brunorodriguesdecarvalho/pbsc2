$(() => {
    $('#enviar').click(() => {
        var atividades = { 
            ativNome: $("#ativNome").val(), 
            ativIni: $("#ativIni").val(),
            ativStat: $("#ativStat").val(),
            ativDesc: $("#ativDesc").val(),
            ativMot: $("#ativMot").val(),
            ativRisk: $("#ativRisk").val(),
            ativDataCria: $("#ativDataCria").val(),
            ativDataFim: $("#ativDataFim").val(),
            userID: $("#userID").val()
        }
        novoAtividade(atividades)
    })
})    

function novoAtividade(atividades) {
    $.post('/atividades', atividades)
}


