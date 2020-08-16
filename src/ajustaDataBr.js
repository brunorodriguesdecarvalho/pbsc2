function ajustaDataBr(dataParaTransformar) {
    var dataAno = dataParaTransformar.substr(0, 4)
    var dataMes = dataParaTransformar.substr(5, 2) - 1
    var dataDia = dataParaTransformar.substr(8, 2)
    var dataHoraBR = dataParaTransformar.substr(11, 2) - 3
    var dataMinBR = dataParaTransformar.substr(14, 2)
    var dataBR = new Date(dataAno, dataMes, dataDia, dataHoraBR, dataMinBR, 0, 0)
    return dataBR 
}

function ajustaDataIso(dataParaTransformar) {
    var dia = dataParaTransformar.substr(0,2)
    var mes = dataParaTransformar.substr(3,2)
    var ano = dataParaTransformar.substr(6,4)
    var hora = dataParaTransformar.substr(12,2)
    var min = dataParaTransformar.substr(15,2)
    var dataISO = new Date(ano, mes, dia, hora, min).toISOString()
    return dataISO
}

function transformarDataString(DataISO) {
    var dataAno = DataISO.substr(0, 4)
    var dataMes = DataISO.substr(5, 2)
    var dataDia = DataISO.substr(8, 2)
    var dataHoraBR = DataISO.substr(11, 2)
    var dataMinBR = DataISO.substr(14, 2)
    var dataString = dataDia + "/" + dataMes + "/" + dataAno + " (" + dataHoraBR + "h" + dataMinBR + "m)"
    return dataString
}
