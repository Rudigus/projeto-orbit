var ok = document.getElementById("ok");
var ld = document.getElementById("ld");
var le = document.getElementById("le");
var exibidor = document.getElementById("exibidor");
ok.onclick = function printar() {
 class equacao{
   constructor(_polinomioEsquerda, _polinomioDireita){
      this._polinomioEsquerda = le.value;
      this._polinomioDireita = ld.value;
    }
  }
  class cabecalho{
    constructor(){}
    elaborarResolucao(_lee,_ldd){
      let resultado = ldd + lee;
      return resultado;
    }
  }
  var lee = le.value;
  var ldd = ld.value;
  cabecalho1 = new cabecalho()
  var resultado = cabecalho1.elaborarResolucao(lee,ldd);
  exibidor.innerHTML = "Resultado: " + resultado;
};
