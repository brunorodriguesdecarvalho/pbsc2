//Começo lista objetivos - para iniciativas
var dropdownObj = document.getElementById('iniObj');
var option = document.createElement("option");
dropdownObj.length = 1

var urlObj = '/listObj';

const requestObj = new XMLHttpRequest();
requestObj.open('GET', urlObj, true);

fetch(urlObj)
    .then(
        function(responseObj) {    
            optionObj = document.createElement('option');
            optionObj.text = 'Nenhuma';
            optionObj.value = 'Nenhuma';
            optionObj.id = 'Nenhuma';
            dropdownObj.add(optionObj);
            document.getElementById("Nenhuma").selected = true;
            
            if (responseObj.status !== 200) {
                console.warn('Erro, código: ' + responseObj.status)
                return
            } 

        responseObj.json().then(function(dataObj) {
            let optionObj

            for (let iObj = 0; iObj < dataObj.length; iObj++) {
                optionObj = document.createElement('option');
                optionObj.text = dataObj[iObj].objNome;
                optionObj.value = dataObj[iObj].objNome;
                dropdownObj.add(optionObj);
            }
        })
    }
)
.catch(function(err) {
    console.error("Erro de Fetch -", err)
})
