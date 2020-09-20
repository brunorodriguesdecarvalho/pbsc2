function getAtividades() {
    $.get(
        '/atividades',
        (atividades) => { 
            var qtd = Object.keys(atividades).length
            if (qtd == 0) {
                console.log("sem registros")
                $("#Ativ").append(`
                    <div class="mx-auto">
                    <br>
                    <p style="font-weight:bold">Você ainda não criou nenhuma atividade...</p>
                        <img 
                            src="../img/startup-vector-free-icon-set-14.png" 
                            style="width:200px;"
                            class="m-auto d-block"
                        >
                        <br>
                        <div class="text-center my-4">
                            <a href="/ativ/nova" class="botao p-3 bg-primary rounded text-white">Criar Atividade</a>
                        </div>
                    </div>
                `)
            } else { 
                console.log("Qtd de registros: ", qtd)
                atividades.forEach(listarAtividades)
            }
        }
    )
} 

getAtividades()

function listarAtividades(atividades){  

    var dataPrazoAjustada = transformarDataString(atividades.ativDataFim)
    var dataCriacaoAjustada = transformarDataString(atividades.ativDataCria)    

    var a = `  
        <div class="col-md-12 col-lg-6 align-content-stretch teste" id="${atividades._id}" data-value="id="${atividades._id}">
            
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
                                    <div class="bola font-weight-bold" id="bola-${atividades._id}">
                                        <span class='fas text-white'>&#xf134;</span>
                                    </div>
                                </div>
                                
                                <!-- título principal do cartão -->
                                <div class="pl-2 pr-2">
                                    <h3>
                                        <div class="d-flex pr-1 align-items-center" id="tituloAtividade">
                                            <span class="pr-3">${atividades.ativNome}</span>
                                            <div class="d-flex" id="mostrador-${atividades._id}">
                                                <a 
                                                    href="#!" 
                                                    onclick="expandir('cardBody${atividades._id}', 'encolhemais${atividades._id}', 'encolhemenos${atividades._id}')" 
                                                    id="encolhemenos${atividades._id}" 
                                                    style="display:none"
                                                >
                                                    <span class='fas text-dark'>&#xf056;</span>
                                                </a> 
                                                <a 
                                                    href="#!" 
                                                    onclick="expandir('cardBody${atividades._id}', 'encolhemais${atividades._id}', 'encolhemenos${atividades._id}')"
                                                    id="encolhemais${atividades._id}" 
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

                    <div class="card-body cartao pb-0" style="display:none" id="cardBody${atividades._id}">
                        <p id="Stat-${atividades.ativStat}" data-value="${atividades.ativStat}">
                            <strong>Status: </strong>${atividades.ativStat}<br>
                            <strong>Iniciativa Associada: </strong>${atividades.ativIni}<br>
                            <strong>Prazo: </strong>${dataPrazoAjustada}<br>
                            <strong>Criação: </strong>${dataCriacaoAjustada}
                            <div>
                                <div class="col-sm">
                                    <strong>Descrição: </strong>
                                    <div id="desc_${atividades._id}">${atividades.ativDesc}</div>
                                </div>
                                <div class="col-sm">
                                    <strong>Motivação: </strong>
                                    <div id="motv_${atividades._id}">${atividades.ativMot}</div>
                                </div>
                                <div class="col-sm">
                                    <strong>Riscos: </strong>
                                    <div id="risc_${atividades._id}">${atividades.ativRisk}</div>
                                </div>
                            </div>
                            <br>
                            <i style="display: none">
                                <strong>ID Atividade: </strong>${atividades._id}<br>
                                <strong>ID Usuário: </strong>${atividades.userID}<br>
                            </i>

                            <div class="row">
                                <div class="col bg-danger botao">
                                    <a  href="#!" 
                                        onclick="javascript: excluirAtividade('${atividades._id}')" 
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
                                        onclick="javascript: concluir('${atividades._id}', 'Atividade')"
                                        style="text-decoration: none;"
                                    >
                                        <span class="fas">
                                            &#xf00c;&nbsp;<strong>Concluído</strong>
                                        </span>
                                    </a>
                                </div>
                                <div class="col bg-warning botao">
                                    <a  href="#!"  
                                        onclick="javascript: alterarStatus('${atividades._id}', 'Atividade')"
                                        style="text-decoration: none; color: black;"
                                    >
                                        <span class="fas">
                                            &#xf071;&nbsp;<strong>Alterar Status</strong>
                                        </span>
                                    </a>
                                </div>
                                <div class="col bg-warning botao">
                                    <a  href="#!"  
                                        onclick="javascript: alterarPrazo('${atividades._id}', 'Atividade')"
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
                                        onclick="javascript: alterarDetalhe('${atividades._id}', 'Atividade')"
                                        style="text-decoration: none;"
                                    >
                                        <span class="fas">
                                            &#xf044;&nbsp;<strong>Editar Descrição / Motivos / Riscos</strong>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="row text-danger" id="novoPrazoDiv_${atividades._id}"></div> 
                            <div class="row text-danger" id="novoStatusDiv_${atividades._id}"></div>
                            <div class="row text-danger" id="novoEdit_${atividades._id}"></div>  
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <script>  
            var valorStat = document.getElementById("Stat-${atividades.ativStat}").getAttribute("data-value");
            var id = document.getElementById('bola-${atividades._id}')
            colorirStatus(valorStat, id)
        </script>
    `
    
    if(atividades.ativStat == '3 - Concluído' || atividades.ativStat == '4 - Cancelado') {
        $("#AtivCompl").append(a)    
    } else {
        $("#Ativ").append(a)
    }
} 