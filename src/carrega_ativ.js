function listarAtividades(atividades){
    $("#Ativ").append(`
        <ul class="item">
            <li><div class="linha">
                <div id="bola-${atividades._id}" class="celula" style="
                    border: none; 
                    height: 28px; 
                    width: 28px; 
                    border-radius:30px;
                    vertical-align: middle;
                ">
                    
                </div>
                <div class="celula" style="
                    vertical-align: middle;
                    font-size: 28px; 
                    font-weight: bold;
                    margin-block-start: 0em;
                    margin-block-end: 0em;">
                    ${atividades.ativNome}
                </div>
            </div></li>   
            <li><strong>Iniciativa associada: </strong>${atividades.ativIni}</li>
            <li id="Stat-${atividades.ativStat}" data-value="${atividades.ativStat}">
                <strong>Status atual: </strong>${atividades.ativStat}
            </li>
            <li><strong>Prazo: </strong>${atividades.ativDataFim}</li>
            <li><strong>Descrição: </strong>${atividades.ativDesc}</li>
            <li><strong>Motivo(s): </strong>${atividades.ativMot}</li>
            <li><strong>Risco(s): </strong>${atividades.ativRisk}</li>
            <li>Início: ${atividades.ativDataCria}</li>
            <br>
            <li>
                <a href="#" onclick="javascript: excluirAtividade('${atividades._id}')">
                    <i class="material-icons" style="font-size: 31px">&#xe92b;</i>
                    <strong>Excluir</strong>
                </a> 
                <a href="#" onclick="javascript: concluirAtividade('${atividades._id}')">
                    <span class="fas" style="font-size: 24px">&#xf058;</span>
                    <strong>Concluir</strong>
                </a>
                <a href="#" onclick="javascript: andarAtividade('${atividades._id}')">
                    <span class="fas" style="font-size: 24px">&#xf04b;</span>
                    <strong>Iniciar</strong>
                </a>
                <a href="./edit_ativ.html" onclick="javascript: editarAtividade('${atividades._id}')">
                    <span class="fas" style="font-size: 24px">&#xf04b;</span>
                    <strong>Editar</strong>
                </a>
            </li>
        </ul>
        <br>
    `)
}

listarAtividades()