function getObjetivos() {
    $.get(
        '/objetivos',
        (objetivos) => { 
            var qtd = Object.keys(objetivos).length
            if (qtd == 0) {
                console.log("sem registros")
                $("#Obj").append(`
                    <div class="mx-auto">
                    <br>
                    <p style="font-weight:bold">Você ainda não criou nenhum objetivo...</p>
                        <img 
                            src="../img/startup-vector-free-icon-set-14.png" 
                            style="width:200px;"
                            class="m-auto d-block"
                        >
                        <br>
                        <div class="text-center my-4">
                            <a href="/obj/nova" class="botao p-3 bg-primary rounded text-white">Criar Objetivo</a>
                        </div>
                    </div>
                `)
            } else { console.log("Qtd de registros: ", qtd)}
            objetivos.forEach(listarObjetivos) }
    )
}

getObjetivos()

function listarObjetivos(objetivos){
    var id = `${objetivos._id}`;
    var dataPrazoAjustada = transformarDataString(objetivos.objDataFim)
    var dataCriacaoAjustada = transformarDataString(objetivos.objDataCria) 
    
    var a = `

        <div class="col-md-12 col-lg-6 align-content-stretch teste" id="${objetivos._id}" data-value="id="${objetivos._id}">
                    
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
                                    <div class="bola font-weight-bold" id="bola-${objetivos._id}">
                                        <span class='fas text-white'>&#xf134;</span>
                                    </div>
                                </div>
                                
                                <!-- título principal do cartão -->
                                <div class="pl-2 pr-2">
                                    <h3>
                                        <div class="d-flex pr-1 align-items-center" id="tituloObjetivo">
                                            <span class="pr-3">${objetivos.objNome}</span>
                                            <div class="d-flex" id="mostrador-${objetivos._id}">
                                                <a 
                                                    href="#!" 
                                                    onclick="expandir('cardBody${objetivos._id}', 'encolhemais${objetivos._id}', 'encolhemenos${objetivos._id}')" 
                                                    id="encolhemenos${objetivos._id}" 
                                                    style="display:none"
                                                >
                                                    <span class='fas text-dark'>&#xf056;</span>
                                                </a> 
                                                <a 
                                                    href="#!" 
                                                    onclick="expandir('cardBody${objetivos._id}', 'encolhemais${objetivos._id}', 'encolhemenos${objetivos._id}')"
                                                    id="encolhemais${objetivos._id}" 
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
                
                    <div class="card-body cartao pb-0" style="display:none" id="cardBody${objetivos._id}">
                        <p id="Stat-${objetivos.objStat}" data-value="${objetivos.objStat}">
                            <strong>Status: </strong>${objetivos.objStat}<br>
                            <strong>Prazo: </strong>${dataPrazoAjustada}<br>
                            <strong>Criação: </strong>${dataCriacaoAjustada}
                            <div>
                                <div class="col-sm">
                                    <strong>Descrição: </strong>
                                    <div id="desc_${objetivos._id}">${objetivos.objDesc}</div>
                                </div>
                                <div class="col-sm">
                                    <strong>Motivação: </strong>
                                    <div id="motv_${objetivos._id}">${objetivos.objMot}</div>
                                </div>
                                <div class="col-sm">
                                    <strong>Riscos: </strong>
                                    <div id="risc_${objetivos._id}">${objetivos.objRisk}</div>
                                </div>
                            </div>
                            <br>
                            <i style="display: none">
                                <strong>ID Objetivo: </strong>${objetivos._id}<br>
                                <strong>ID Usuário: </strong>${objetivos.userID}<br>
                            </i>
                            
                            <div class="row">
                                <div class="col bg-danger botao">
                                    <a  href="#!" 
                                        onclick="javascript: excluirObjetivo('${objetivos._id}')" 
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
                                        onclick="javascript: concluir('${objetivos._id}', 'Objetivo')"
                                        style="text-decoration: none;"
                                    >
                                        <span class="fas">
                                            &#xf00c;&nbsp;<strong>Concluído</strong>
                                        </span>
                                    </a>
                                </div>
                                <div class="col bg-warning botao">
                                    <a  href="#!"
                                        onclick="javascript: alterarStatus('${objetivos._id}', 'Objetivo')"
                                        style="text-decoration: none; color: black;"
                                    >
                                        <span class="fas"> 
                                            &#xf071;&nbsp;<strong>Alterar Status</strong>
                                        </span>
                                    </a>
                                </div>
                                <div class="col bg-warning botao">
                                    <a  href="#!"
                                        onclick="javascript: alterarPrazo('${objetivos._id}', 'Objetivo')"
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
                                        onclick="javascript: alterarDetalhe('${objetivos._id}', 'Objetivo')"
                                        style="text-decoration: none;"
                                    >
                                        <span class="fas">
                                            &#xf044;&nbsp;<strong>Editar Descrição / Motivos / Riscos</strong>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="row text-danger" id="novoPrazoDiv_${objetivos._id}"></div> 
                            <div class="row text-danger" id="novoStatusDiv_${objetivos._id}"></div>  
                            <div class="row text-danger" id="novoEdit_${objetivos._id}"></div> 
                        </p>
                    </div>
                </div>
            </div>    
        </div>
    </div>

    <script>  
        var valorStat = document.getElementById("Stat-${objetivos.objStat}").getAttribute("data-value");
        var id = document.getElementById('bola-${objetivos._id}')
        colorirStatus(valorStat, id)
    </script>

    
    `

    if(objetivos.objStat == '3 - Concluído' || objetivos.objStat == '4 - Cancelado') {
        $("#ObjCompl").append(a)    
    } else {
        $("#Obj").append(a)
    }
}