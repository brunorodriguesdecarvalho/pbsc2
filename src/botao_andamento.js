var reloadTempo = 4000

function andarAtividade(idparaApagar) {
    console.log('Init to ongoing: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    $.post('/andarAtiv', atividade)
    console.log('Trying to ongoing: ', atividade)
    setTimeout(function() {location.reload()}, reloadTempo)
}

function andarIniciativa(idparaApagar) {
    console.log('Init to ongoing: ', idparaApagar)
    var iniciativa = { _id: idparaApagar }
    $.post('/andarIni', iniciativa)
    console.log('Trying to ongoing: ', iniciativa)
    setTimeout(function() {location.reload()}, reloadTempo)
}

function andarObjetivo(idparaApagar) {
    console.log('Init to ongoing: ', idparaApagar)
    var objetivo = { _id: idparaApagar }
    $.post('/andarObj', objetivo)
    console.log('Trying to ongoing: ', objetivo)
    setTimeout(function() {location.reload()}, reloadTempo)
}