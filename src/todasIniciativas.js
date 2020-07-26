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

    var dataPrazoAjustada = transformarDataString(iniciativas.iniDataFim)
    var dataCriacaoAjustada = transformarDataString(iniciativas.iniDataCria) 
    

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
                            <strong>Prazo: </strong>${dataPrazoAjustada}<br>
                            <strong>Criação: </strong>${dataCriacaoAjustada}<br>
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

            var valorStat = document.getElementById("Stat-${iniciativas.iniStat}").getAttribute("data-value");
            var id = document.getElementById('bola-${iniciativas._id}')
            colorirStatus(valorStat, id)

        </script>

    
   
    `)
}