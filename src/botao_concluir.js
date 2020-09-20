var reloadTempo = 4000

function concluir(ID, tipoItem) {
    console.log('Iniciando processo para apagar item do tipo '+tipoItem+', com este ID: ', ID)
    if(tipoItem == 'Atividade') {
        var atividade = { _id: ID }
        $.post('/concluiAtiv', atividade)
        setTimeout(function() {location.reload()}, reloadTempo)
    } else if (tipoItem == 'Iniciativa') {
        var iniciativa = { _id: ID }
        $.post('/concluiIni', iniciativa)
        setTimeout(function() {location.reload()}, reloadTempo)
    } else if (tipoItem == 'Objetivo') {
        var objetivo = { _id: ID }
        $.post('/concluiObj', objetivo)
        setTimeout(function() {location.reload()}, reloadTempo)
    } else {
        alert('Algo deu errado...')
    }
}