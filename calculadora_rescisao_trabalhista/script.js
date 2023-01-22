
// função principal
function manipulaDOM() {
    let salarioDigitado = parseFloat(document.getElementById("salario").value);
    let diasMes = parseFloat(document.getElementById("dias-trabalhados").value);
    let mesesAno = parseFloat(document.getElementById("meses-trabalhados-ano").value);
    let totalMesesTrabalhados = parseFloat(document.getElementById("total-de-meses-trabalhados").value);

    //Transformando os valores de input em datas válidas de mês
    let dataInicial = new Date(document.getElementById('data-inicial').value);
    let dataFinal = new Date(document.getElementById('data-final').value);

    //função que transforma a quantidade de dias em meses e dias
    function diasEmMeses(days) {
        var data = new Date(1970, 0, days);
        var meses = data.getMonth();
        var anos = data.getFullYear() - 1970;
        var dias = data.getDate();
        return {
            meses: anos * 12 + meses,
            dias: dias
        };
    }

    //função que calcula a diferença entre as datas e tranforma tanto em dias quanto em meses totais
    function calculoDaDiferenca(dataInicial, dataFinal) {
        var dias = (dataFinal.getTime() - dataInicial.getTime()) / (1000 * 60 * 60 * 24);
        var meses = Math.floor(dias / 30);

        console.log('dias:', dias);
        console.log('meses:', meses);
        console.log(diasEmMeses(dias));

        return {
            dias: dias,
            meses: meses,
            diasEmMeses: diasEmMeses(dias)
        };
    };

    //checagem para saber se as datas foram colocadas em ordem certa
    dataFinal > dataInicial ?
        calculoDaDiferenca(dataInicial, dataFinal) :
        alert('As datas estão invertidas, coloque-as na ordem certa para executar o calculo');
    //Termino da transformação

    let saldoSalario = calculaSaldoSalario(salarioDigitado, diasMes);
    console.log("saldoSalario: " + saldoSalario);

    let feriasVencidas = calculaFeriasVencidas(salarioDigitado);
    console.log("feriasVencidas: " + feriasVencidas);

    let feriasProporcionais = calculaFeriasProporcionais(mesesAno, feriasVencidas);
    console.log("feriasProporcionais: " + feriasProporcionais);

    let decimoTerceiroProporcional = calculaDecimoTerceiroProporcional(salarioDigitado, mesesAno);
    console.log("decimoTerceiro: " + decimoTerceiroProporcional);

    let avisoPrevioIndenizado = calculaAvisoPrevioIndenizado(salarioDigitado);
    console.log("avisoPrevio: " + avisoPrevioIndenizado);

    let multaRescisoria = calculaMultaRescisoria(salarioDigitado, totalMesesTrabalhados);
    console.log("multaRescisoria: " + multaRescisoria);

    let total = calculaTotal(saldoSalario, feriasVencidas, feriasProporcionais, decimoTerceiroProporcional, avisoPrevioIndenizado, multaRescisoria);
    console.log("Total: " + total);

    document.getElementById('resultado').innerHTML = total;

    // funções auxiliares
    function calculaSaldoSalario(salarioDigitado, diasMes) {
        let saldoSalario = (salarioDigitado / 30) * diasMes;
        return saldoSalario;
    }

    function calculaDecimoTerceiroProporcional(salarioDigitado, mesesAno) {
        let decimoTerceiro = (salarioDigitado / 12) * mesesAno;
        return decimoTerceiro;
    }

    function calculaFeriasVencidas(salarioDigitado) {
        let feriasVencidas = salarioDigitado + (salarioDigitado / 3);
        return feriasVencidas;
    }

    function calculaFeriasProporcionais(mesesAno, feriasVencidas) {
        let feriasProporcionais = (feriasVencidas / 12) * mesesAno;
        return feriasProporcionais;
    }

    function calculaAvisoPrevioIndenizado(salario) {
        let avisoPrevioIndenizado = (salario / 30) * 33;
        return avisoPrevioIndenizado;
    }

    function calculaMultaRescisoria(salario, totalDeMesesTrabalhados) {
        let depositoMensalFGTS = salario * 0.08;
        let totalContribuicaoFGTS = depositoMensalFGTS * totalDeMesesTrabalhados;
        let multaRescisoria = totalContribuicaoFGTS * 0.4;
        return multaRescisoria;
    }

    function calculaTotal(saldoSalario, feriasVencidas, feriasProporcionais, decimoTerceiroProporcional, avisoPrevioIdenizado, multaRescisoria) {
        let total = saldoSalario + feriasVencidas + feriasProporcionais + decimoTerceiroProporcional + avisoPrevioIdenizado + multaRescisoria;
        console.log(typeof (total));
        return total.toFixed(2);
    }

    //Novas funções
    let radioInput = document.querySelector('input[name="rescisao"]:checked').value
    console.log('o selecionado foi: ', radioInput)

    inputSelected(radioInput)

    function inputSelected(elementInput) {
        switch (elementInput) {
            case 'demissaoSemJustaCausa':
                return demissaoSemJustaCausa(saldoSalario, avisoPrevioIndenizado, decimoTerceiroProporcional, feriasVencidas, feriasProporcionais, multaRescisoria)
            case 'demissaoComJustaCausa':
                return demissaoComJustaCausa(saldoSalario, feriasVencidas);
            case 'pedidoDemissao':
                return pedidoDemissao(saldoSalario, decimoTerceiroProporcional, feriasVencidas, feriasProporcionais);
            case 'rescisaoPorCulpaReciproca':
                return rescisaoPorCulpaReciproca(saldoSalario, avisoPrevioIndenizado, decimoTerceiroProporcional, feriasVencidas, feriasProporcionais);
            case 'demissaoPorComumAcordo':
                return demissaoPorComumAcordo(saldoSalario, avisoPrevioIndenizado, decimoTerceiroProporcional, feriasVencidas, feriasProporcionais, multaRescisoria);
            default:

        }
    }

    function demissaoSemJustaCausa(saldoSalario, avisoPrevioIndenizado, decimoTerceiroProporcional, feriasVencidas, feriasProporcionais, multaRescisoria) {
        let SemJustaCausa = saldoSalario + avisoPrevioIndenizado + decimoTerceiroProporcional + feriasVencidas + feriasProporcionais + multaRescisoria;
        console.log('demissao SEM Justa Causa: ', SemJustaCausa)
    }

    function demissaoComJustaCausa(saldoSalario, feriasVencidas) {
        return saldoSalario + feriasVencidas;
    }

    function pedidoDemissao(saldoSalario, decimoTerceiroProporcional, feriasVencidas, feriasProporcionais) {
        return saldoSalario + decimoTerceiroProporcional + feriasVencidas + feriasProporcionais;
    }

    function rescisaoPorCulpaReciproca(saldoSalario, avisoPrevio, decimoTerceiroProporcional, feriasVencidas, feriasProporcionais, multaRescisoria) {
        return saldoSalario + (avisoPrevio / 2) + (decimoTerceiroProporcional / 2) + feriasVencidas + (feriasProporcionais / 2) + multaRescisoria;
    }

    function demissaoPorComumAcordo(saldoSalario, avisoPrevio, decimoTerceiroProporcional, feriasVencidas, feriasProporcionais, multaRescisoria) {
        return saldoSalario + (avisoPrevio / 2) + decimoTerceiroProporcional + feriasVencidas + feriasProporcionais + multaRescisoria;
    }
}