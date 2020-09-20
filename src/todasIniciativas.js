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
    var a = `
    
        <div class="col-md-12 col-lg-6 align-content-stretch teste" id="${iniciativas._id}" data-value="id="${iniciativas._id}">
            
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
                        <strong>Criação: </strong>${dataCriacaoAjustada}
                        <div>
                            <div class="col-sm">
                                <strong>Descrição: </strong>
                                <div id="desc_${iniciativas._id}">${iniciativas.iniDesc}</div>
                            </div>
                            <div class="col-sm">
                                <strong>Motivação: </strong>
                                <div id="motv_${iniciativas._id}">${iniciativas.iniMot}</div>
                            </div>
                            <div class="col-sm">
                                <strong>Riscos: </strong>
                                <div id="risc_${iniciativas._id}">${iniciativas.iniRisk}</div>
                            </div>
                        </div>
                        
                        <i style="display: none">
                            <strong>ID Iniciativa: </strong>${iniciativas._id}<br>
                            <strong>ID Usuário: </strong>${iniciativas.userID}<br>
                        </i>
                        <div class="row">
                            <div class="col bg-danger botao">
                                <a  href="#!" 
                                    onclick="javascript: excluirIniciativa('${iniciativas._id}')" 
                                    class="text-white"
                                    style="text-decoration: none;"
                                >
                                    <span class="fas">
                                        &#xf12d;&nbsp;<strong>Excluir</strong>
                                    </span>
                                </a>
                            </div>
                            <div class="col bg-success botao">
                                <a  href="#!" 
                                    class="text-white" 
                                    onclick="javascript: concluir('${iniciativas._id}', 'Iniciativa')"
                                    style="text-decoration: none;"
                                >
                                    <span class="fas">
                                        &#xf00c;&nbsp;<strong>Concluído</strong>
                                    </span>
                                </a>
                            </div>
                            <div class="col bg-warning botao">
                                <a  href="#!"
                                    onclick="javascript: alterarStatus('${iniciativas._id}', 'Iniciativa')"
                                    style="text-decoration: none; color: black;"
                                >
                                    <span class="fas">
                                        &#xf071;&nbsp;<strong>Alterar Status</strong>
                                    </span>
                                </a>
                            </div>
                            <div class="col bg-warning botao">
                                <a  href="#!" 
                                    onclick="javascript: alterarPrazo('${iniciativas._id}', 'Iniciativa')"
                                    style="text-decoration: none; color: black;"
                                >
                                    <span class="fas">
                                        &#xf2f2;&nbsp;<strong>Alterar Prazo</strong>
                                    </span>
                                </a>
                            </div>
                            <div class="row bg-dark botao">
                                <a  href="#!" 
                                    class="text-white" 
                                    onclick="javascript: alterarDetalhe('${iniciativas._id}', 'Iniciativa')"
                                    style="text-decoration: none;"
                                >
                                    <span class="fas">
                                        &#xf044;&nbsp;<strong>Editar Descrição / Motivos / Riscos</strong>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="row text-danger" id="novoPrazoDiv_${iniciativas._id}"></div> 
                        <div class="row text-danger" id="novoStatusDiv_${iniciativas._id}"></div>
                        <div class="row text-danger" id="novoEdit_${iniciativas._id}"></div> 
                    </p>
                </div>                
            </div>
        </div>

        <script>  
            var valorStat = document.getElementById("Stat-${iniciativas.iniStat}").getAttribute("data-value");
            var id = document.getElementById('bola-${iniciativas._id}')
            colorirStatus(valorStat, id)
        </script>



    `

    if(iniciativas.iniStat == '3 - Concluído' || iniciativas.iniStat == '4 - Cancelado') {
        $("#IniCompl").append(a)    
    } else {
        $("#Ini").append(a)
    }
}