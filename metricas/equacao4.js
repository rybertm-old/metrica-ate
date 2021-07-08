// X, Y
function equacao4(X, Y, V, S){
    let soma = 0;

    // Σ; g = 1, g <= X...
    for (let g = 1; g <= X; g++) { 
        soma += V[g];
    }

        
    // Σ; h = 1, h <= Y...
    for (let h = 1; h <= Y; h++) { 
        soma += S[h];
    }

    // Retorna como string formatado em Hexadecimal
    return soma.toString(16);
}