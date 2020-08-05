function getCorridas() {
    $.get(
        '/corridas',
        (corridas) => { 
            var qtd = Object.keys(corridas).length
            if (qtd == 0) {
                console.log("sem registros")
                $("#Run").append(`
                    <div class="mx-auto">
                    <br>
                    <p style="font-weight:bold">Você ainda não criou nenhuma corrida...</p>
                        <img 
                            src="../img/startup-vector-free-icon-set-14.png" 
                            style="width:200px;"
                            class="m-auto d-block"
                        >
                        <br>
                        <div class="text-center my-4">
                            <a href="/run/nova" class="botao p-3 bg-primary rounded text-white">Criar Corrida</a>
                        </div>
                    </div>
                `)
            } else { 
                console.log("Qtd de registros: ", qtd)
                corridas.forEach(listarCorridas)
            }
        }
    )
} 

getCorridas()

function listarCorridas(corridas){     
    for (let i=1; i<=(corridas.DistanciaTotal); i++){
        var KmAtual = "Km" + i
        if(corridas[KmAtual] === undefined) { corridas[KmAtual] = "n/a" }
    }

    function ajustaDataBr(dataParaTransformar) {
        var dataAno = dataParaTransformar.substr(0, 4)
        var dataMes = dataParaTransformar.substr(5, 2) - 1
        var dataDia = dataParaTransformar.substr(8, 2)
        var dataBR = new Date(dataAno, dataMes, dataDia)
        return dataBR.toLocaleDateString()
    }

    var dataCorrida = ajustaDataBr(corridas.DataCorridaOrigem)

    function transSegMin(SegParaTrans){
        
        var origem = SegParaTrans
        
        if(origem>0) {
            var minInt = Math.floor(origem/60)
            var minResto = origem - (minInt*60)

            if(minInt>59){
                Hora = Math.floor(minInt/60)
                var minIntResto = minInt - (Hora * 60)
                var StringMinSeg = Hora + "h" + minIntResto + "m" + minResto + "s."
            }else{
                var StringMinSeg = minInt + "m" + minResto + "s."
            }
            return StringMinSeg
        } else {return null} 
    }

    var TempoTotalCorrigido = transSegMin(corridas.TempoFinalS)
    var PaceCorrigido = transSegMin(corridas.PaceOrigem)
    var Km1 = transSegMin(corridas.Km1)
    var Km2 = transSegMin(corridas.Km2)
    var Km3 = transSegMin(corridas.Km3)
    var Km4 = transSegMin(corridas.Km4)
    var Km5= transSegMin(corridas.Km5)
    var Km6 = transSegMin(corridas.Km6)
    var Km7 = transSegMin(corridas.Km7)
    var Km8 = transSegMin(corridas.Km8)
    var Km9 = transSegMin(corridas.Km9)
    var Km10 = transSegMin(corridas.Km10)
    var Km11 = transSegMin(corridas.Km11)
    var Km12 = transSegMin(corridas.Km12)
    var Km13 = transSegMin(corridas.Km13)
    var Km14 = transSegMin(corridas.Km14)
    var Km15 = transSegMin(corridas.Km15)
    var Km16 = transSegMin(corridas.Km16)
    var Km17 = transSegMin(corridas.Km17)
    var Km18 = transSegMin(corridas.Km18)
    var Km19 = transSegMin(corridas.Km19)
    var Km20 = transSegMin(corridas.Km20)
    var Km21 = transSegMin(corridas.Km21)

    $("#Run").append(`
    
            <div class="col-sm-4 col-md-3 col-xl-2 align-content-stretch teste" id="${corridas._id}" data-value="id="${corridas._id}">
                
                <!-- início do cartão -->
                <div class="card mt-2">

                <!-- início do header do cartão -->
                    <div class="card-header px-2 ">
                        
                        <!-- início do grupo do título do cartão -->

                        <div>

                            <!-- início do grupo do título do cartão -->
                            <div class="d-flex align-items-center">
                                <div class="d-flex">                                    
                                    <!-- título principal do cartão -->
                                    <div class="pl-2 pr-2">
                                        <h3>
                                            <div class="d-flex pr-1 align-items-center" id="tituloAtividade">
                                                <span class="pr-3">${dataCorrida}</span>
                                                <div class="d-flex" id="mostrador-${corridas._id}">
                                                    <a 
                                                        href="#!" 
                                                        onclick="expandir('cardBody${corridas._id}', 'encolhemais${corridas._id}', 'encolhemenos${corridas._id}')" 
                                                        id="encolhemenos${corridas._id}" 
                                                        style="display:none"
                                                    >
                                                        <span class='fas text-dark'>&#xf056;</span>
                                                    </a> 
                                                    <a 
                                                        href="#!" 
                                                        onclick="expandir('cardBody${corridas._id}', 'encolhemais${corridas._id}', 'encolhemenos${corridas._id}')"
                                                        id="encolhemais${corridas._id}" 
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

                        <div class="card-body cartao pb-0" style="display:none" id="cardBody${corridas._id}">
                                <strong>Distância(Km): </strong>${corridas.DistanciaTotal}<br>
                                <strong>Tempo Total: </strong>${TempoTotalCorrigido}<br>
                                <strong>Pace Médio: </strong>${PaceCorrigido}<br>
                                <strong>Tempos Parciais:</strong>
                                <div id="Parciais style="padding-inline-start: 0px">
                                    <div>Km #1: ${Km1 || "Não registrado"}</div>
                                    <div>Km #2: ${Km2 || "Não registrado"}</div>
                                    <div>Km #3: ${Km3 || "Não registrado"}</div>
                                    <div>Km #4: ${Km4 || "Não registrado"}</div>
                                    <div>Km #5: ${Km5 || "Não registrado"}</div>
                                    <div>Km #6: ${Km6 || "Não registrado"}</div>
                                    <div>Km #7: ${Km7 || "Não registrado"}</div>
                                    <div>Km #8: ${Km8 || "Não registrado"}</div>
                                    <div>Km #9: ${Km9 || "Não registrado"}</div>
                                    <div>Km #10: ${Km10 || "Não registrado"}</div>
                                    <div>Km #11: ${Km11 || "Não registrado"}</div>
                                    <div>Km #12: ${Km12 || "Não registrado"}</div>
                                    <div>Km #13: ${Km13 || "Não registrado"}</div>
                                    <div>Km #14: ${Km14 || "Não registrado"}</div>
                                    <div>Km #15: ${Km15 || "Não registrado"}</div>
                                    <div>Km #16: ${Km16 || "Não registrado"}</div>
                                    <div>Km #17: ${Km17 || "Não registrado"}</div>
                                    <div>Km #18: ${Km18 || "Não registrado"}</div>
                                    <div>Km #19: ${Km19 || "Não registrado"}</div>
                                    <div>Km #20: ${Km20 || "Não registrado"}</div>
                                    <div>Km #21: ${Km21 || "Não registrado"}</div>
                                </div>
                                <div>
                                    <a  href="#!" 
                                        onclick="javascript: excluirCorrida('${corridas._id}')" 
                                        class="bg-danger text-white botao"
                                        style="text-decoration: none;"
                                    >
                                        <span class="fas">
                                            &#xf12d;&nbsp;<strong>Excluir</strong>
                                        </span>
                                    </a>
                                <div>
                        </div>
                    </div>
                </div>
            </div>
    `)


}