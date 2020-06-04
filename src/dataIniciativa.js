let tempo = new Date().toISOString()
let data = Date.parse(tempo)
var timezone = (new Date().getTimezoneOffset())*60000
let data2 = data - timezone;
let tempo2 = new Date(data2).toISOString()
let databr = tempo2.substr(0,16)
document.getElementById("iniDataCria").value = databr
document.getElementById("iniDataFim").value = databr
