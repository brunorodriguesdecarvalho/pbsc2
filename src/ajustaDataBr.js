function ajustaDataBr(dataParaTransformar) {
    var dataAno = dataParaTransformar.substr(0, 4)
    var dataMes = dataParaTransformar.substr(5, 2) - 1
    var dataDia = dataParaTransformar.substr(8, 2)
    var dataHoraBR = dataParaTransformar.substr(11, 2) - 3
    var dataMinBR = dataParaTransformar.substr(14, 2)
    var dataBR = new Date(dataAno, dataMes, dataDia, dataHoraBR, dataMinBR, 0, 0)
    return dataBR 
}
