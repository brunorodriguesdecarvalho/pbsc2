function getObjetivos() {
    $.get(
        '/Objetivos',
        (Objetivos) => { Objetivos.forEach(listarObjetivos) }
    )
}

getObjetivos()

function listarObjetivos(Objetivos){
    $("#Obj").append(`
    
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 align-content-stretch teste" id="${Objetivos._id}" data-value="id="${Objetivos._id}">

                <div class="card mt-2">

                    <div class="card-header pl-2 pr-0 text-dark">
                        <div class="d-flex flex-row align-items-center">
                            <div class="align-middle">
                                <div class="bola text-white font-weight-bold" id="bola-${Objetivos._id}">
                                    <i class='fas'>&#xf134;</i>
                                </div>
                            </div>
                            <div class="pl-2 pr-2">
                                <h3><div id="tituloObjetivo">${Objetivos.objNome}</div></h3>
                            </div>
                            <div class="px-2 d-flex" id="mostrador-${Objetivos._id}">
                                <a 
                                    href="#!" 
                                    onclick="expandir('cardBody${Objetivos._id}', 'encolhemais${Objetivos._id}', 'encolhemenos${Objetivos._id}')" 
                                    id="encolhemenos${Objetivos._id}" 
                                    style="display:none"
                                >
                                    <i class='fas text-dark'>&#xf068;</i>
                                </a>
                                <a 
                                    href="#!" 
                                    onclick="expandir('cardBody${Objetivos._id}', 'encolhemais${Objetivos._id}', 'encolhemenos${Objetivos._id}')"
                                    id="encolhemais${Objetivos._id}" 
                                    style="display:block"
                                >
                                    <i class='fas text-dark'>&#xf067;</i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-body cartao pb-0" style="display:none" id="cardBody${Objetivos._id}">
                        <p id="Stat-${Objetivos.objStat}" data-value="${Objetivos.objStat}">
                            <strong>Status: </strong>${Objetivos.objStat}<br>
                            <strong>Prazo: </strong>${Objetivos.objDataFim}<br>
                            <strong>Criação: </strong>${Objetivos.objDataCria}<br>
                            <strong>Descrição: </strong>${Objetivos.objDesc}<br>
                            <strong>Motivação: </strong>${Objetivos.objMot}<br>
                            <strong>Riscos: </strong>${Objetivos.objRisk}<br>
                            
                            <i style="display: none">
                                <strong>ID Objetivo: </strong>${Objetivos._id}<br>
                                <strong>ID Usuário: </strong>${Objetivos.userID}<br>
                            </i>

                            

                            <a  href="#!" 
                                onclick="javascript: excluirObjetivo('${Objetivos._id}')" 
                                class="bg-danger text-white botao"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf12d;&nbsp;<strong>Excluir</strong>
                                </span>
                            </a>
                            
                            <a  href="#!" 
                                onclick="javascript: andarObjetivo('${Objetivos._id}')" 
                                class="bg-success text-white botao"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf04b;&nbsp;<strong>Iniciar</strong>
                                </span>
                            </a>

                            <a  href="#!" 
                                onclick="javascript: concluirObjetivo('${Objetivos._id}')" 
                                class="bg-primary text-white botao"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf058;&nbsp;<strong>Concluir</strong>
                                </span>
                            </a>

                            <a  href="#!" 
                                class="bg-dark text-white botao" 
                                onclick="javascript: editar()"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf044;&nbsp;<strong>Editar</strong>
                                </span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>

    <script>  
    
        function editar() {
            alert('oi')
        }



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

        function expandir(cartao, mais, menos) {
            var cartao = document.getElementById(cartao);
            var mais = document.getElementById(mais);
            var menos = document.getElementById(menos);
            if (cartao.style.display === "none") {
                cartao.style.display = "block"
                menos.style.display = "block"
                mais.style.display = "none"
            }
            else {
                cartao.style.display = "none"
                menos.style.display = "none"
                mais.style.display = "block"
            }
        };

    </script>

    
   
    `)
}