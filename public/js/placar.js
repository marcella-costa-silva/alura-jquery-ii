$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

/* 
 * Função responsável por inserir no placar ao final do jogo. Mostra o placar
 * automaticamente quando o jogo terminar.
 **/
function inserePlacar() {
	var corpoTabela  = $(".placar").find("tbody"); // tbody está dentro de placar
	var numPalavras  = $("#contador-palavras").text();
	var usuario      = $("#usuarios").val();

	var linha = novaLinha(usuario, numPalavras);
	linha.find(".botao-remover").click(removeLinha);

	// coloca a linha dentro do corpo da tabela (no começo)
	corpoTabela.prepend(linha);

	// mostra o placar automaticamente
	$(".placar").slideDown(500); 

	scrollPlacar();
}

/* 
 * Função responsável por assim que acabar o jogo, descer para o placar de acordo
 * com a distância do topo.
 **/
function scrollPlacar() {
	var posicaoPlacar = $(".placar").offset().top;

	$("body").animate({
		scrollTop: posicaoPlacar + "px"
	}, 1000);
}

/* 
 * Função responsável por criar um elemento e retorná-lo.
 **/
function novaLinha(usuario, palavras) {
	var linha          = $("<tr>");
	var colunaUsuario  = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(palavras);
	var colunaRemover  = $("<td>");

	var link  = $("<a>").addClass("botao-remover").attr("href", "#");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone); // icone dentro do link
	colunaRemover.append(link); // link dentro da colunaRemover

	// colunas dentro da linha
	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;
}

/* 
 * Função responsável por remover a linha. Remove o pai do pai (tr), subindo 2 níveis.
 * Remove a linha depois de 1 segundo.
 **/
function removeLinha() {
	event.preventDefault();
	var linha = $(this).parent().parent();
	linha.fadeOut(1000);

	setTimeOut(function() {
		linha.remove();
	}, 1000);
}

/* 
 * Função responsável por exibir o placar quando clicar no botão, ela altera o display 
 * none para display block. Stop evita a repetição do evento.
 **/
function mostraPlacar() {
	$(".placar").stop().slideToggle(600);
}

/* 
 * Função responsável por salvar o placar no servidor através de uma requisição ajax de
 * POST.
 **/
function sincronizaPlacar () {
	var placar = [];
	var linhas = $('tbody > tr'); // primeiro filho direto de tbody
	
	linhas.each(function() {
		// pega o texto do primeiro e segundo "td" através do CSS
		var usuario  = $(this).find("td:nth-child(1)").text(); 
		var palavras = $(this).find("td:nth-child(2)").text();

		var score = {
			usuario: usuario,
			pontos: palavras
		};

		// Coloca dentro do array, salva o score no placar
		placar.push(score);
	});

	var dados = {
		placar: placar
	};

	$.post("http://localhost:3000/placar", dados, function() {
		console.log("Salvou o placar no servidor");

		// Aparecerá o balãozinho quando a requisição for ok
		$(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao sincronizar");
	}).always(function() {
		setTimeout(function() {
			$(".tooltip").tooltipster("close");
		}, 2000);
	}).fail(function () {
		$(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
	});
}

/* 
 * Função responsável por trazer os dados do placar no servidor e preencher a tabela.
 **/
function atualizaPlacar() {
	$.get("http://localhost:3000/placar", function(data) {
		console.log("Busquei os dados no servidor");

		// para cada data que recebe...
		$(data).each(function() {
			var linha = novaLinha(this.usuario, this.pontos);
			linha.find(".botao-remover").click(removeLinha);
			$("tbody").append(linha);
		});
	});
}

/* 
 * toggle      >> mostra ou esconde um elemento (show/hide)
 * slideToggle >> abre devagar
 * slideDown
 * slideUp
 * fadeOut     >> demora mais para "desaparecer"
 * stop        >> para a animação que está fazendo no momento e vai para outra
 * push        >> coloca dentro do array
 **/