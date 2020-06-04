function getObjetivos() {
    $.get(
        '/Objetivos',
        (Objetivos) => { Objetivos.forEach(listarObjetivos) }
    )
}

getObjetivos()

function listarObjetivos(Objetivos){
    $("#Obj").append(`

            <div class="col-sm col-md-6 col-xl-4 align-content-stretch">

                <div class="card mt-2">

                    <div class="card-header pl-2 pr-0">
                        <div class="d-flex flex-row align-items-center">
                            <div class="align-middle">
                                <div class="bola text-white font-weight-bold" id="bola-${Objetivos._id}">
                                    <i class='fas'>&#xf134;</i>
                                </div>
                            </div>
                            <div class="pl-2 pr-2">
                                <h3><div id="tituloAtividade">${Objetivos.objNome}</div></h3>
                            </div>
                            </div>
                    </div>
                    
                    <div class="card-body">
                        <p id="Stat-${Objetivos.objStat}" data-value="${Objetivos.objStat}">
                            <strong>Status: </strong>${Objetivos.objStat}<br>
                            <strong>Prazo: </strong>${Objetivos.objDataFim}<br>
                            <strong>Criação: </strong>${Objetivos.objDataIni}<br>
                            <strong>Descrição: </strong>${Objetivos.objDesc}<br>
                            <strong>Motivação: </strong>${Objetivos.objMot}<br>
                            <strong>Riscos: </strong>${Objetivos.objRisk}<br>
                            <i>
                                <strong>ID Atividade: </strong>${Objetivos._id}<br>
                                <strong>ID Usuário: </strong>${Objetivos.userID}
                            </i>
                        </p>
                    </div>
                </div>
            </div>

    <script>
        function hello() {
            var valorStat = document.getElementById("Stat-${Objetivos.objStat}").getAttribute("data-value");
            if (valorStat == "-1: Urgente") {
                document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#FF0002';
                document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas'>&#xf794;</i>";
            }
            else if (valorStat == "0 - Atrasado") {
                document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#FFC500';
                document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas text-dark'>&#xf4be;</i>";
            }
            else if (valorStat == "1 - Não Iniciado") {
                document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#808080';
                document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas'>&#xf251;</i>";
            }
            else if (valorStat == "2 - Em Andamento") {
                document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#12A802';
                document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas'>&#xf252;</i>";
            }
            else if(valorStat == "3 - Concluído") {
                document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#0B00FF';
                document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas'>&#xf253;</i>";
            }
        };
        hello()
    </script>
   
    `)
}