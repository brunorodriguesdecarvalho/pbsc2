function alterarStatus(ID, tipoItem) {
    const chaveDiv = "novoStatusDiv_" + ID
    const chaveInput = "novoStatusInput_" + ID
    console.log("tipo do item: " + tipoItem)
    document.getElementById(chaveDiv).innerHTML = `
        <div class="row py-2 align-items-center">
            <div class="col text-center"> 
                <strong>Novo Status:</strong>
            </div>
            <div class="col">
                <select id="${chaveInput}">
                    <option>-1: Urgente</option>
                    <option>0 - Atrasado</option>
                    <option>1 - Não Iniciado</option>
                    <option>2 - Em Andamento</option>
                    <option>3 - Concluído</option>
                    <option>4 - Cancelado</option>
                </select>
            </div> 
            <div class="col">
                <button onclick="gravarNovoStatus('${ID}', '${chaveInput}', '${tipoItem}')">Alterar!</button>
            </div>
        </div>
    `
}

function gravarNovoStatus(chaveItem, chaveStatus, tipoItem){
    console.log("chave Status: " + chaveStatus)
    console.log("chegou para gavar: " + tipoItem)
    var novoStatus = $("#"+chaveStatus).val()
    console.log("ID do item:" + chaveItem + ". Novo status: " + novoStatus + ".")
    if (tipoItem == 'Atividade') {
        var atividades = {
            _id : chaveItem,
            ativStat : novoStatus
        }
        $.post('/atividades/alterarStatus', atividades)
        alert("Alterando status, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    } else if (tipoItem == 'Iniciativa') {
        var iniciativas = {
            _id : chaveItem,
            iniStat : novoStatus
        }
        $.post('/iniciativas/alterarStatus', iniciativas)
        alert("Alterando status, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    } else if (tipoItem == 'Objetivo') {
        var objetivos = {
            _id : chaveItem,
            objStat : novoStatus
        }
        $.post('/objetivos/alterarStatus', objetivos)
        alert("Alterando status, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    } else {
        alert("Alguma coisa deu errado..")
    }
}
