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
                <div class="col-2 bg-white font-weight-bold text-right">Tempo do KM ${i}:</div>
                <div class="col-2">
                    <input type="number"  id="runTempoMKm${i}" placeholder="mm" min=0 max=59>
                </div>
                <div class="col-2">
                    <input type="number"  id="runTempoSKm${i}" placeholder="ss" max=59>
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
                <div></div>
                <div class="col-sm col-lg">
                <input 
                    type="button" 
                    id="calcTempoTrecho" 
                    onclick="javascript: calcularTempoTotal()" 
                    value="Calcular Tempo Total"
                >
                </div>
            </div>
            
        `)
    }
}