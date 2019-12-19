
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
        for(i = 0 ; i < ListaMonomio.length; i++){
             //Em seguida escolhe-se uma varíavel desse monomio
            for(k = 0,  keyCount = Object.keys(ListaMonomio[i]._incognitas).length;  k < keyCount; k++){
                for(l = 0; l < alfabeto.length ; l++){
                    //Aqui essa variável é comparada com as letras do alfabeto para ver qual é
                    if(alfabeto[l] == ListaMonomio[i]._incognitas[k]){
                        //Quando a letra for devidamente identificada o valor dela , dado pelo dicionário, é atribuida à variável valor
                        // e , em seguida, a variável letra recebe esse valor elevado ao seu respectivo expoente e multiplicado a uma outra 
                        //variável res que seria uma "simulação" do coeficiente
                        let valor = _dicionario[alfabeto[l]];
                        letra = Math.pow(valor,ListaMonomio[i]._expoenteIncognitas[k]);
                        res = res*letra;
                        //Assim o processo se repete até todas as variáveis que multipliquem o monomio sejam checadas e seu respectivo valor atribuido a res
                    }
                }
                //Esse for é para quando o monomio tiver uma letra dividindo em vez de multiplicando
                for(l = 0; l < alfabetoInverso.length ; l++){
                    //Aqui verifica se a incógnita escolhida faz parte do "alfabeto inverso"
                    if(alfabetoInverso[l] == ListaMonomio[i]._incognitas[k]){
                        //Se ela for, o valor dela, dado no dicionário, é atribuido á variável valor
                        //Em seguida, este mesmo valor elevado ao seu respectivo coeficiente é atribuido á variável letra
                        //E, por fim, o valor de letra é multiplicado a uma outra variável res que seria uma "simulação" do coeficiente
                        let valor = _dicionario[alfabeto[l]];
                        letra = Math.pow(valor,ListaMonomio[i]._expoenteIncognitas[k]);
                        res = res*(letra);
                        //Assim o processo se repete até todas as variáveis que dividem o monomio sejam checadas e seu respectivo valor atribuido a res
                    }

                 }
                }
                //Depois de todo o monomio ser devidamente verificado, resta apenas levar em consideração o valor do próprio coeficiente
                res = res*ListaMonomio[i]._coeficiente;
                //Aqui se é adicionado o valor total do monomio, esta variável receberá o valor total de todos os monomios
                //e receberá o resultado numérico total.
                res2 += res;
                res = 1;
        }
        return console.log(Math.round(res2*100)/100);
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

        return console.log(novaLista,novaLista2);
        //Finaliza-se o processo retornando as duas listas previamente dadas com os valores devidamente substituidos e organizados
    }
}


let lista1 = ["x"];
let lista3 = [1];

let lista4 = ["1/y"];
let lista6 = [1];

let lista7 = ["z","1/z"];
let lista9 = [2,1];

let lista10 = ["z","1/z"];
let lista12 = [2,1];

let lista13 = ["V0"];
let lista14 = [2];

let lista15 = ["a","s"];
let lista16 = [1,1];


let dicionario ={"y":4,"1/y":1/4,"z":5,"1/z":1/5};
let dicionario2 ={"y":4, "1/y":1/4};
let dicionario4 ={"V0":5,"a":4,"1/a":1/4,"s":2};

let Monomio1 = new Monomio(1/2,lista1,lista3);
let Monomio2 = new Monomio(-4,lista4,lista6);
let Monomio3 = new Monomio(5,lista7,lista9);
let Monomio4 = new Monomio(Math.round(Math.sqrt(2)*100)/100);
let Monomio5 = new Monomio(5,lista10,lista12);
let Monomio6 = new Monomio(1,lista10,lista12);
let Monomio7 = new Monomio(1,lista13,lista14);
let Monomio8 = new Monomio(2,lista15,lista16);


let ListaMonomio1 = [Monomio1];
let ListaMonomio2 = [Monomio3,Monomio2];


let Polinomio3 = new Polinomio(ListaMonomio1);
let Polinomio4 = new Polinomio(ListaMonomio2);

let exemplo1 = ["X^2-X-8=0", "X^2-4=0" , "3X^2-4X-7=0" , "5^(1\2)X^2-4X+3=0" , "1\2X^2+3\4X+3^(3\2)"];

let passos1 = ["1°passo: identificar quem são a , b  e c , observando na fórmula da equação do 2° grau que a é o coeficiente de x^2 , b é o coeficiente de x e c é o coeficiente sem incógnita."
              ,"2° passo: utilizar a fórmula de bhaskara, substituindo a, b, e c em suas devidas posições."];

let Cabecalho1 = new Cabecalho("Equações do 2º Grau","Matemática","x = (-b±sqrt(b^2-4ac)/2a ", exemplo1, passos1 ,"f(x) = a*x**2 + b*x + c");

let Cabecalho2 = new Cabecalho(" Equação de Torricelli","Física","",ListaMonomio1,ListaMonomio2,"","");

Cabecalho2.aplicarValorParcial(dicionario);

