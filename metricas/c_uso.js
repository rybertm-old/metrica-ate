function c_uso(N, M, Q, R, operandos, operadores, constantes) {
    let usoSum = 0;
    for (let i = 0; i < N; i++) {
        let operandosSum = 0;
        for (let j = 0; j < M; j++) {
            operandosSum += operandos[j];
        }

        let operadoresSum = 0;
        for (let j = 0; j < Q; j++) {
            operadoresSum += operadores[j];
        }

        let constantesSum = 0;
        for (let j = 0; j < R; j++) {
            constantesSum += constantes[j];
        }

        usoSum += operandosSum + operadoresSum + constantesSum;
    }

    // Retorna como string formatado em Hexadecimal
    return usoSum.toString(16);
}