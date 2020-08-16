function alterarPrazo(idAtividade) {
    const chaveDiv = "novoPrazoDiv_" + idAtividade
    const chaveInput = "novoPrazoInput_" + idAtividade
    document.getElementById(chaveDiv).innerHTML = `
        <div class="row">
            <div class="col"> 
                <strong>Novo Prazo:</strong>
            </div>
            <div class="col">
                <input type='datetime-local' id=${chaveInput}>
            </div>
            <div class="col">
                <button onclick="gravarNovoPrazo('${idAtividade}', '${chaveInput}')">Alterar!</button>
            </div>
        </div>
    `
}

function gravarNovoPrazo(chaveAtividade, chaveData){
    console.log("chave Data: " + chaveData)
    var novaData = $("#"+chaveData).val()
    var prazoAjustado  = ajustaDataBr(novaData)
    console.log("ID da atividade:" + chaveAtividade + ". Nova prazo ajustado: " + prazoAjustado + ".")
    var atividades = {
        _id : chaveAtividade,
        ativDataFim : prazoAjustado
    }
    alterarPrazoAtividade(atividades)
}

function alterarPrazoAtividade(atividades) {
    $.post('/atividades/alterarPrazo', atividades)
    alert("Alterando prazo, por favor aguarde...")
    setTimeout(function() {location.reload()}, 4000)
}