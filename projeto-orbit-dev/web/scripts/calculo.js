//Função que resgata a do firebase os objetos
function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xmlHttp.responseText); // prints the ip address
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true)
    xmlHttp.send(null);
}
//Escolha do local especifico onde será resgatado os objetos e a chamada da função
httpGetAsync("https://projeto-orbit.firebaseio.com/cabecalhos/cabecalho_03/materia/fisica.json", function() {})

//Classe Monomio, base de todo o processo de análise.
class Monomio {
    constructor(_coeficiente = 1  ,_incognitas = [],_expoenteIncognitas = []){
        this._coeficiente = _coeficiente; //atributo do tipo float
        this._incognitas = _incognitas; //atributo do tipo lista de strings
        this._expoenteIncognitas = _expoenteIncognitas; //atributo do tipo lista de floats

    }
}

//Classe Polinomio que reune monomios de forma a podê-los escrever de forma mais fácil e organizada.
class Polinomio{
    constructor(_monomio = []){
        this._monomio = _monomio;//atributo do tipo lista de monomios
    }
}

function listasIguais(lista1, lista2) {

	// checar se as listas possuem o mesmo tamanho
	if (lista1.length !== lista2.length) return false;

	// checar se todos os itens existem e se estão na mesma ordem
	for (var i = 0; i < lista1.length; i++) {
		if (lista1[i] !== lista2[i]) return false;
	}

	// se tudo estiver bem, é porque as listas são iguais
	return true;

};

//Essa função será responsável por somar os monomios iguais em apenas um lado da equação
function somarMonomiosParte1(ListaAnalise){
    let a , b ;

    for(a=0 ; a < ListaAnalise.length; a++){
        if(typeof ListaAnalise[a] !== "undefined"){
         //Até aqui será pego um monomio da lista de monomios de um dos lados da equação e verificado se ele existe
          for(b = 0 ; b < ListaAnalise.length; b++){
            if(typeof ListaAnalise[b] !== "undefined" && !Object.is(ListaAnalise[a],ListaAnalise[b])){
                //Até aqui será pego outro monomio dessa mesma lista, verificado se ele existe e se ele não é o mesmo monomio escolhido anteriormente
                if(listasIguais(ListaAnalise[a]._incognitas,ListaAnalise[b]._incognitas) && listasIguais(ListaAnalise[a]._expoenteIncognitas,ListaAnalise[b]._expoenteIncognitas) || !ListaAnalise[a]._incognitas.length && !ListaAnalise[b]._incognitas.length){
                    //Aqui será verificado se os expoentes e incógnitas dos dois monomios escolhidos são iguais ou se ambas essas listas não possuem nenhum elemento
                   ListaAnalise[a]._coeficiente += ListaAnalise[b]._coeficiente;
                   ListaAnalise = ListaAnalise.splice(b,1);
                   //Até aqui será somado os dois coeficientes dos dois monomios de mesmas incógnitas e expoentes e descartado da lista o segundo monomio escolhido
                   //que não existe mais
                if(!ListaAnalise[a]._coeficiente){
                    ListaAnalise = ListaAnalise.splice(a,1);
                    //Se a soma anteriormente calculada for 0 , então o primeiro monomio deve ser descartado também
                }
                }

            }
          }
        }
    }
    return ListaAnalise;
    // retorna a nova lista sem monomios repetidos em cada lado da equação
}

// Essa função é responsável por somar os monomios iguais dos dois lados da equação
function somarMonomiosParte2(ListaAnalise1,ListaAnalise2){
    let a , b ;

    for(a=0 ; a < ListaAnalise1.length; a++){
        if(typeof ListaAnalise1[a] !== "undefined"){
            //Até aqui se pega um monomio do lado esquerdo da equação e verifica-se se ele existe
          for(b = 0 ; b < ListaAnalise2.length; b++){
            if(typeof ListaAnalise2[b] !== "undefined" && !Object.is(ListaAnalise1[a],ListaAnalise2[b])){
                //Até aqui se pega um outro monomio do lado direito da equação e verifica-se se ele existe
                if(listasIguais(ListaAnalise1[a]._incognitas,ListaAnalise2[b]._incognitas) && listasIguais(ListaAnalise1[a]._expoenteIncognitas,ListaAnalise2[b]._expoenteIncognitas) || !ListaAnalise1[a]._incognitas.length && !ListaAnalise2[b]._incognitas.length){
                   ListaAnalise1[a]._coeficiente -= ListaAnalise2[b]._coeficiente;
                   ListaAnalise2 = ListaAnalise2.splice(b,1);
                   //Até aqui verifica-se se os dois monomios escolhidos possuem as mesmas incógnitas e os mesmos respectivos expoentes,
                   //em seguida soma-se ao coeficiente do primeiro menos o coeficiente do segundo por estarem em lados opostos da equação
                   //e , por fim, elimina-se o segundo monomio já que se valor já está junto com o primeiro monomio.
                   if(!ListaAnalise1[a]._coeficiente){
                    ListaAnalise1 = ListaAnalise1.splice(a,1);
                    //Se a diferença anteriormente calculada for 0 , então o primeiro monomio deve ser descartado também
                }
                }

            }
          }
        }
    }
    return (ListaAnalise1,ListaAnalise2);
    // retorna a novas listas sem monomios repetidos em toda a equação
}

// Essa função é responsável por separar do lado esquerdo da equação os monomios com variáveis e do lado direito os monomios sem variáveis
function organizarPolinomio(ListaAnalise1,ListaAnalise2){
    let a , b , c, d;
    listaDefinitiva1 = [];
    listaDefinitiva2 = [];

    //Neste comando será verificado cada um dos monomios do lado esquerdo da equação e visto se existe algum monomio sem incognita entre eles
    //se existir, seu coenficiente é trocado pois ele mudará de lado na equação e ele será adicionado para a listaDefinitiva2
    for(a=0 ; a < ListaAnalise1.length; a++){
        if(!ListaAnalise1[a]._incognitas.length){
            ListaAnalise1[a]._coeficiente = -ListaAnalise1[a]._coeficiente
            listaDefinitiva2.push(ListaAnalise1[a]);
    }
        else{
            listaDefinitiva1.push(ListaAnalise1[a]);
            //Se esse monomio escolhido tiver incognita, então ele é adicionado pra listaDefinitiva1
        }
}
    //Aqui será verificado cada monomio do lado direito da equação e se ele possui alguma variável qualquer, se ele possuir ,
    //seu coenficiente é trocado pois ele mudará de lado na equação e ele será adicionado para a listaDefinitiva1
    for(b = 0 ; b < ListaAnalise2.length; b++){
        if(ListaAnalise2[b]._incognitas.length){
            ListaAnalise2[b]._coeficiente = -ListaAnalise2[b]._coeficiente
            listaDefinitiva1.push(ListaAnalise2[b]);
        }
        else{
            listaDefinitiva2.push(ListaAnalise2[b]);
            //Se esse monomio escolhido não tiver incognita, então ele é adicionado pra listaDefinitiva2
        }
    // Com as devidas listasDefinitvas preenchidas, esvaziaremos as listas dadas como parâmetros
    }
    while(ListaAnalise1.length) {
        ListaAnalise1.pop();
    }
    while(ListaAnalise2.length) {
        ListaAnalise2.pop();
    }
    // Em seguida essas listas vazias serão preenchidas com os elementos correspondentes das respectivas listasDefinitivas
    for(c = 0 ; c < listaDefinitiva1.length ; c++){
        ListaAnalise1.push(listaDefinitiva1[c]);
    }
    for(d = 0 ; d < listaDefinitiva2.length ; d++){
        ListaAnalise2.push(listaDefinitiva2[d]);
    }
    return (ListaAnalise1,ListaAnalise2);
    //Retornando as listas dadas com os monomios nos lugares apropriados da equação
}
//Esse método serve apenas para um efeito estético de que o primeiro monomio da esquerda da equação não tenha um expoente negativo
function organizarSinais(ListaAnalise1,ListaAnalise2){
    let a , b;
    console.log(ListaAnalise1);
    //Se o expoente do primeiro monomio da esquerda da equação tiver um coeficiente negativo,
    //todos os sinais dos coeficientes de ambos os lados da equação serão invertidos
    //que representaria basicamente multiplicar por -1 em ambos os lados
    if(ListaAnalise1[0]._coeficiente < 0){
       for(a = 0 ; a < ListaAnalise1.length ; a++){
           ListaAnalise1[a]._coeficiente = -ListaAnalise1[a]._coeficiente;
       }
       for(b = 0 ; b < ListaAnalise2.length ; b++){
        ListaAnalise2[b]._coeficiente = -ListaAnalise2[b]._coeficiente;
       }
    }
}
//Classe PropriedadesAritmeticas cujos objetos serão responsáveis por povoar a tela "Propriedades Aritmeticas"
class PropriedadesAritmeticas{
    constructor(_assunto, _topico, _titulo, _descrição){
        this._assunto = _assunto;//atributo do tipo string
        this._topico = _topico;//atributo do tipo string
        this._titulo = _titulo;//atributo do tipo string
        this._descrição = _descrição;//atributo do tipo string
    }
}

//Classe Cabeçalho cujos objetos serão responsáveis por povoar a tela "Calculadora" .
class Cabecalho{
    constructor(_assunto, _materia, _formulaDisplay,  _formulaEsquerda = [], _formulaDireita = [], _exemplos = [],_nomeParametros = []){
        this._assunto = _assunto;//atributo do tipo string
        this._materia = _materia;//atributo do tipo string
        this._formulaDisplay = _formulaDisplay; // atributo a ser definido
        this._formulaEsquerda = _formulaEsquerda;//atributo do tipo lista de monomios que está do lado esquerdo da igualdade
        this._formulaDireita = _formulaDireita; //atributo do tipo lista de monomios que está do lado direito da igualdade
        this._exemplos = _exemplos;//atributo do tipo lista de strings
        this._nomeParametros = _nomeParametros;//atributo do tipo lista de strings
     }
     //Método utilizado na calculadora em que dado um certo valor de uma variável e sua respectiva equação, encontra-se o f dessa equação
     aplicarValorCompleto(_ListaMonomio,_dicionario ={}){
        let i, k, l,  letra = 0,  res = 1, res2 = 0;
        let alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        let alfabetoInverso = ["1/a","1/b","1/c","1/d","1/e","1/f","1/g","1/h","1/i","1/j","1/k","1/l","1/m","1/n",
                               "1/o","1/p","1/q","1/r","1/s","1/t","1/u","1/v","1/w","1/x","1/y","1/z"]
        let keyCount;

        //primeiro escolhe-se um monomio da lista dada
        for(i = 0 ; i < _ListaMonomio.length; i++){
             //Em seguida escolhe-se uma varíavel desse monomio
            for(k = 0,  keyCount = Object.keys(_ListaMonomio[i]._incognitas).length;  k < keyCount; k++){
                for(l = 0; l < alfabeto.length ; l++){
                    //Aqui essa variável é comparada com as letras do alfabeto para ver qual é
                    if(alfabeto[l] == _ListaMonomio[i]._incognitas[k]){
                        //Quando a letra for devidamente identificada o valor dela , dado pelo dicionário, é atribuida à variável valor
                        // e , em seguida, a variável letra recebe esse valor elevado ao seu respectivo expoente e multiplicado a uma outra
                        //variável res que seria uma "simulação" do coeficiente
                        let valor = _dicionario[alfabeto[l]];
                        letra = Math.pow(valor,_ListaMonomio[i]._expoenteIncognitas[k]);
                        res = res*letra;
                        //Assim o processo se repete até todas as variáveis que multipliquem o monomio sejam checadas e seu respectivo valor atribuido a res
                    }
                }
                //Esse for é para quando o monomio tiver uma letra dividindo em vez de multiplicando
                for(l = 0; l < alfabetoInverso.length ; l++){
                    //Aqui verifica se a incógnita escolhida faz parte do "alfabeto inverso"
                    if(alfabetoInverso[l] == _ListaMonomio[i]._incognitas[k]){
                        //Se ela for, o valor dela, dado no dicionário, é atribuido á variável valor
                        //Em seguida, este mesmo valor elevado ao seu respectivo coeficiente é atribuido á variável letra
                        //E, por fim, o valor de letra é multiplicado a uma outra variável res que seria uma "simulação" do coeficiente
                        let valor = _dicionario[alfabeto[l]];
                        letra = Math.pow(valor,_ListaMonomio[i]._expoenteIncognitas[k]);
                        res = res*(letra);
                        //Assim o processo se repete até todas as variáveis que dividem o monomio sejam checadas e seu respectivo valor atribuido a res
                    }

                 }
                }
                //Depois de todo o monomio ser devidamente verificado, resta apenas levar em consideração o valor do próprio coeficiente
                res = res*_ListaMonomio[i]._coeficiente;
                //Aqui se é adicionado o valor total do monomio, esta variável receberá o valor total de todos os monomios
                //e receberá o resultado numérico total.
                res2 += res;
                res = 1;
        }
        return Math.round(res2*100)/100;
    }
    //Aqui se encontra a função responsável pela funcionalidade da calculadora em geral, ela basicamente aplica valores
    //nas equações ou fórmulas recebidas
    aplicarValorParcial(_dicionario ={}){
        let i, k, l, m, letra = 0,  res = 1, res2 = 0;
        let alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","V0","Vf","w","x","y","z"]
        let alfabetoInverso = ["1/a","1/b","1/c","1/d","1/e","1/f","1/g","1/h","1/i","1/j","1/k","1/l","1/m","1/n","1/o",
                               "1/p", "1/q","1/r","1/s","1/t","1/u","1/v","1/V0","1/Vf","1/w","1/x","1/y","1/z"]
        let keyCount;
        let novaLista = [];
        let novaLista2 = [];

        //Primeiro se é escolhido um monomio da lista dada no lado esquerdo da equação
        for(i = 0 ; i < this._formulaEsquerda.length; i++){
            let _letiavelMonomio = [];
            let _letiavelExpoente = [];
             //Em seguida se é escolhido uma variável desse monomio
            for(k = 0,  keyCount = Object.keys(this._formulaEsquerda[i]._incognitas).length;  k < keyCount; k++){
                //Aqui se trata do caso em que a variável multiplica o monomio
                for(l = 0; l < alfabeto.length ; l++){
                    //Esses dois if's servem para checar qual a letra do alfabeto é aquela que se está sendo analisada
                    //e se o valor dessa variável foi definido no dicionário ou não
                    if(alfabeto[l] == this._formulaEsquerda[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] != 'undefined'){
                        //Nesta parte, o valor da variável foi definido no dicionário, logo este valor é atribuida à variável valor
                        // e , em seguida, a variável letra recebe esse valor elevado ao seu respectivo expoente e multiplicado a uma outra
                        //variável res que seria uma "simulação" do coeficiente
                        let valor = _dicionario[alfabeto[l]];
                        letra = Math.pow(valor,this._formulaEsquerda[i]._expoenteIncognitas[k]);
                        res = res*letra;
                        //Assim o processo se repete até todas as variáveis que multipliquem o monomio sejam checadas e seu respectivo valor atribuido a res
                    }
                    if(alfabeto[l] == this._formulaEsquerda[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] == "undefined" ){
                         //Se a variável não tiver seu valor definido no dicionário, essa variável e seu respectivo expoente serão
                         //adicionados para as respectivas listas de expoentes e incógnitas criadas anteriormente para formarem um novo
                         //monomio
                        _letiavelMonomio.push(this._formulaEsquerda[i]._incognitas[k]);
                        _letiavelExpoente.push(this._formulaEsquerda[i]._expoenteIncognitas[k]);

                    }
                }
                //O que foi realizado nos dois for's anteriores também será realizado nesse, mas agora para variáveis que dividem o monomio
                for(l = 0; l < alfabetoInverso.length ; l++){
                    if(alfabetoInverso[l] == this._formulaEsquerda[i]._incognitas[k] && typeof _dicionario[alfabetoInverso[l]] !== "undefined"){
                        let valor = _dicionario[alfabetoInverso[l]];
                        letra = Math.pow(valor,this._formulaEsquerda[i]._expoenteIncognitas[k]);
                        res = res*(letra);


                    }
                    if(alfabetoInverso[l] == this._formulaEsquerda[i]._incognitas[k] &&  typeof _dicionario[alfabetoInverso[l]] == "undefined" ){
                        _letiavelMonomio.push(this._formulaEsquerda[i]._incognitas[k]);
                        _letiavelExpoente.push(this._formulaEsquerda[i]._expoenteIncognitas[k]);
                    }
                 }
                }
                //Após analisados todas as incógnitas do monomio, resta agora pegar o resultado obtido e multiplicar ainda
                //pelo coeficiente do monomio
                res = Math.round(res*this._formulaEsquerda[i]._coeficiente*100)/100;
                //Este if verifica se o monomio criado possue coeficiente zero para não criar um monomio com este coeficiente
                if(this._formulaEsquerda[i]._coeficiente != 0){
                    //Aqui cria-se um novo monomio para substituir o anterior analisado com os valores devidamente
                    //substituidos e as variaveis restantes sem valor
                    let Reserva = new Monomio(res,_letiavelMonomio,_letiavelExpoente);
                    novaLista.push(Reserva);
                }
                res = 1;
        }

        //Essa outra metade do código tem a mesma lógica da primeira metade mais agora é para o lado direito da equação
        //e , consequentemente, para a outra lista formada
        for(i = 0 ; i < this._formulaDireita.length; i++){
            let _letiavelMonomio = [];
            let _letiavelExpoente = [];

            for(k = 0,  keyCount = Object.keys(this._formulaDireita[i]._incognitas).length;  k < keyCount; k++){
                for(l = 0; l < alfabeto.length ; l++){
                    if(alfabeto[l] == this._formulaDireita[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] !== 'undefined'){
                        let valor = _dicionario[alfabeto[l]];
                        letra = Math.pow(valor,this._formulaDireita[i]._expoenteIncognitas[k]);
                        res = res*letra;
                    }
                    if(alfabeto[l] == this._formulaDireita[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] == "undefined" ){
                        _letiavelMonomio.push(this._formulaDireita[i]._incognitas[k]);
                        _letiavelExpoente.push(this._formulaDireita[i]._expoenteIncognitas[k]);
                    }
                }
                for(l = 0; l < alfabetoInverso.length ; l++){
                    if(alfabetoInverso[l] == this._formulaDireita[i]._incognitas[k] &&  typeof _dicionario[alfabeto[l]] !== 'undefined'){
                        let valor = _dicionario[alfabetoInverso[l]];
                        letra = Math.pow(valor,this._formulaDireita[i]._expoenteIncognitas[k]);
                        res = res*(letra);
                 }
                    if(alfabetoInverso[l] == this._formulaDireita[i]._incognitas[k] &&  typeof _dicionario[alfabetoInverso[l]] == "undefined" ){
                       _letiavelMonomio.push(this._formulaDireita[i]._incognitas[k]);
                       _letiavelExpoente.push(this._formulaDireita[i]._expoenteIncognitas[k]);
                }
                }

        }
                 res = Math.round(res*this._formulaDireita[i]._coeficiente*100)/100;
                 if(this._formulaDireita[i]._coeficiente != 0){
                    let Reserva = new Monomio(res,_letiavelMonomio,_letiavelExpoente);
                    novaLista2.push(Reserva);
                }
                 res = 1
    }
        //Nessa parte apenas são utilizados os comandos previamente detalhados para uma maior organização da equação
        somarMonomiosParte1(novaLista);
        somarMonomiosParte1(novaLista2);
        somarMonomiosParte2(novaLista,novaLista2);
        organizarPolinomio(novaLista,novaLista2);
        organizarSinais(novaLista,novaLista2);

        return novaLista,novaLista2;
        //Finaliza-se o processo retornando as duas listas previamente dadas com os valores devidamente substituidos e organizados
    }
}
var truee = false;
var botaoCalcular = document.getElementById("botaoCalcular");
var botaoCalcular1 = document.getElementById("botaoCalcular1");
var inputCalculadora = document.getElementById("inputCalculadora");
var exibidor = document.getElementById("exibidor");
var listaMonomios = [];
var listaMonomiosEsquerdo = [];
var listaMonomiosDireito = [];
var A = 0;
var a1 = 0;
var B = 0;
var b1 = 0;
var C = 0;
var c1 = 0;
var tr = true;
var x = [];
var y = [];
var numerodeGraficos = 0;
class obterInformaçesMonomio {
  construtor(polinomio) {
    this.polinomio = polinomio;
  }
  ganharInformaçoes(polinomio) {
    var alfabeto = "abcdefghijklmnopqrstuvwxyz~´";
    var index = [];
    var indexx = [];
    var auxi = [];
    var auxo = 0;
    var j = 0;
    var k = 0;
    var aux = 0;
    var _Coeficiente;
    var _incognitas = [];
    var _expoenteIncognitas = [];
    alfabeto.split();
    var i = 0;
    var l;
    var w = 0;
    var z = false;
    while (w < polinomio.length) {
      while (i < 28) {
        index[k] = polinomio[w].indexOf(alfabeto[i]);
        if (index[k] != -1 && i != 27) {
          k += 1;
          index[k + 1] = -1;
        }
        if (index[k] == -1) {
          index.pop();
        }
        i += 1;
      }
      i = 0;
      console.log(index.length);
      if (index.length != 1) {
        while (auxo < k && index.length > 1) {
          while (i < k) {
            if (index[aux] <= index[i + 1]) {
              auxi[auxo] = aux;
            } else if (index[aux] > index[i + 1]) {
              aux = i + 1;
              auxi[auxo] = aux;
            }
            i += 1;
          }
          indexx[auxo] = index[auxi[auxo]];
          index[auxi[auxo]] = 1000;
          auxo += 1;
          aux = 0;
          i = 0;
        }
      }
      i = 0;
      if (index.length == 1) {
        l = polinomio[w].substring(index[0] + 1);
        l = l.split("");
        if (index[0] != 0) {
          console.log(isNaN(polinomio[w].substring(index[0] + 1)));
          console.log(polinomio[w].substring(index[0] + 2));
          _incognitas[0] = polinomio[w].substring(index[0], index[0] + 1);
          _Coeficiente = polinomio[w].substring(0, index[0]);
          if (l.length == 0) {
            _expoenteIncognitas[0] = 1;
          } else {
            _expoenteIncognitas[0] = polinomio[w].substring(index[0] + 2);
          }
        } else {
          _incognitas[0] = polinomio[w].substring(index[0], index[0] + 1);
          _Coeficiente = 1;
          if (l.length == 0) {
            _expoenteIncognitas[0] = 1;
          } else {
            _expoenteIncognitas[0] = polinomio[w].substring(index[0] + 2);
          }
        }
      } else {
        l = [];
        if (indexx[0] != 0) {
          _Coeficiente = polinomio[w].substring(0, indexx[0]);
        } else {
          _Coeficiente = 1;
        }
        while (i < k) {
          _incognitas[i] = polinomio[w].substring(indexx[i], indexx[i] + 1);
          if (i + 1 == k) {
            l = polinomio[w].substring(indexx[i] + 1);
            l = l.split("");
            if (l.length == 0) {
              _expoenteIncognitas[i] = 1;
            } else {
              _expoenteIncognitas[i] = polinomio[w].substring(indexx[i] + 2);
            }
          } else {
            if (isNaN(polinomio[w].substring(indexx[i] + 2, indexx[i + 1]))) {
              _expoenteIncognitas[i] = 1;
            } else {
              _expoenteIncognitas[i] = polinomio[w].substring(indexx[i] + 2, indexx[i + 1]);
            }
          }
          i += 1;
        }
      }
      j = 0;
      console.log("coeficiente:\n" + _Coeficiente)
      console.log(_incognitas);
      console.log(_expoenteIncognitas);
	  if(tr){
		var monomio9 = new Monomio(_Coeficiente, _incognitas, _expoenteIncognitas);
		listaMonomiosEsquerdo[w] = monomio9;
		monomio9 = {};
	  }else{
		  var monomio11 = new Monomio(_Coeficiente, _incognitas, _expoenteIncognitas);
		  listaMonomiosDireito[w] = monomio11;
		  monomio11 = {};
	  }
      _Coeficiente = 0;
      _expoenteIncognitas = [];
      _incognitas = [];
      aux = 0;
      auxo = 0;
      k = 0;
      j = 0;
      i = 0;
      w += 1;
      l = [];
    }
	if(tr){
    return listaMonomiosEsquerdo;
	}else{
		return listaMonomiosDireito;
	}
  }
}
botaoCalcular1.onclick = function printar1() {
  numerodeGraficos = 2;
  botaoCalcular.click();
}
botaoCalcular.onclick = function printar() {
  var n = 0;
  var informacoes = inputCalculadora.value;
  var p = 0;
  var e = 0;
  var repete = false;
  var polinomioEsquerdo;
  var polinomioDireito;
  var iguais;
  var iguais1;
  var iguais2 = [];
  var iguais3 = [];
  var listaMonomioUnico = [];
  var variav;
  n = informacoes.indexOf(",");
  var dicionarioUnico = {};
  if (n != -1) {
    var alfabetin = "abcdefghijklmnopqrstuvwxyz";
    alfabetin.split();
    iguais = informacoes.substring(0, n);
    iguais1 = informacoes.substring(n);
    n = 0;
    while (n < 26) {
      iguais2[n] = iguais.indexOf(alfabetin[n]);
      iguais3[n] = iguais1.indexOf(alfabetin[n]);
      if (iguais2[n] != -1 && iguais3[n] != -1) {
        repete = true;
      }
      n += 1;
    }
    n = 0;
  }
  if (informacoes.indexOf(",") == -1 && informacoes.indexOf("=") != -1) {
    p = informacoes.indexOf("=");
    polinomioDireito = informacoes.substring(p + 1);
    if (p != -1) {
      polinomioEsquerdo = informacoes.substring(0, p);
    }
    n = polinomioEsquerdo.indexOf("-");
      while (n != -1) {
      // console.log(n);
      // console.log(polinomioEsquerdo);
      polinomioEsquerdo = polinomioEsquerdo.substring(0, n) + "+" + polinomioEsquerdo.substring(n);
      n = polinomioEsquerdo.indexOf("-", n + 2);
    }
    n = polinomioDireito.indexOf("-");
    while (n != -1) {
      // console.log(m);
      // console.log(polinomioDireito);
      polinomioDireito = polinomioDireito.substring(0, n) + "+" + polinomioDireito.substring(n);
      n = polinomioDireito.indexOf("-", n + 2);
    }
    polinomioEsquerdo = polinomioEsquerdo.replace(/ /g, '').split("+");
    polinomioDireito = polinomioDireito.replace(/ /g, '').split("+");
    console.log(polinomioEsquerdo);
    console.log(polinomioDireito);
	tr = true;
    var polinomioEsquerdo1 = new obterInformaçesMonomio(polinomioEsquerdo);
    listaMonomiosEsquerdo = polinomioEsquerdo1.ganharInformaçoes(polinomioEsquerdo,tr);
	tr = false;
    var polinomioDireito1 = new obterInformaçesMonomio(polinomioDireito);
    listaMonomiosDireito = polinomioDireito1.ganharInformaçoes(polinomioDireito,tr);
	n = 0;
	while(n < listaMonomiosEsquerdo.length){
		if(listaMonomiosEsquerdo[n]._expoenteIncognitas == 2){
			A += listaMonomiosEsquerdo[n]._Coeficiente;
		}else if(listaMonomiosEsquerdo[n]._expoenteIncognitas == 1){
			B += listaMonomiosEsquerdo[n]._Coeficiente;
		}else if(listaMonomiosEsquerdo[n]._expoenteIncognitas == 0){
			C += listaMonomiosEsquerdo[n]._Coeficiente;
		}
		n += 1;
	}
	while(n < listaMonomiosDireito.length){
		if(listaMonomiosDireito[n]._expoenteIncognitas == 2){
			a1 += listaMonomiosDireito[n]._Coeficiente;
		}else if(listaMonomiosDireito[n]._expoenteIncognitas == 1){
			b1 += listaMonomiosDireito[n]._Coeficiente;
		}else if(listaMonomiosDireito[n]._expoenteIncognitas == 0){
			c1 += listaMonomiosDireito[n]._Coeficiente;
		}
		n += 1;
	}
	console.log(listaMonomiosEsquerdo[0]._Coeficiente);
	console.log(A);
	p = new Cabecalho();
	console.log(x.aplicarValorParcial(listaMonomiosEsquerdo,listaMonomiosDireito,dicionario));
}else if(informacoes.indexOf(",") == -1 && informacoes.indexOf("=") == -1){
  truee = true;
  n = 0;
  var alfabeton = "abcdefghijklmnopqrstuvwxyz";
  alfabeton = alfabeton.split("");
  while(n < alfabeton.length){
    if(informacoes.indexOf(alfabeton[n]) != -1){
      variav = alfabeton[n];
    n = 29;
    }
    n+=1;
  }
  n = informacoes.indexOf("-");
  while (n != -1) {
    // console.log(m);
    // console.log(polinomioDireito);
    informacoes = informacoes.substring(0, n) + "+" + informacoes.substring(n);
    n = informacoes.indexOf("-", n + 2);
  }
  informacoes = informacoes.replace(/ /g, '').split("+");
  console.log(informacoes);
  n = -100;
  tr = true;
  var polinomioUnico = new obterInformaçesMonomio(informacoes);
  listaMonomioUnico = polinomioUnico.ganharInformaçoes(informacoes,tr);
  console.log(listaMonomioUnico);
  p = new Cabecalho();
  while(n<=100){
    y[n+100] = n;
    dicionarioUnico[variav] = y[n+100];
    n+=1;
    console.log(p.aplicarValorCompleto(listaMonomioUnico,dicionarioUnico));
    x[n + 100] = p.aplicarValorCompleto(listaMonomioUnico,dicionarioUnico);
  }
}else if (repete == false) {
    var idi = 0;
    var u2 = 0;
    var u1 = 0;
    var u = 0;
    var q = 0;
    var valores = [];
    var variaveis = [];
    informacoes = informacoes.replace(/ /g, '');
    n = informacoes.indexOf("=");
    e = informacoes.indexOf(",");
    while (n != -1) {
      if (idi == 0) {
        variaveis[q] = informacoes.substring(0, n);
        valores[q] = informacoes.substring(n + 1, e);
        idi += 1;
      } else if (e != -1) {
        variaveis[q] = informacoes.substring(u1 + 1, n);
        valores[q] = informacoes.substring(n + 1, e);
      } else {
        variaveis[q] = informacoes.substring(u1 + 1, n);
        valores[q] = informacoes.substring(n + 1);
      }
      u = n;
      u1 = e;
      n = informacoes.indexOf("=", u + 2);
      e = informacoes.indexOf(",", e + 1);
      q += 1;
    }
    idi = 0;
    console.log(variaveis);
    console.log(valores);
    var dicionario = {};
    var dicionarioInverso = {};
    var v;
    var u3;
    while (u2 < variaveis.length) {
      q = variaveis[u2];
      v = "1/" + variaveis[u2];
      u = parseInt(valores[u2], 10);
      u3 = 1 / +u;
      dicionario[q] = u;
      dicionarioInverso[v] = u3;
      u2 += 1;
    }
    console.log(dicionario);
    console.log(dicionarioInverso);
  } else {
    p = informacoes.indexOf("=");
    polinomDireito = iguais.substring(p + 1);
    if (p != -1) {
      polinomEsquerdo = iguais.substring(0, p);
    }
    n = polinomEsquerdo.indexOf("-");
    while (n != -1) {
      // console.log(n);
      // console.log(polinomioEsquerdo);
      polinomEsquerdo = polinomEsquerdo.substring(0, n) + "+" + polinomEsquerdo.substring(n);
      n = polinomEsquerdo.indexOf("-", n + 2);
    }
    n = polinomDireito.indexOf("-");
    while (n != -1) {
      // console.log(m);
      // console.log(polinomioDireito);
      polinomDireito = polinomDireito.substring(0, n) + "+" + polinomDireito.substring(n);
      n = polinomDireito.indexOf("-", n + 2);
    }
    polinomEsquerdo = polinomEsquerdo.replace(/ /g, '').split("+");
    polinomDireito = polinomDireito.replace(/ /g, '').split("+");
    var listaMonomeo = new obterInformaçesMonomio(polinomEsquerdo);
    var listaMonomeo1 = new obterInformaçesMonomio(polinomDireito);
	tr = true;
    listaVerdadeira = listaMonomeo.ganharInformaçoes(polinomEsquerdo,tr);
	tr = false;
    listaVerdadeira1 = listaMonomeo1.ganharInformaçoes(polinomDireito,tr);
    console.log(listaVerdadeira);
    console.log(listaVerdadeira1);
    idi = 0;
    u2 = 0;
    u1 = 0;
    u = 0;
    q = 0;
    valores = [];
    variaveis = [];
    iguais1 = iguais1.replace(/ /g, '');
    n = iguais1.indexOf("=");
    e = iguais1.indexOf(",", 2);
    while (n != -1) {
      if (idi == 0 && e != -1) {
        variaveis[q] = iguais1.substring(1, n);
        valores[q] = iguais1.substring(n + 1, e);
        idi += 1;
      } else if (idi == 0 && e == -1) {
        variaveis[q] = iguais1.substring(1, n);
        valores[q] = iguais1.substring(n + 1);
      } else if (e != -1) {
        variaveis[q] = iguais1.substring(u1 + 1, n);
        valores[q] = iguais1.substring(n + 1, e);
      } else {
        variaveis[q] = iguais1.substring(u1 + 1, n);
        valores[q] = iguais1.substring(n + 1);
      }
      u = n;
      u1 = e;
      n = iguais1.indexOf("=", u + 2);
      e = iguais1.indexOf(",", e + 1);
      q += 1;
    }
    idi = 0;
    console.log(variaveis);
    console.log(valores);
    var dicionario = {};
    var dicionarioInverso = {};
    var v;
    var u3;
    while (u2 < variaveis.length) {
      q = variaveis[u2];
      v = "1/" + variaveis[u2];
      u = parseInt(valores[u2], 10);
      u3 = 1 / +u;
      dicionario[q] = u;
      dicionarioInverso[v] = u3;
      u2 += 1;
    }
    console.log(dicionario);
    console.log(dicionarioInverso);
	p = new Cabecalho("","","",listaVerdadeira, listaVerdadeira1);
	console.log(listaVerdadeira[0]);
    console.log(x.aplicarValorParcial(dicionario));
  }
if(truee == true && numerodeGraficos == 0){
  let myChart = document.getElementById('myChart').getContext('2d');

  // Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = '#777';

  let massPopChart = new Chart(myChart, {
    type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
      labels:y,
      datasets:[{
        label:'',
        data:x,
        //backgroundColor:'green',
        backgroundColor:[
          'rgba(255, 99, 132, 0)',
        ],
        borderWidth:1,
        borderColor:'#777',
        hoverBorderWidth:3,
        hoverBorderColor:'#000',
        pointRadius: 0.01
      }]
    },
    options:{
      title:{
        display:true,
        text:'Esboço do Grafico -1000 a 1000',
        fontSize:25
      },
      legend:{
        display:true,
        position:'right',
        labels:{
          fontColor:'#000'
        }
      },
      layout:{
        padding:{
          left:50,
          right:0,
          bottom:0,
          top:0
        }
      },
      tooltips:{
        enabled:true
      }
    }
  });
}else{
  let myChart1 = document.getElementById('myChart1').getContext('2d');

  // Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = '#777';

  let massPopChart = new Chart(myChart1, {
    type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
      labels:y,
      datasets:[{
        label:'',
        data:x,
        //backgroundColor:'green',
        backgroundColor:[
          'rgba(255, 99, 132, 0)',
        ],
        borderWidth:1,
        borderColor:'#777',
        hoverBorderWidth:3,
        hoverBorderColor:'#000',
        pointRadius: 0.01
      }]
    },
    options:{
      title:{
        display:true,
        text:'Esboço do Grafico -1000 a 1000',
        fontSize:25
      },
      legend:{
        display:true,
        position:'right',
        labels:{
          fontColor:'#000'
        }
      },
      layout:{
        padding:{
          left:50,
          right:0,
          bottom:0,
          top:0
        }
      },
      tooltips:{
        enabled:true
      }
    }
  });
}
numerodeGraficos = 0;
};
