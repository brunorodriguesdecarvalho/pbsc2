//Começo da lista de status - para Iniciativas
var dropdown = document.getElementById('iniStat');
dropdown.length = 0
/*
let defaultOption = document.createElement('option');
defaultOption.text = 'Não atribuído';

dropdown.add(defaultOption);*/
dropdown.selectedIndex = 0;

var url = '/ragstatus';

const request = new XMLHttpRequest();
request.open('GET', url, true);

fetch(url)
    .then(
        function(response) {                    
            if (response.status !== 200) {
                console.warn('Erro, código: ' + response.status)
                return
            }

        response.json().then(function(data) {
            let option

            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.text = data[i].ragstatus;
                option.value = data[i].ragstatus;
                dropdown.add(option);
            }
        })
    }
)
.catch(function(err) {
    console.error("Erro de Fetch -", err)
})

