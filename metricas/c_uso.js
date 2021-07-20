// Calcula c-uso, retornando o total, e os c-uso de cada linha(parcelas), todos valores como string formatado em Hexadecimal
function c_uso(totalDeLinhas, operandos, operadores, constantes) {
    let usoSum = 0;
    let cuso_parcelas = []
    // ∑wj + ∑dl + ∑ck - Cáculo de c-uso total
    for (let i = 0; i < totalDeLinhas; i++) {
        let operandosSum = 0;
        // ∑wj - Somatório dos operandos da linha i + 1
        for (let j = 0; j < operandos[i].length; j++) {
            operandosSum += operandos[i][j];
        }

        let operadoresSum = 0;
        // ∑dl - Somatório dos operadores da linha i + 1
        for (let j = 0; j < operadores[i].length; j++) {
            operadoresSum += operadores[i][j];
        }

        let constantesSum = 0;
        // ∑ck - Somatório das constantes da linha i + 1
        for (let j = 0; j < constantes[i].length; j++) {
            constantesSum += constantes[i][j];
        }

        // c-uso da linha i + 1
        let parcela = operandosSum + operadoresSum + constantesSum;
        cuso_parcelas.push(parcela.toString(16).toUpperCase());
        console.log(`c-uso linha ${i + 1}: ${parcela.toString(16).toUpperCase()}`)

        usoSum += parcela;
    }

    return {
        cuso: usoSum.toString(16).toUpperCase(),
        cuso_parcelas
    }
}

module.exports = c_uso