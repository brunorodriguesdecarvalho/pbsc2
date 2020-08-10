function getMapsKey() {
    var $j = jQuery.noConflict();
    $j.get(
        '/yeKsPaMG',
        (gk) => { 
            const script = document.createElement('script')
            script.src = gk
            document.head.append(script) 
        }
    )
} 

getMapsKey()

