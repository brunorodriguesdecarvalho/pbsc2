function alterarPrazo(ID, tipoItem) {
    const chaveDiv = "novoPrazoDiv_" + ID
    const chaveInput = "novoPrazoInput_" + ID
    console.log("tipo do item: " + tipoItem)
    document.getElementById(chaveDiv).innerHTML = `
        <div class="row">
            <div class="col"> 
                <strong>Novo Prazo:</strong>
            </div>
            <div class="col">
                <input type='datetime-local' id=${chaveInput}>
            </div>
            <div class="col">
                <button onclick="gravarNovoPrazo('${ID}', '${chaveInput}', '${tipoItem}')">Alterar!</button>
            </div>
        </div>
    `
}

function gravarNovoPrazo(ID, chaveData, tipoItem){
    console.log("chave Data: " + chaveData)
    console.log("chegou para gavar: " + tipoItem)
    var novaData = $("#"+chaveData).val()
    var prazoAjustado  = ajustaDataBr(novaData)
    console.log("ID do item:" + ID + ". Nova prazo ajustado: " + prazoAjustado + ".")
    if (tipoItem == 'Atividade') {
        console.log("entrou no if do atividade")
        var atividades = {
            _id : ID,
            ativDataFim : prazoAjustado
        }
        $.post('/atividades/alterarPrazo', atividades)
        alert("Alterando prazo, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    } else if (tipoItem == 'Iniciativa') {
        console.log("entrou no if da iniciativa")
        var iniciativas = {
            _id : ID,
            iniDataFim : prazoAjustado
        }
        $.post('/iniciativas/alterarPrazo', iniciativas)
        alert("Alterando prazo, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    }  else if (tipoItem == 'Objetivo') {
        console.log("entrou no if do objetivo")
        var objetivos = {
            _id : ID,
            objDataFim : prazoAjustado
        }
        $.post('/objetivos/alterarPrazo', objetivos)
        alert("Alterando prazo, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    } else {
        alert("Alguma coisa deu errado..")
    }
}