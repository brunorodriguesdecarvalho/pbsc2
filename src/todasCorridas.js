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
    
            <div class="col-sm-4 col-md-3 col-xl-3 align-content-stretch" id="${corridas._id}" data-value="id="${corridas._id}">
            
                <!-- início do cartão -->
                <div class="card mt-2">

                <!-- início do header do cartão -->
                    <div class="card-header px-2 ">
                        <div class="container">                                    
                            <!-- título principal do cartão -->
                            <div class="row">
                                <div class="col px-1" id="tituloAtividade">
                                    <span class="align-middle" style="font-size:1.25em; font-weight:bold">${dataCorrida}<span>                                              
                                </div>
                                <div class="col" id="mostrador-${corridas._id}">
                                    <div class="row justify-content-end">
                                        <a 
                                            href="#!" 
                                            onclick="expandir('cardBody${corridas._id}', 'encolhemais${corridas._id}', 'encolhemenos${corridas._id}')" 
                                            id="encolhemenos${corridas._id}" 
                                            style="display:none"
                                            class="rounded-circle p-1"
                                        >
                                            <span class='fas'>&#xf056;</span>
                                        </a> 
                                        <a 
                                            href="#!" 
                                            onclick="expandir('cardBody${corridas._id}', 'encolhemais${corridas._id}', 'encolhemenos${corridas._id}')"
                                            id="encolhemais${corridas._id}" 
                                            style="display:block"
                                            class="rounded-circle p-1"
                                        >
                                            <span class='fas'>&#xf055;</span>
                                        </a>
                                        <a 
                                            href="#!" 
                                            onclick="javascript: excluirCorrida('${corridas._id}')" 
                                            style="display:block"
                                            class="rounded-circle p-1"
                                        >
                                            <span class='fas text-danger'>&#xf2ed;</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-body cartao p-2 mt-2 mb-1 bg-white rounded" style="display:none" id="cardBody${corridas._id}">
                                <strong>Distância(Km): </strong>${corridas.DistanciaTotal}<br>
                                <strong>Tempo Total: </strong>${corridas.TempoTotalLer}<br>
                                <strong>Pace Médio: </strong>${corridas.PaceTotalLer}<br>
                                <strong>Tempos Parciais:</strong>
                                <div id="Parciais style="padding-inline-start: 0px">
                                    <div>Km1: ${Km1 || "Não registrado"}</div>
                                    <div>Km2: ${Km2 || "Não registrado"}</div>
                                    <div>Km3: ${Km3 || "Não registrado"}</div>
                                    <div>Km4: ${Km4 || "Não registrado"}</div>
                                    <div>Km5: ${Km5 || "Não registrado"}</div>
                                    <div>Km6: ${Km6 || "Não registrado"}</div>
                                    <div>Km7: ${Km7 || "Não registrado"}</div>
                                    <div>Km8: ${Km8 || "Não registrado"}</div>
                                    <div>Km9: ${Km9 || "Não registrado"}</div>
                                    <div>Km10: ${Km10 || "Não registrado"}</div>
                                    <div>Km11: ${Km11 || "Não registrado"}</div>
                                    <div>Km12: ${Km12 || "Não registrado"}</div>
                                    <div>Km13: ${Km13 || "Não registrado"}</div>
                                    <div>Km14: ${Km14 || "Não registrado"}</div>
                                    <div>Km15: ${Km15 || "Não registrado"}</div>
                                    <div>Km16: ${Km16 || "Não registrado"}</div>
                                    <div>Km17: ${Km17 || "Não registrado"}</div>
                                    <div>Km18: ${Km18 || "Não registrado"}</div>
                                    <div>Km19: ${Km19 || "Não registrado"}</div>
                                    <div>Km20: ${Km20 || "Não registrado"}</div>
                                    <div>Km21: ${Km21 || "Não registrado"}</div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
    `)


}