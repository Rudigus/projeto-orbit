class Monomio {

    constructor(_coeficiente = 1  ,_incognitas = ["x"],_expoenteIncognitas = [0]){

        this._coeficiente = _coeficiente;

        this._incognitas = _incognitas;

        this._expoenteIncognitas = _expoenteIncognitas;

        

    }

}



class Polinomio{

    constructor(_monomio = []){

        this._monomio = _monomio;

    }

}



class Equacao{

    constructor(_polinomioEsquerda , _polinomioDireita){

        this._polinomioEsquerda = _polinomioEsquerda;

        this._polinomioDireita = _polinomioDireita;

    }

}



class Resolucao{

    cosntructor(_passos = [],_identificador){

        this._passos = _passos;

        this._identificador = _identificador;

    }

}



class Cabecalho{

    constructor(_assunto, _materia,_formula,_exemplo = [],_resolucao,_nomeParametros){

        this._assunto = _assunto;

        this._materia = _materia;

        this._formula = _formula;

        this._exemplo = _exemplo;

        this._resolucao = _resolucao;

        this._nomeParametros = _nomeParametros;

     }

     aplicarValores(_ListaMonomio1,_ListaMonomio2,_dicionario ={}){

        var i, k, l,  letra = 0,  res = 1, res2 = 0;

        var alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

        var keyCount;



        for(i = 0 ; i < ListaMonomio1.length; i++){



            for(k = 0,  keyCount = Object.keys(ListaMonomio1[i]._incognitas).length;  k < keyCount; k++){

                for(l = 0; l < alfabeto.length ; l++){

                    if(alfabeto[l] == ListaMonomio1[i]._incognitas[k]){

                        var valor = _dicionario[alfabeto[l]];

                        letra = Math.pow(valor,ListaMonomio1[i]._expoenteIncognitas[k]);

                        res = res*letra;

                    }

                }

                 }

                 res = res*ListaMonomio1[i]._coeficiente;

                 res2 += res;

                 res = 1;

    

        }



        for(i = 0 ; i < ListaMonomio2.length; i++){



            for(k = 0,  keyCount = Object.keys(ListaMonomio2[i]._incognitas).length;  k < keyCount; k++){

                for(l = 0; l < alfabeto.length ; l++){

                    if(alfabeto[l] == ListaMonomio2[i]._incognitas[k]){

                        var valor = _dicionario[alfabeto[l]];

                        letra = Math.pow(valor,ListaMonomio2[i]._expoenteIncognitas[k]);

                        res = res*letra; 

                    }

                }

                 }

                 res = res*ListaMonomio1[i]._coeficiente;

                 res2 -= res;

                 res = 1;

    

        }





        return console.log(res2);

    }

    

     elaborarResolucao2(_ListaMonomio1,_ListaMonomio2,_identificador){

         var i , a = 0 , b = 0, c = 0, R1 = 0 , R2 = 0;

          

         

if(_identificador == "01"){

         for(i = 0 ; i < ListaMonomio1.length; i++){

             if(ListaMonomio1[i]._expoenteIncognita == 2){

                 a += ListaMonomio1[i]._coeficiente;

             }

             if(ListaMonomio1[i]._expoenteIncognita == 1){

                b += ListaMonomio1[i]._coeficiente;

            }

            if(ListaMonomio1[i]._expoenteIncognita == 0){

                c += ListaMonomio1[i]._coeficiente;

            }

        }

        for(i = 0 ; i < ListaMonomio2.length; i++){

            if(ListaMonomio2[i]._expoenteIncognita == 2){

                a -= ListaMonomio2[i]._coeficiente;

            }

            if(ListaMonomio2[i]._expoenteIncognita == 1){

               b -= ListaMonomio2[i]._coeficiente;

           }

           if(ListaMonomio2[i]._expoenteIncognita == 0){

               c -= ListaMonomio2[i]._coeficiente;

           }

       }



         R1 = (-b+Math.round(Math.sqrt(b**2-4*a*c)*100)/100)/(2*a);

         R2 = (-b-Math.round(Math.sqrt(b**2-4*a*c)*100)/100)/2*a;



         R1 = Math.round(R1*100)/100;

         R2 = Math.round(R2*100)/100;



         return console.log(R1, R2);

         }

    }

}





var lista1 = ["x","y"];

var lista3 = [2,2];



var lista4 = ["y","x"];

var lista6 = [1,1];



var lista7 = ["x"];

var lista9 = [0,0];



var lista10 = ["x"];

var lista12 = [0];



var dicionario ={"x":3,"y":4}



var Monomio1 = new Monomio(1,lista1,lista3);

var Monomio2 = new Monomio(-4,lista4,lista6);

var Monomio3 = new Monomio(5,lista7,lista9);

var Monomio4 = new Monomio(Math.round(Math.sqrt(2)*100)/100);

var Monomio5 = new Monomio(1,lista10,lista12);





var ListaMonomio1 = [Monomio1, Monomio2, Monomio3];

var ListaMonomio2 = [Monomio5];





var Polinomio3 = new Polinomio(ListaMonomio1);

var Polinomio4 = new Polinomio(ListaMonomio2);



//var Equacao1 = new Equacao(Polinomio3,Polinomio4);



var exemplo1 = ["X^2-X-8=0", "X^2-4=0" , "3X^2-4X-7=0" , "5^(1\2)X^2-4X+3=0" , "1\2X^2+3\4X+3^(3\2)"];



var passos1 = ["1°passo: identificar quem são a , b  e c , observando na fórmula da equação do 2° grau que a é o coeficiente de x^2 , b é o coeficiente de x e c é o coeficiente sem incógnita."

              ,"2° passo: utilizar a fórmula de bhaskara, substituindo a, b, e c em suas devidas posições."]



var Resolucao1 = new Resolucao(passos1,01)



var Cabecalho1 = new Cabecalho("Equações do 2º Grau","Matemática","x = (-b±sqrt(b^2-4ac)/2a ", exemplo1, passos1 ,"f(x) = a*x**2 + b*x + c");



Cabecalho1.elaborarResolucao2(ListaMonomio1,ListaMonomio2,01);



Cabecalho1.aplicarValores(ListaMonomio1,ListaMonomio2,dicionario);
