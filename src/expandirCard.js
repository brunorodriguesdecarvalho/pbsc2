function expandir(cartao, mais, menos) {
    var cartao = document.getElementById(cartao);
    var mais = document.getElementById(mais);
    var menos = document.getElementById(menos);
    if (cartao.style.display === "none") {
        cartao.style.display = "block"
        menos.style.display = "block"
        mais.style.display = "none"
    }
    else {
        cartao.style.display = "none"
        menos.style.display = "none"
        mais.style.display = "block"
    }
};