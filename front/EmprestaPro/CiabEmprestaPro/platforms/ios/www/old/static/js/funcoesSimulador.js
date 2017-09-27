$(document).ready(function () {
    initInputRenda();
    initSliderParcelas();
    initSimulador();

    $(".closeModalError").click(function () {
        $('#ModalError').modal('hide');
    });

    $("#btnComeceAgora").click(function () {
        window.localStorage.setItem("CHAVE_VOLTAR_CADASTRO", "simulador.html");
        window.location.href = "cadastro.html";
    });
});

function initInputRenda() {
    $('.inputRenda').mask("000.000.000,00", { "reverse": true });
    $('.inputRenda').change(function () {

        if (valorToFloat($('.inputRenda').val()) > 500) {
            updateSliderValor($('.inputRenda').val());
            $(".btnSimular").removeAttr("disabled");
            atualizaTela();
        }
        else {
            $('#ModalError').modal('show');
            $('.inputRenda').val("");
            updateSliderValor(0);
            atualizaTela();
            $(".rangeParcela").attr("disabled", "disabled");
            $(".btnSimular").attr("disabled", "disabled");
        }
    });
}

function updateSliderValor(valorRenda) {

    var valor = valorToFloat(valorRenda);
    var modulo = valor % 500;
    valor = valor - modulo;
    var min = valor;
    var max = valor * 7;

    $(".rangeValor").removeAttr("disabled");
    $(".rangeValor").attr("min", min);
    $(".rangeValor").attr("max", max);
    $(".rangeValor").attr("step", min);
    $(".rangeValor").attr("value", max);
    $(".rangeValor").change(function () {
        atualizaValor($(".rangeValor").val());
        
        atualizaTela();
    });
    
    $(".rangeValor").val(valor * 4);

    atualizaValor(valor * 4);
    
}

function valorToFloat(valor) {
    valor = valor + "";
    valor = valor.replace(/[.]+/g, "");
    valor = valor.replace(",", ".");
    return parseFloat(valor);
}

function atualizaValor(valor) {
    valor = valor + ".00";
    $(".valorEmprestimo").html("<b>R$ <span>" + valor + "</span></b>");
    $(".valorEmprestimo").find("span").mask("000.000.000,00", { "reverse": true });
    $('#valorEmprestimoFim').html("<b>R$ <span>" + valor + "</span></b>");
    $("#valorEmprestimoFim").find("span").mask("000.000.000,00", { "reverse": true });

}

function initSliderParcelas() {
    //$(".rangeParcela").removeAttr("disabled");
    $(".rangeParcela").attr("min", "3");
    $(".rangeParcela").attr("max", "12");
    $(".rangeParcela").attr("step", "3");
    $(".rangeParcela").attr("value", "12");
    $(".rangeParcela").change(function () {
        atualizaParcela($(".rangeParcela").val());
        atualizaTela();
    });
}

function atualizaParcela(parcela) {
    $(".valorParcela").html("<b>" + parcela + "X</b>");
}

function initSimulador() {

    var valor = parseFloat($('.rangeValor').val());
    if (valor < 500)
        return 0;

    var parcela = $('.rangeParcela').val();
    var rendaLiquida = $('.inputRenda').val();

    var calcCF = 0.015 / (1 - Math.pow(1 + 0.015, parcela*-1));
    var valorParcela = (((valor + 400) * 0.38 / 100) + valor + 400) * calcCF;
    return valorParcela;
}

function atualizaTela() {
    $(".rangeParcela").removeAttr("disabled");
    var valor = parseFloat($('.rangeValor').val());
    valor = valor + ".00";
    var numeroParcelas = $('.rangeParcela').val();
    var valorParcela = initSimulador();
    valorParcela = parseFloat(Math.round(valorParcela * 100) / 100).toFixed(2);
    valorParcela = valorParcela.replace(".", "");    

    $('#valorModalParcela').html("R$ <span>" + valorParcela + "</span>");
    $("#valorModalParcela").find("span").mask("000.000.000,00", { "reverse": true });

    $('#valorEmprestimoFim').html("<b>R$ <span>" + (valorParcela * numeroParcelas) + "</span></b>");
    $("#valorEmprestimoFim").find("span").mask("000.000.000,00", { "reverse": true });

    window.localStorage.setItem("valorParcela", $("#valorModalParcela").find("span").text());
    window.localStorage.setItem("valorTotal", $("#valorEmprestimoFim").find("span").text());
    window.localStorage.setItem("numeroParcelas", $(".valorParcela").find("b").text());
    window.localStorage.setItem("valorEmprestimo", $(".valorEmprestimo").find("span").text());
    window.localStorage.setItem("renda", $('.inputRenda').val());
}
