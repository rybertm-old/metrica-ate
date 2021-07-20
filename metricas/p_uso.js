// Calcula c-uso, retornando o total, e os c-uso de cada linha(parcelas), todos valores como string formatado em Hexadecimal
function p_uso(N, operandos, operadores) {
    let SOMpuso = 0;
    let puso_parcelas = []
    // ∑wj + ∑dl + ∑ck
    for (let i = 0; i < N; i++) {
        let operandosSum = 0;
        // ∑wj
        for (let j = 0; j < operandos[i].length; j++) {
            operandosSum += operandos[i][j];
        }

        let operadoresSum = 0;
        // ∑dl
        for (let j = 0; j < operadores[i].length; j++) {
            operadoresSum += operadores[i][j];
        }


        let parcela = operandosSum + operadoresSum;
        puso_parcelas.push(parcela.toString(16).toUpperCase());
        SOMpuso += parcela;
    }

    return {
        puso: SOMpuso.toString(16).toUpperCase(),
        puso_parcelas
    }
}

module.exports = p_uso