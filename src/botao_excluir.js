var reloadTempo = 4000

function excluirAtividade(idparaApagar) {
    console.log('Pedido para apagar este item: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    function check() {
        if (confirm("Tem certeza que deseja apagar?!")) {
          $.post('/deletaAtiv', atividade)
          console.log('Confirmação para apagar recebida com sucesso para o item:  ', atividade)
          window.alert('Apagando item. Por favor aguarde.')
          setTimeout(function() {location.reload()}, reloadTempo)
        } else {
          next;
        }
      }
    check()
}

function excluirIniciativa(idparaApagar) {
    console.log('Pedido para apagar este item: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    function check() {
        if (confirm("Tem certeza que deseja apagar?!")) {
          $.post('/deletaIni', iniciativa)
          console.log('Confirmação para apagar recebida com sucesso para o item:  ', iniciativa)
          window.alert('Apagando item. Por favor aguarde.')
          setTimeout(function() {location.reload()}, reloadTempo)
        } else {
          next;
        }
      }
    check()
}

function excluirObjetivo(idparaApagar) {
    console.log('Pedido para apagar este item: ', idparaApagar)
    var atividade = { _id: idparaApagar }
    function check() {
        if (confirm("Tem certeza que deseja apagar?!")) {
          $.post('/deletaObj', objetivo)
          console.log('Confirmação para apagar recebida com sucesso para o item:  ', objetivo)
          window.alert('Apagando item. Por favor aguarde.')
          setTimeout(function() {location.reload()}, reloadTempo)
        } else {
          next;
        }
      }
    check()
}
