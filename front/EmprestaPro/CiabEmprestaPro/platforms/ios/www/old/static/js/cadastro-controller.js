var CHAVE_VOLTAR = "CHAVE_VOLTAR_CADASTRO";

function voltarClicked() {
    var voltarLocation = window.localStorage.getItem(CHAVE_VOLTAR);
    window.location.href = voltarLocation;
}