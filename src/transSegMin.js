//Essa função serve para transformar um valor em segundos para uma string no formato H/M/S, sendo que H só aparece quando necessário.


function transSegMin(SegParaTrans){
        
    var origem = SegParaTrans
    
    if(origem>0) {
        var minInt = Math.floor(origem/60)
        var minResto = origem - (minInt*60)

        if(minInt>59){
            Hora = Math.floor(minInt/60)
            var minIntResto = minInt - (Hora * 60)
            var StringMinSeg = Hora + "h" + minIntResto + "m" + minResto + "s."
        }else{
            var StringMinSeg = minInt + "m" + minResto + "s."
        }
        return StringMinSeg
    } else {return null} 
}