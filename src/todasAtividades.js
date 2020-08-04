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

    $("#Ativ").append(`
    
            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 align-content-stretch teste" id="${atividades._id}" data-value="id="${atividades._id}">
                
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
                            <strong>Criação: </strong>${dataCriacaoAjustada}<br>
                            <strong>Descrição: </strong>${atividades.ativDesc}<br>
                            <strong>Motivação: </strong>${atividades.ativMot}<br>
                            <strong>Riscos: </strong>${atividades.ativRisk}<br>
                            
                            <i style="display: none">
                                <strong>ID Atividade: </strong>${atividades._id}<br>
                                <strong>ID Usuário: </strong>${atividades.userID}<br>
                            </i>

                            

                            <a  href="#!" 
                                onclick="javascript: excluirAtividade('${atividades._id}')" 
                                class="bg-danger text-white botao"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf12d;&nbsp;<strong>Excluir</strong>
                                </span>
                            </a>
                            
                            <a  href="#!" 
                                onclick="javascript: andarAtividade('${atividades._id}')" 
                                class="bg-success text-white botao"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf04b;&nbsp;<strong>Iniciar</strong>
                                </span>
                            </a>

                            <a  href="#!" 
                                onclick="javascript: concluirAtividade('${atividades._id}')" 
                                class="bg-primary text-white botao"
                                style="text-decoration: none;"
                            >
                                <span class="fas">
                                    &#xf058;&nbsp;<strong>Concluir</strong>
                                </span>
                            </a>

                            <a  href="#!" 
                                class="bg-dark text-white botao" 
                                onclick="javascript: editar('${atividades._id}')"
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
    
                var valorStat = document.getElementById("Stat-${atividades.ativStat}").getAttribute("data-value");
                var id = document.getElementById('bola-${atividades._id}')
                colorirStatus(valorStat, id)
    
            </script>
    `)


}