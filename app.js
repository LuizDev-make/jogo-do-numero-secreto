let listaDeNumerosSorteados = [];
let numerosDisponiveis = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Código simplificado
function exibirTextoNaTela(tag, texto){
 // Esse exemplo serve pra evitar repetição de código utilizando funções
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Uso da função para manipular os texto do HTLM pelos parâmetros
function inicio(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

inicio();

// Verifica se o chute é verdadeiro ou não. 
function verificarChute(){
    // pega os valores da caixa de interação (input)
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        // determina a quantidade de tentativas e filtra de acordo com o plural ou não
        let palavraPlural = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let quantidadeChutes = `Você descobriu o número secreto com ${tentativas} ${palavraPlural}!`;
        exibirTextoNaTela('h1', 'Você acertou!');
        exibirTextoNaTela('p', quantidadeChutes);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        // Filtra se o número está perto de acertar ou não
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor.');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior.')
        }
        // Incrementa no contador em seguida limpa o campo com cada tentativa
        tentativas++;
        limparCampo();
    }
}

function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    inicio();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}

// Não existe parâmetro mais exige retorno a um mpetodo
function gerarNumeroAleatorio() {
    // Função para gerar número aleatório
    let numeroEscolhido = parseInt(Math.random() * numerosDisponiveis + 1);
    // tamando da quantidade da lista
    let qteDeElementosNaLista = listaDeNumerosSorteados.length;
    // Verifica se a lista está cheia
    if (qteDeElementosNaLista == numerosDisponiveis){
        listaDeNumerosSorteados = [];
    }
    // Verifica na lista se o número sorteado já foi escolhido 
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }

}

function limparCampo(){
    // Limpa os campos a cada tentativa de chute
    chute = document.querySelector('input');
    chute.value = '';
}

