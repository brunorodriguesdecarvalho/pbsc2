function getAtividades() {
    $.get(
        '/atividades',
        (atividades) => { atividades.forEach(listarAtividades) }
    )
}

getAtividades()

function listarAtividades(atividades){
    $("#Ativ").append(`

            <div class="col-sm col-md-6 col-xl-4 align-content-stretch">

                <div class="card mt-2">

                    <div class="card-header pl-2 pr-0">
                        <div class="d-flex flex-row">
                            <div class="align-middle">
                                <div class="bola text-white font-weight-bold" id="bola-${atividades._id}">
                                    <i class='fas'>&#xf134;</i>
                                </div>
                            </div>
                            <div class="pl-2 pr-2">
                                <h3><div id="tituloAtividade">${atividades.ativNome}</div></h3>
                            </div>
                            </div>
                    </div>
                    
                    <div class="card-body">
                        <p id="Stat-${atividades.ativStat}" data-value="${atividades.ativStat}">
                            <strong>Status: </strong>${atividades.ativStat}<br>
                            <strong>Iniciativa Associada: </strong>${atividades.ativIni}<br>
                            <strong>Prazo: </strong>${atividades.ativDataFim}<br>
                            <strong>Criação: </strong>${atividades.ativDataCria}<br>
                            <strong>Descrição: </strong>${atividades.ativDesc}<br>
                            <strong>Motivação: </strong>${atividades.ativMot}<br>
                            <strong>Riscos: </strong>${atividades.ativRisk}<br>
                            <i>
                                <strong>ID Atividade: </strong>${atividades._id}<br>
                                <strong>ID Usuário: </strong>${atividades.userID}
                            </i>
                        </p>
                    </div>
                </div>
            </div>

    <script>
        function hello() {
            var valorStat = document.getElementById("Stat-${atividades.ativStat}").getAttribute("data-value");
            if (valorStat == "-1: Urgente") {
                document.getElementById('bola-${atividades._id}').style.backgroundColor='#FF0002';
                document.getElementById('bola-${atividades._id}').innerHTML="<i class='fas'>&#xf794;</i>";
            }
            else if (valorStat == "0 - Atrasado") {
                document.getElementById('bola-${atividades._id}').style.backgroundColor='#FFC500';
                document.getElementById('bola-${atividades._id}').innerHTML="<i class='fas text-dark'>&#xf4be;</i>";
            }
            else if (valorStat == "1 - Não Iniciado") {
                document.getElementById('bola-${atividades._id}').style.backgroundColor='#808080';
                document.getElementById('bola-${atividades._id}').innerHTML="<i class='fas'>&#xf251;</i>";
            }
            else if (valorStat == "2 - Em Andamento") {
                document.getElementById('bola-${atividades._id}').style.backgroundColor='#12A802';
                document.getElementById('bola-${atividades._id}').innerHTML="<i class='fas'>&#xf252;</i>";
            }
            else if(valorStat == "3 - Concluído") {
                document.getElementById('bola-${atividades._id}').style.backgroundColor='#0B00FF';
                document.getElementById('bola-${atividades._id}').innerHTML="<i class='fas'>&#xf253;</i>";
            }
        };
        hello()
    </script>
   
    `)
}