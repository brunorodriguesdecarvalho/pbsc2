function getIniciativas() {
    $.get(
        '/iniciativas',
        (iniciativas) => { 
            var qtd = Object.keys(iniciativas).length
            if (qtd == 0) {
                console.log("sem registros")
                $("#Ini").append(`
                    <div class="mx-auto">
                    <br>
                    <p style="font-weight:bold">Você ainda não criou nenhuma iniciativa...</p>
                        <img 
                            src="../img/startup-vector-free-icon-set-14.png" 
                            style="width:200px;"
                            class="m-auto d-block"
                        >
                        <br>
                        <div class="text-center my-4">
                            <a href="/ini/nova" class="botao p-3 bg-primary rounded text-white">Criar Iniciativa</a>
                        </div>
                    </div>
                `)
            } else { console.log("Qtd de registros: ", qtd)}
            iniciativas.forEach(listarIniciativas) }
    )
}

getIniciativas()

function listarIniciativas(iniciativas){
    var id = `${iniciativas._id}`;
    

    $("#Ini").append(`
    
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 align-content-stretch teste" id="${iniciativas._id}" data-value="id="${iniciativas._id}">
                
                <!-- início do cartão -->
                <div class="card mt-2">

                <!-- início do header do cartão -->
                    <div class="card-header px-2 ">
                        
                        <!-- início do grupo do título do cartão -->

                        <div>

                            <!-- início do grupo do título do cartão -->
                            <div class="d-flex align-items-center">
                                <div class="d-flex">
                                    <div class="d-flex>
                                        <!-- início da bola do status do título do cartão -->
                                        <div class="bola font-weight-bold" id="bola-${iniciativas._id}">
                                            <span class='fas text-white'>&#xf134;</span>
                                        </div>
                                    </div>
                                    
                                    <!-- título principal do cartão -->
                                    <div class="pl-2 pr-2">
                                        <h3>
                                            <div class="d-flex pr-1 align-items-center" id="tituloIniciativa">
                                                <span class="pr-3">${iniciativas.iniNome}</span>
                                                <div class="d-flex" id="mostrador-${iniciativas._id}">
                                                    <a 
                                                        href="#!" 
                                                        onclick="expandir('cardBody${iniciativas._id}', 'encolhemais${iniciativas._id}', 'encolhemenos${iniciativas._id}')" 
                                                        id="encolhemenos${iniciativas._id}" 
                                                        style="display:none"
                                                    >
                                                        <span class='fas text-dark'>&#xf056;</span>
                                                    </a> 
                                                    <a 
                                                        href="#!" 
                                                        onclick="expandir('cardBody${iniciativas._id}', 'encolhemais${iniciativas._id}', 'encolhemenos${iniciativas._id}')"
                                                        id="encolhemais${iniciativas._id}" 
                                                        style="display:block"
                                                    >
                                                        <span class='fas text-dark'>&#xf055;</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body cartao pb-0" style="display:none" id="cardBody${iniciativas._id}">
                        <p id="Stat-${iniciativas.iniStat}" data-value="${iniciativas.iniStat}">
                            <strong>Status: </strong>${iniciativas.iniStat}<br>
                            <strong>Objetivo Associado: </strong>${iniciativas.iniObj}<br>
                            <strong>Prazo: </strong>${iniciativas.iniDataFim}<br>
                            <strong>Criação: </strong>${iniciativas.iniDataCria}<br>
                            <strong>Descrição: </strong>${iniciativas.iniDesc}<br>
                            <strong>Motivação: </strong>${iniciativas.iniMot}<br>
                            <strong>Riscos: </strong>${iniciativas.iniRisk}<br>
                            
                            <i style="display: none">
                                <strong>ID Iniciativa: </strong>${iniciativas._id}<br>
                                <strong>ID Usuário: </strong>${iniciativas.userID}<br>
                            </i>

                            

                            <a  href="#!" 
                                onclick="javascript: excluirIniciativa('${iniciativas._id}')" 
                                class="bg-danger text-white botao"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf12d;&nbsp;<strong>Excluir</strong>
                                </span>
                            </a>
                            
                            <a  href="#!" 
                                onclick="javascript: andarIniciativa('${iniciativas._id}')" 
                                class="bg-success text-white botao"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf04b;&nbsp;<strong>Iniciar</strong>
                                </span>
                            </a>

                            <a  href="#!" 
                                onclick="javascript: concluirIniciativa('${iniciativas._id}')" 
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
            </div>

    <script>  
    
        function editar() {
            alert('Função em desenvolvimento. Por enquanto você precisa excluir a iniciativa e digitar tudo de novo.')
        }

        function colorirStatus() {
            var valorStat = document.getElementById("Stat-${iniciativas.iniStat}").getAttribute("data-value");
            if (valorStat == "-1: Urgente") {
                document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#FF0002';
                document.getElementById('bola-${iniciativas._id}').innerHTML="<i class='fas text-white'>&#xf794;</i>";
            }
            else if (valorStat == "0 - Atrasado") {
                document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#FFC500';
                document.getElementById('bola-${iniciativas._id}').innerHTML="<i class='fas text-dark'>&#xf4be;</i>";
            }
            else if (valorStat == "1 - Não Iniciado") {
                document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#808080';
                document.getElementById('bola-${iniciativas._id}').innerHTML="<i class='fas text-white'>&#xf251;</i>";
            }
            else if (valorStat == "2 - Em Andamento") {
                document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#12A802';
                document.getElementById('bola-${iniciativas._id}').innerHTML="<i class='fas text-white'>&#xf252;</i>";
            }
            else if(valorStat == "3 - Concluído") {
                document.getElementById('bola-${iniciativas._id}').style.backgroundColor='#0B00FF';
                document.getElementById('bola-${iniciativas._id}').innerHTML="<i class='fas text-white'>&#xf253;</i>";
            }
        };
        colorirStatus()

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