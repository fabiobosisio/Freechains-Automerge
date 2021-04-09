// Uso: 1 - Com Sync: node nodesync.js numerodonode endereco:porta numerodovizinho endereço:portadovizinho
//		2 - Sem Sync: node nodesync.js numerodonode endereco:porta 
// coleta o numero do node via linha de comando


// declaração de variáveis e constantes globais
const number = process.argv[2];
const name = "node"+number;
console.log("Nome da origem:"+name)
const next = "node"+process.argv[4];
const source = process.argv[3];
console.log("Endereco da origem:"+source);
let destiny = process.argv[5];
if (destiny !== undefined) { 
	console.log("Nome do destino:"+next)
	console.log("Endereco do destino"+destiny);
}
const titulo = "Sync do Node"+number;
const chain = "$crdt";
//let initialState = {}; 
let initialState = '["~#iL",[["~#iM",["ops",["^0",[["^1",["action","makeMap","obj","c621bf39-f916-4e59-adca-e51690044807"]],["^1",["action","link","obj","00000000-0000-0000-0000-000000000000","key","nodes","value","c621bf39-f916-4e59-adca-e51690044807"]]]],"actor","a7a226aa-cd54-4a46-9526-66c6388bcb1c","seq",1,"deps",["^1",[]]]]]]';
let readlinesync = require('readline-sync');  // módulo e variáveis para input de dados via terminal
let pass = "senha do usuario do "+name;
let password;

// Configurando o objeto automerge
const Automerge = require('automerge')

console.log('\x1b[1m','\x1b[37m','#############################################################################');
console.log('\x1b[1m','\x1b[37m','#                                                                        ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#','\x1b[34m','  888888 88""Yb 888888 888888  dP""b8 88  88    db    88 88b 88 .dP"Y8','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#','\x1b[34m','  88__   88__dP 88__   88__   dP   `" 88  88   dPYb   88 88Yb88 `Ybo."','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#','\x1b[34m','  88""   88"Yb  88""   88""   Yb      888888  dP__Yb  88 88 Y88 o.`Y8b','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#','\x1b[34m','  88     88  Yb 888888 888888  YboodP 88  88 dP""""Yb 88 88  Y8 8bodP`','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                                                        ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                  d888                                  ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                 dP_______                              ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                 Yb"""88""                              ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                 `Ybo 88                                ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                                                        ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#','\x1b[33m','    db    88   88 888888  dP"Yb  8b    d8 888888 88""Yb  dP""b8 888888','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#','\x1b[33m','   dPYb   88   88   88   dP   Yb 88b  d88 88__   88__dP dP   `" 88__  ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#','\x1b[33m','  dP__Yb  Y8   8P   88   Yb   dP 88YbdP88 88""   88"Yb  Yb  "88 88""  ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#','\x1b[33m',' dP""""Yb `YbodP`   88    YbodP  88 YY 88 888888 88  Yb  YboodP 888888','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                                                        ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                 '+titulo+'                          ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#                                                                        ','\x1b[1m','\x1b[37m','#');
console.log('\x1b[1m','\x1b[37m','#############################################################################');



// ----------------------------------------- FUNÇãO ----------------------------------------------------------------------------------------

//Função para obter a chave publica do nó
function keys() {
	console.log('\x1b[36m%s\x1b[0m',`\nGerando as chaves publica e privada do usuario do ${name} ...`);
	const { execSync } = require("child_process");
	let pubpvt = execSync("freechains --host="+source+" crypto pubpvt '"+password+"'");
	return pubpvt;
}

//Função para salvar arquivo em disco sobrescrevendo ou não
function savefile(filename,data,message, flag) {
	try {
		const fs = require('fs');
		if(flag=="write")fs.writeFileSync(filename, data,{encodig: 'utf-8', flag: "wx"});
		if(flag=="overw")fs.writeFileSync(filename, data,{encodig: 'utf-8'});
		console.log('\x1b[36m%s\x1b[0m',message);
	}catch{
		console.log('\x1b[36m%s\x1b[0m',`\nO arquivo ${filename} ja existe!`);
		return;
		}
}

//Função para carregar arquivo em disco
function readfile(filename, message) {
	try {
		const fs = require('fs');
		//const data = fs.readFileSync(filename, 'utf-8');
		const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
		console.log('\x1b[36m%s\x1b[0m',message);
		return data
	}catch{
		console.log('\x1b[36m%s\x1b[0m',`\nO arquivo ${filename} nao existe!`);
		return null;
		}	
}

//Função para postar na cadeia do Freechains
function pubchanges(pvtkey) {
	console.log('\x1b[36m%s\x1b[0m',`\nPostando na cadeia ${chain}...`);	
	const { execSync } = require("child_process");
	//let chksum = execSync('freechains --host='+source+' chain "'+chain+'" post file "changes.network" --sign='+pvtkey);
	let chksum = execSync("freechains --host="+source+" chain '"+chain+"' post file 'changes.network'");
	let fs = require('fs');
	fs.unlink('changes.network', function (err) {
	if (err) throw err;
	});
	console.log('\x1b[36m%s\x1b[0m',`\nApagando o changes.network...`);
	let headsall = execSync("freechains --host="+source+" chain '"+chain+"' heads");
	let head = headsall.toString().substring(0, headsall.indexOf("_"));
	reference = +head;
	return chksum;
}

//Função para enviar a cadeia para o vizinho
function send() {
	console.log('\x1b[36m%s\x1b[0m',`\nEnviando atualizacoes da cadeia ${chain} para o vizinho ${next}...`);
	const { execSync } = require("child_process");
	let send = execSync("freechains --host="+source+" peer "+destiny+" send '"+chain+"'");	
	return send;
}

//Função para receber a cadeia do vizinho
function receive() {
	console.log('\x1b[36m%s\x1b[0m',`\nRecebendo atualizacoes da cadeia ${chain} do vizinho ${next}...`);
	const { execSync } = require("child_process");
	let recv = execSync("freechains --host="+source+" peer "+destiny+" recv '"+chain+"'");
	return recv;
}

//Função para ler o último elemento de uma cadeia decidir se: a cadeia está vazia, se ele já foi lido ou se é novidade.
// se for novidade ele faz um teste trivial de validacao antes de retornar o valor
function readnode() {  
	 // Recebendo a cadeia do vizinho
	if (destiny !== undefined) { 
		console.log(receive().toString());  
	}
	const { execSync } = require("child_process");
	let headsfull = execSync("freechains --host="+source+" chain '"+chain+"' heads");
	let headsall = headsfull.toString().substr(-67); // caso haja mais de um heads filtra arbitrariamente apenas o ultimo
	let head = headsall.toString().substring(0, headsall.indexOf("_")); 
	if (+head == 0) { // se for 0 significa que só possui o genesis
		console.log('\x1b[36m%s\x1b[0m',`\nCadeia vazia (Genesis):`);
		console.log(headsall.toString());
		return ["vazia", null];
	}else{
		let content = execSync("freechains --host="+source+" chain '"+chain+"' get payload "+headsall.toString());
		if (content.toString().indexOf("node") == -1){ // Verifica de o payload possui a palavra node, se não possuir sai
				console.log('\x1b[36m%s\x1b[0m',`\nCadeia invalida:`);
				console.log(headsall.toString());
				return ["invalida", ""];
			}else{
				console.log('\x1b[36m%s\x1b[0m',`\nCadeia valida:`);
				console.log(headsall.toString());		
				return ["valida", content.toString()];
			}
		}
}

// ----------------------------------------- CORPO PRINCIPAL ----------------------------------------------------------------------------------------

// Pede para o usuário digitar a senha
console.log('\x1b[32m',"");
password = readlinesync.question("Digite a senha do usuario do Node "+number+" (ou pressione 'Enter' para a senha padrao: "+pass+"):\n", {defaultInput: pass});
console.log('\x1b[36m%s\x1b[0m',`Obrigado! vamos em frente...`);

// Obtém as chaves pública e privada do usuário e armazena em variáveis distintas
nodekeys = keys() // Obtem as chaves publicas e privadas
nodepubkey = nodekeys.toString().split(' ')[0]; // Filtra a chave publica
nodepvtkey = nodekeys.toString().split(' ')[1]; // Filtra a chave privada
console.log('\x1b[36m%s\x1b[0m',`\nChave publica do usuario:`);
console.log(nodepubkey);
console.log('\x1b[36m%s\x1b[0m',`\nAs chaves foram geradas e armazenadas!`);

// Lê o último elemento da cadeia decidir se: a cadeia está vazia ou válida, ou se é inválida
let values = readnode();


if (values[0] == "vazia" || values[0] == "valida"){

	// Define o estado inicial do JSON	
	/*const init = Automerge.init()
	console.log(Automerge.save(init));
	let nodeinit = Automerge.change(init, function (doc) {
		doc.nodes = initialState;
	});*/

	// Define o estado inicial do JSON
	//let nodeinit = Automerge.from({ nodes: {} })

	// Define o estado inicial do JSON com um arquivo Automerge predefinido
	let nodeinit = Automerge.load(initialState);
	console.log('\x1b[36m%s\x1b[0m',`\nEstado inicial do arquivo ${name}.json:`);
	console.log(nodeinit);
	
	// Tenta obter o arquivo .automerge com as informações históricas gravado localmente 
	console.log('\x1b[36m%s\x1b[0m',`\nTentando obter o arquio ${name}.automerge com as informacoes registradas localmente...`);
	let file = readfile(""+name+".automerge","\nAchou o arquivo "+name+".automerge");
	
	// Se o arquivo existir e seu conteudo não for nulo ela aplica as informações históricas ao estado inicial
	if (file !== null){
		console.log('\x1b[36m%s\x1b[0m',`\nAplicando as informacoes obtidas no arquivo local...`);
		let temp = JSON.stringify(Automerge.getChanges(nodeinit,Automerge.load(file)));
		node = Automerge.applyChanges(nodeinit,JSON.parse(temp));
		console.log('\x1b[36m%s\x1b[0m',`\nArquivo ${name}.json com as informacoes obtidas no arquivo local:`);
		console.log(node)
	}else{
		node = nodeinit; // Senão vai em frente
	}
	
	// Lê o conteudo do heads da cadeia
	let content = values[1];

	// Se o conteudo da cadeia não for nulo ela aplica as alterações lidas na cadeia ao estado anterior 
	if (content !== null){
		console.log('\x1b[36m%s\x1b[0m',`\nAplicando as ultimas alteracoes obtidas na cadeia...`);
		node = Automerge.applyChanges(node,JSON.parse(content));
		console.log('\x1b[36m%s\x1b[0m',`\nArquivo ${name}.json com as alteracoes obtidas na cadeia:`);
		console.log(node);
		
	}

	// Inclui os dados do usuário do nó atual
	const nodechain = node; // Salva uma cópia do estado atual do arquivo JSON
	node = Automerge.change(node, function (doc) { 
		doc.nodes[name] = {"nodename":name, "pubkey":nodepubkey, "address":source};
	});	
	console.log('\x1b[36m%s\x1b[0m',`\nIncluindo os dados do usuario do ${name}...`);
	console.log('\x1b[36m%s\x1b[0m',`\n${name}.json modificado:`);
	console.log(node);
	
	// Verifica se o conteúdo lido da cadeia é igual ao conteúdo com os dados do nó, ou seja o nó já está divulgado na cadeia
	if (JSON.stringify(node) != JSON.stringify(nodechain)){
			
		// Obtém a diferença entre o estado anterior e a inclusão do nó atual
		const nodeupdate = JSON.stringify(Automerge.getChanges(nodeinit,node));

		// Salva a diferença que será enviado pela rede em um arquivo local: changes.automerge
		savefile("changes.network", nodeupdate,"\nO arquivo changes.network foi salvo!", "overw" );

		// Posta o arquivo changes.automerge na cadeia do freechains e o apaga em seguida
		const post = pubchanges(nodepvtkey);
		console.log('\x1b[36m%s\x1b[0m',`\nChecksum da postagem na cadeia:`, '\x1b[37m', `\n${post}`);
		
		// Salva um arquivo local (.diff) com o conteudo do postado na cadeia para comparar o tamanho com o payload total (.automerge)
		savefile(""+post.toString().substr(0,66)+".diff", nodeupdate,"O arquivo "+post.toString().substr(0,66)+".diff foi salvo!", "overw" ); 
		
			
		console.log('\x1b[32m%s\x1b[0m',`\nO no ${name} foi divulgado corretamente na cadeia!`);
	}else{
		console.log('\x1b[32m%s\x1b[0m',`\nO no ${name} ja esta divulgado na cadeia!`);
		}
	// Salva o arquivo local .automerge com os metadados automerge do json
	savefile(""+name+".automerge", Automerge.save(node),"\nO arquivo "+name+".automerge foi salvo!", "overw");

	// Salva o arquivo local .json
	savefile(""+name+".json", JSON.stringify(node),"\nO arquivo "+name+".json foi salvo!", "overw");
	
	// Envia a cadeia local para o vizinho
	if (destiny !== undefined) { 
		console.log(send().toString()); 
	}	

	console.log('\x1b[32m',`\nFim da rotina.\n`)
	
}else{

console.log('\x1b[31m%s\x1b[0m',`Cadeia Invalida\nFim da rotina.\n`);
		
}


				

	
