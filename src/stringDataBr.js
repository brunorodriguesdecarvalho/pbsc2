function transformarDataString(DataISO) {
    var dataAno = DataISO.substr(0, 4)
    var dataMes = DataISO.substr(5, 2)
    var dataDia = DataISO.substr(8, 2)
    var dataHoraBR = DataISO.substr(11, 2)
    var dataMinBR = DataISO.substr(14, 2)
    var dataString = dataDia + "/" + dataMes + "/" + dataAno + " (" + dataHoraBR + "h" + dataMinBR + "m)"
    return dataString
}
