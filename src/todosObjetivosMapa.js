//tipoItem pode ser atividade, iniciativa ou objetivo

function consulta(tipoItem) {
    console.log('Executando consulta...')
    const rota = '/'+tipoItem
    console.log("rota atual: " + rota )
    var agregador
    var roteador
    if (tipoItem == 'objetivos') {
        agregador = '#Obj'
        roteador = 'obj'
    } else if (tipoItem == 'iniciativas') {
        agregador = '#Ini'
        roteador = 'ini'
    } else if (tipoItem == 'atividades') {
        agregador = '#Ativ'
        roteador = 'ativ'
    }
    console.log("Agregador: " + agregador + ". Roteador: " + roteador)
    $.get(rota, (resultado) => { 
            var qtd = Object.keys(resultado).length
            if (qtd == 0) {
                console.log("sem registros")
                $(agregador).append(`
                    <div class="mx-auto">
                    <br>
                    <p style="font-weight:bold">Você ainda não criou nenhum ${tipoItem}...</p>
                        <img 
                            src="../img/startup-vector-free-icon-set-14.png" 
                            style="width:200px;"
                            class="m-auto d-block"
                        >
                        <br>
                        <div class="text-center my-4">
                            <a href="/${roteador}/nova" class="botao p-3 bg-primary rounded text-white">Criar ${tipoItem}</a>
                        </div>
                    </div>
                `)
            } else { 
                if (tipoItem == 'objetivos') { 
                    resultado.forEach(listarObjetivos) 
                    console.log("resultado de objetivos...")
                }
                else if (tipoItem == 'iniciativas') { 
                    resultado.forEach(listarIniciativas) 
                    console.log("resultado de iniciativas...")
                }
                else if (tipoItem == 'atividades') { 
                    resultado.forEach(listarAtividades) 
                    console.log("resultado de atividades...")
                }
                console.log("Qtd de registros: ", qtd) 
            }

            
        }
    )
}

consulta("objetivos")
consulta("iniciativas")
consulta("atividades")

function listarObjetivos(resultado){
    var a = `
        <div class="row border border-primary py-1 mx-0 align-items-center justify-items-center" id="${resultado._id}" data-value="${resultado._id}">
            <div class="border-dark px-0 mx-1">
                <div class="text-center bola2" id="bola-${resultado._id}"></div>
            </div>
            <div class="col-2 px-0">
                <div>
                    <div class="pr-1 align-items-center">
                        <span>${resultado.objNome}</span>
                    </div>
                    <div class="pb-0" style="display:none" id="cardBody${resultado._id}">
                        <p id="Stat-${resultado.objStat}" data-value="${resultado.objStat}"></p>
                    </div>
                </div>
            </div>  
        </div>
        <script>  
            var valorStat = document.getElementById("Stat-${resultado.objStat}").getAttribute("data-value");
            var idBola = document.getElementById('bola-${resultado._id}')
            colorirStatus(valorStat, idBola)
        </script>
    `
    if(resultado.objSaude == "Física") {
        $("#Fis").append(a)
    } else if(resultado.objSaude == "Emocional") {
        $("#Emo").append(a)
    } else if(resultado.objSaude == "Espiritual") {
        $("#Esp").append(a)
    } else if(resultado.objSaude == "Social") {
        $("#Soc").append(a)
    } else if(resultado.objSaude == "Intelectual") {
        $("#Int").append(a)
    } else if(resultado.objSaude == "Profissional") {
        $("#Pro").append(a)
    } else if(resultado.objSaude == "Financeira") {
        $("#Fin").append(a)
    } else {
        $("#Obj").append(a)
    }

    var nomeDestino = "ini_" + `${resultado._id}`
    var b = `<div class="col-9 px-0 border border-danger"id=` + nomeDestino + `></div>`
    var id = "#" + resultado._id
    $(id).append(b)
}


function listarIniciativas(iniciativas){ 
    var a = `
    <div class="row border border-primary py-1 mx-0 align-items-center justify-items-center" id="${iniciativas._id}" data-value="${iniciativas._id}">
        <div class="border-dark px-0 mx-1">
            <div class="text-center bola2" id="bola-${iniciativas._id}"></div>
        </div>
        <div class="col-5 px-0">
            <div>
                <div class="pr-1 align-items-center">
                    <span>${iniciativas.iniNome}</span>
                </div>
                <div class="pb-0" style="display:none" id="cardBody${iniciativas._id}">
                    <p id="Stat-${iniciativas.iniStat}" data-value="${iniciativas.iniStat}"></p>
                </div>
            </div>
        </div>  
    </div>
    <script>  
        var valorStat = document.getElementById("Stat-${iniciativas.iniStat}").getAttribute("data-value");
        var idBola = document.getElementById('bola-${iniciativas._id}')
        colorirStatus(valorStat, idBola)
    </script>
`
    var endObj = "#ini_" + `${iniciativas.iniObjID}`
    $(endObj).append(a)

    var nomeDestino = "ativ_" + `${iniciativas._id}`
    var b = `<div class="col-6 px-0 border border-danger"id=` + nomeDestino + `></div>`
    var id = "#" + iniciativas._id
    $(id).append(b)
}


function listarAtividades(atividades){ 
    var a = `
        <div class="row border border-primary py-1 mx-0 align-items-center justify-items-center" id="${atividades._id}" data-value="${atividades._id}">
            <div class="border-dark px-0 mx-1">
                <div class="text-center bola2" id="bola-${atividades._id}"></div>
            </div>
            <div class="col px-0">
                <div>
                    <div class="pr-1 align-items-center">
                        <span>${atividades.ativNome}</span>
                    </div>
                    <div class="pb-0" style="display:none" id="cardBody${atividades._id}">
                        <p id="Stat-${atividades.ativStat}" data-value="${atividades.ativStat}"></p>
                    </div>
                </div>
            </div>  
        </div>
        <script>  
            var valorStat = document.getElementById("Stat-${atividades.ativStat}").getAttribute("data-value");
            var idBola = document.getElementById('bola-${atividades._id}')
            colorirStatus(valorStat, idBola)
        </script>
    `
    var endAtiv = "#ativ_" + `${atividades.ativIniID}`
    $(endAtiv).append(a)
}