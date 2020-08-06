//Essa função serve para mostrar ao usuário os campos para preencher o tempo por cada KM.
//Essa função utiliza a distância para incluir dinâmicamente a quantidade de campos necessários para preencher.

function iniciarTempos() {
    var Dist = Number($("#runKm").val())
    var cartaoMain = document.getElementById("tabelaKmETempoMain");
    var cartaoTitulo = document.getElementById("tabelaKmETempoTitulo");

    if (Dist<=0 || Dist.lenght == 0) {
        alert("Digite uma distância válida. Por favor tente novamente.")
    } else {
        cartaoMain.style.display = "flex"
        cartaoTitulo.style.display = "flex"
        document.getElementById("kmEtempoGerado").innerHTML=""
        for (i=1; i<=Dist; i++) {   
            $("#kmEtempoGerado").append(`

            <div class="row py-2 align-items-center text-primary">
                <div class="col-0 font-weight-bold text-right mr-2">Tempo do KM ${i}:</div>
                <div class="col-0">
                    <div class="col">
                        <div class="row">
                            <div class="col-6 text-right">
                                Min:
                            </div>
                            <div class="col-6">
                                <input type="number" id="runTempoMKm${i}" placeholder="mm" min=0 max=59 style="width:100%">
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row">
                            <div class="col-6 text-right  ">
                                Seg:
                            </div>
                            <div class="col-6">
                                <input type="number" id="runTempoSKm${i}" placeholder="ss" max=59 style="width:100%">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <p id="TempoMKmAcc${i}"></p>
                    <p id="PaceKmAcc${i}"></p>
                </div>
            </div>
            

            `)
        }
        var testFracaoKm = (Dist % Math.floor(Dist))
        
        if (testFracaoKm != 0) {
            $("#kmEtempoGerado").append(` 

                <div class="row py-2 align-items-center text-primary">
                    <div class="col-2 bg-white font-weight-bold text-right">Tempo do KM Incompleto:</div>
                    <div class="col-2">
                        <input type="number"  id="runTempoMKmFrac" placeholder="mm" min=0 max=59>
                    </div>
                    <div class="col-2">
                        <input type="number"  id="runTempoSKmFrac" placeholder="ss" max=59>
                    </div>
                </div>
                
            `)
        }
        
        $("#kmEtempoGerado").append(`
            <div class="row py-2 align-items-center text-primary">
                <input 
                    type="button" 
                    id="calcTempoTrecho" 
                    onclick="javascript: calcularTempoTotal()" 
                    value="Calcular Tempo Total"
                >
            </div>
        `)
    }
}