function colorirStatus(valorStat, id) {

    if (valorStat == "-1: Urgente") {
        id.style.backgroundColor='#FF0002';
        id.innerHTML="<i class='fas text-white'>&#xf794;</i>";
    }
    else if (valorStat == "0 - Atrasado") {
        id.style.backgroundColor='#FFC500';
        id.innerHTML="<i class='fas text-dark'>&#xf4be;</i>";
    }
    else if (valorStat == "1 - Não Iniciado") {
        id.style.backgroundColor='#808080';
        id.innerHTML="<i class='fas text-white'>&#xf251;</i>";
    }
    else if (valorStat == "2 - Em Andamento") {
        id.style.backgroundColor='#12A802';
        id.innerHTML="<i class='fas text-white'>&#xf252;</i>";
    }
    else if(valorStat == "3 - Concluído") {
        id.style.backgroundColor='#0B00FF';
        id.innerHTML="<i class='fas text-white'>&#xf253;</i>";
    }
    else if(valorStat == "4 - Cancelado") {
        id.style.backgroundColor='#1f1f14';
        id.innerHTML="<i class='fas text-white'>&#xf05e;</i>";
    }
};