function status() {
    var valorStat = document.getElementById("Stat-${Objetivos.objStat}").getAttribute("data-value");
    if (valorStat == "-1: Urgente") {
        document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#FF0002';
        document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas'>&#xf794;</i>";
    }
    else if (valorStat == "0 - Atrasado") {
        document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#FFC500';
        document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas text-dark'>&#xf4be;</i>";
    }
    else if (valorStat == "1 - Não Iniciado") {
        document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#808080';
        document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas'>&#xf251;</i>";
    }
    else if (valorStat == "2 - Em Andamento") {
        document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#12A802';
        document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas'>&#xf252;</i>";
    }
    else if(valorStat == "3 - Concluído") {
        document.getElementById('bola-${Objetivos._id}').style.backgroundColor='#0B00FF';
        document.getElementById('bola-${Objetivos._id}').innerHTML="<i class='fas'>&#xf253;</i>";
    }
};
status();