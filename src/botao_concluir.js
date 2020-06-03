function concluirAtividade(idparaApagar) {
    console.log('Init to complete: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    $.post('/concluiAtiv', atividade)
    console.log('Trying to complete: ', atividade)
    setTimeout(function() {location.reload()}, 5000)
}

function concluirIniciativa(idparaApagar) {
    console.log('Init to complete: ', idparaApagar)
    var iniciativa = { _id: idparaApagar }
    $.post('/concluiIni', iniciativa)
    console.log('Trying to complete: ', iniciativa)
    setTimeout(function() {location.reload()}, 5000)
}

function concluirObjetivo(idparaApagar) {
    console.log('Init to complete: ', idparaApagar)
    var objetivo = { _id: idparaApagar }
    $.post('/concluiObj', objetivo)
    console.log('Trying to complete: ', objetivo)
    setTimeout(function() {location.reload()}, 5000)
}