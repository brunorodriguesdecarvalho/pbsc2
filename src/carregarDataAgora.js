function carregarDataAgora() {
    var data = (new Date().toISOString()).substr(0,10)
    document.getElementById("runData").value = data
}
carregarDataAgora()
