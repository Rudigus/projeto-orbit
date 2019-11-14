var ok = document.getElementById("ok");
var ld = document.getElementById("ld");
var le = document.getElementById("le");
var exibidor = document.getElementById("exibidor");
ok.onclick = function printar() {
  let equacao = {
    polinomioEsquerdo: le.value,
    polinomioDireito: ld.value
  };
  let cabecalho = {
    elaborarResolucao: function(equacao){
      let resultado = equacao.polinomioEsquerdo + equacao.polinomioDireito;
      return resultado;
    }
  };
  var resultado = cabecalho.elaborarResolucao(equacao);
  exibidor.innerHTML = "Resultado: " + resultado;
};
