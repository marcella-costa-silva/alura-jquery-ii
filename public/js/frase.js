$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

/* 
 * Função responsável por fazer uma requisição do tipo GET. Se falhar, exibe a
 * mensagem de erro por 3 segundos. Mostra o spinner durante a requisição e o
 * esconde quando a requisição acabar.
 **/
function fraseAleatoria() {
	$("#spinner").show();

 	$.get("http://localhost:3000/frases", trocaFraseAleatoria)
 	.fail(function() {
 		$("#erro").show(); // mostra a mensagem
 		setTimeOut(function() {
 			$("#erro").hide(); // esconde a mensagem
 		}, 3000);
 	})
 	.always(function() {
 		$("#spinner").hide();
 	});
}

/* 
 * Função responsável por mudar a frase aleatoriamente de 0 a 9. E chama a função que
 * atualiza a o tamanho da frase (qtdd de palavras). E a função de atualizar tempo.
 **/
function trocaFraseAleatoria(data) {
	// console.log(data);
	var frase        = $(".frase");
	var numAleatorio = Math.floor(Math.random() * data.length); // qtdd de itens do array

	frase.text(data[numAleatorio].texto);

	atualizaTamanhoFrase();
	atualizaTempoInicial(data[numAleatorio].tempo);
}

/* 
 * Função responsável por fazer uma requisição para um frase específica (mandando um dado),
 * pegando o valor do input.
 **/
function buscaFrase() {
	$("#spinner").show();

	var fraseId = $("#frase-id").val();
	var dados   = { id: fraseId }; // obj

	console.log("id da frase = " + fraseId);

	$.get("http://localhost:3000/frases", dados, trocaFrase)
	.fail(function() {
		$("#erro").show(); // mostra a mensagem
 		setTimeOut(function() {
 			$("#erro").hide(); // esconde a mensagem
 		}, 3000);
	})
	.always(function() {
		$("#spinner").hide();
	});
}

/* 
 * Função responsável por trocar a frase que o usuário escolher.
 **/
function trocaFrase(data) {
	var frase = $(".frase");
	frase.text(data.texto);

	atualizaTamanhoFrase();
	atualizaTempoInicial(data.tempo);
}

/* 
 * random >> número aleatório
 * floor  >> arredonda
 * always >> vai sempre executar
 **/