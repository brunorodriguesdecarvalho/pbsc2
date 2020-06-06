function editar(idedit, userID) {
    alert('Por favor aguarde...')
    var atividade = { _id: idedit, userID: userID}
    $.post('/ativ/edit', atividade) 
   //setTimeout(function() {location.replace("/ativ/edit")}, 1000)
}