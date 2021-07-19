// Entrada: Valores inteiros (??)
// Saída: Valores em Hexadecimal

// S, T, V, O, a, b, q, r, z
function p_uso(S, T, V, operador, operando_a, operando_b, operando_rel, res_sim, res_com) {
    let SOMp_uso = 0;

    // Σ; n = 1, n <= S...
    for (let n = 1; n <= S; n++) { // Quantidade de predicados

        let operadores = 0;
        // Σ; m = 1, m <= T...
        for (let m = 1; m <= T; m++) { // Quantidade de operadores
            operadores += operador;
        }

        let proposicoes = 0;

        // Σ; f = 1, f <= V...
        for (let f = 1; f <= V; f++) { // Quantidade de proposições
            proposicoes += operando_a + operando_b + operando_rel + res_sim;
        }

        SOMp_uso += operadores + proposicoes + res_com;
    }

    // Retorna como string formatado em Hexadecimal
    return SOMp_uso.toString(16);
}