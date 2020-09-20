function alterarDetalhe(ID, tipoItem) {
    const chaveDiv = "novoEdit_" + ID
    const desc = document.getElementById("desc_" + ID).innerHTML
    const motv = document.getElementById("motv_" + ID).innerHTML
    const risc = document.getElementById("risc_" + ID).innerHTML
    console.log("tipo do item: " + tipoItem)
    document.getElementById(chaveDiv).innerHTML = `
        <div class="col">
            <div class="row">
                <div class="py-2 bg-white font-weight-bold">Descrição</div>
                <textarea id="Desc_${ID}" style="width: 100%; height: 15vh;">${desc}</textarea>
            </div>
            <div class="row">
                <div class="py-2 bg-white font-weight-bold">Motivação</div>
                <textarea id="Mot_${ID}" style="width: 100%; height: 15vh;">${motv}</textarea>
            </div>
            <div class="row">
                <div class="py-2 bg-white font-weight-bold">Riscos</div>
                <textarea id="Risk_${ID}" style="width: 100%; height: 15vh;">${risc}</textarea> 
            </div>
            <div class="row">
                <button onclick="gravarNovosDetalhes('${ID}', '${tipoItem}', 'Desc_${ID}', 'Mot_${ID}', 'Risk_${ID}')">
                    Gravar Alterações!
                </button>
            </div>
        </div>
    `
}

function gravarNovosDetalhes(ID, tipoItem, desc, motv, risc){
    const descricao = $("#"+desc).val()
    const motivo = $("#"+motv).val()
    const risco = $("#"+risc).val()
    console.log("chegou para gavar: " + tipoItem)
    console.log("ID para alterar: " + ID)
    console.log("Nova descrição: " + descricao + ".")
    console.log("Novo motivo: " + motivo + ".")
    console.log("Novo risco: " + risco + ".")
    if (tipoItem == 'Atividade') {
        console.log("entrou no if do atividade")
        var atividades = {
            _id : ID,
            ativDesc : descricao,
            ativMot : motivo,
            ativRisk : risco
        }
        $.post('/atividades/alterarDetalhes', atividades)
        alert("Alterando detalhes, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    } else if (tipoItem == 'Iniciativa') {
        console.log("entrou no if da iniciativa")
        var iniciativas = {
            _id : ID,
            iniDesc : descricao,
            iniMot : motivo,
            iniRisk : risco
        }
        $.post('/iniciativas/alterarDetalhes', iniciativas)
        alert("Alterando detalhes, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    }  else if (tipoItem == 'Objetivo') {
        console.log("entrou no if do objetivo")
        var objetivos = {
            _id : ID,
            objDesc : descricao,
            objMot : motivo,
            objRisk : risco
        }
        $.post('/objetivos/alterarDetalhes', objetivos)
        alert("Alterando detalhes, por favor aguarde...")
        setTimeout(function() {location.reload()}, 4000)
    } else {
        alert("Alguma coisa deu errado..")
    }
}