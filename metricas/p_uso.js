// Calcula p-uso, retornando o total, e os p-uso de cada linha(parcelas), todos valores como string formatado em Hexadecimal
function p_uso(N, operandos, operadores) {
    // P_uso final
    let SOMpuso = 0;

    // P_uso por linha do código do programa P
    let puso_parcelas = []

    // For mais externo
    for (let i = 0; i < N; i++) {

        // Tratamento para os operandos
        // Percorre o array de operandos
        let operandosSum = 0;
        for (let j = 0; j < operandos[i].length; j++) {
            operandosSum += operandos[i][j];
        }

        // Tratamento para os operadores
        // Percorre o array de operadores
        let operadoresSum = 0;
        for (let j = 0; j < operadores[i].length; j++) {
            operadoresSum += operadores[i][j];
        }

        // Incrementando operando e operador para obter o p_uso por linha
        let parcela = operandosSum + operadoresSum;

        // Adicionando ao array que guarda p_uso por linha em Hex
        puso_parcelas.push(parcela.toString(16).toUpperCase());

        // Somando a variavel que armazena P_uso total
        SOMpuso += parcela;
    }

    // Retornando P_uso's por linha e total
    return {
        puso: SOMpuso.toString(16).toUpperCase(),
        puso_parcelas
    }
}

module.exports = p_uso