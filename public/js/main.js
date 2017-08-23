var tempoInicial = $("#tempo-digitacao").text();
var campo        = $(".campo-digitacao");

/* 
 * Função do jQuery responsável por inicializar todas as funções assim que 
 * a página for carregada no navegador. Pode ser chamada com $(document).ready()...
 **/
$(function () {
	console.log("Página carregada");
 	atualizaTamanhoFrase();
 	inicializaContadores();
 	inicializaCronometro();
 	inicializaMarcadores();

 	// A função reiniciaJogo só é chamada quando a página é recarregada
 	$("#botao-reiniciar").click(reiniciaJogo);

 	atualizaPlacar();

 	$("#usuarios").selectize({
 		create: true,
 		sortField: 'text'
 	});

 	// Customizado, aparecerá quando tiver a requisição ajax
 	$(".tooltip").tooltipster({
 		trigger: "custom"
 	});
});

/* 
 * Função responsável por atualizar o tempo quando a frase for trocada. Seta o 
 * tempoInicial para quando a página for atualizada, iniciar corretamente.
 **/
function atualizaTempoInicial(tempo) {
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo);
}

/* 
 * Função responsável por atualizar o tamanho da frase. Separa as palavras através 
 * de "espaço" e conta a quantidade.
 **/
function atualizaTamanhoFrase () {
	var frase        = $(".frase").text(); 
	var numPalavras  = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");

	tamanhoFrase.text(numPalavras);
}

/* 
 * Função responsável por contar a quantidade de palavras e caracteres dentro do 
 * textarea e inicializa os contadores do jogo.
 **/
function inicializaContadores () {	
	campo.on("input", function () {
		var conteudo      = campo.val();
		var qtdPalavras   = conteudo.split(/\S+/).length -1; 
		var qtdCaracteres = conteudo.length;

		$("#contador-palavras").text(qtdPalavras);
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

/* 
 * Função responsável por fazer a contagem regressiva do jogo e chamar a função
 * finalizaJogo() quando o tempo for 0.
 **/
function inicializaCronometro () {
	campo.one("focus", function () {
		var tempoRestante = $("#tempo-digitacao").text();
		
		// Executa a função de 1 em 1 segundo
		var cronometroID = setInterval(function () {
			tempoRestante--;
			// console.log(tempoRestante);
			$("#tempo-digitacao").text(tempoRestante);
			
			// Quando o cronometro chegar a 0, desabilita o textarea
			if (tempoRestante < 1) {
				// setInterval para de funcionar quando chega no 0
				clearInterval(cronometroID); 
				finalizaJogo();
			}
		}, 1000);
	});
}

/* 
 * Função responsável por desabilitar o textarea e pintá-lo de cinza quando 
 * o tempo chegar a 0, ao final, chama a função inserePlacar().
 **/
function finalizaJogo () {
	campo.attr("disabled", true);
	campo.toggleClass("campo-desativado");
	inserePlacar();
}

/* 
 * Função responsável por comparar o que está dentro da caixa de texto com a frase.
 * Compara cada pedaço da string.
 **/
function inicializaMarcadores () {
 	campo.on("input", function () {
 		var frase      = $(".frase").text();
 		var digitado   = campo.val();
 		var comparavel = frase.substr(0, digitado.length);

 		if (digitado == comparavel) {
 			campo.addClass("campo-correto");
 			campo.removeClass("campo-errado");
 		} else {
 			campo.addClass("campo-errado");
 			campo.removeClass("campo-correto");
 		}
 	});
}

/* 
 * Função responsável por reiniciar o jogo pro usuário. Habilita o campo, zera o campo,
 * zera o contador de palavras, zera o contador de caracteres e retorna para o tempo 
 * inicial.
 **/
function reiniciaJogo () {
	campo.attr("disabled", false);
	campo.val("");

	$("#contador-palavras").text("");
	$("#contador-caracteres").text("");
	$("#tempo-digitacao").text(tempoInicial);

	inicializaCronometro();

	campo.toggleClass("campo-desativado");
	campo.removeClass("campo-errado");
	campo.removeClass("campo-correto")
}

/*
 * on          >> escuta os eventos (o tempo todo)
 * text        >> modifica ou acessa o valor dentro de uma tag, ex: span
 * split       >> separa por espaços
 * val         >> acessa o valor dentro do input / textarea (value)
 * S+          >> expressão regular que busca por espaço vazio
 * focus       >> detecta quando entra no textarea
 * attr        >> modifica ou acessa o atributo, ex: rows
 * one         >> escuta o evento apenas uma vez
 * toggleClass >> add/retira a classe automaticamente
**/