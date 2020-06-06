function excluirAtividade(idparaApagar) {
    console.log('Init to delete: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    $.post('/deletaAtiv', atividade)
    console.log('Trying to delete: ', atividade)
    setTimeout(function() {location.reload()}, 1000)
}

function excluirIniciativa(idparaApagar) {
    console.log('Init to delete: ', idparaApagar)
    var iniciativa = { _id: idparaApagar }
    $.post('/deletaIni', iniciativa)
    console.log('Trying to delete: ', iniciativa)
    setTimeout(function() {location.reload()}, 1000)
} 

function excluirObjetivo(idparaApagar) {
    console.log('Init to delete: ', idparaApagar)
    var objetivo = { _id: idparaApagar }
    $.post('/deletaObj', objetivo)
    console.log('Trying to delete: ', objetivo)
    setTimeout(function() {location.reload()}, 1000)
}