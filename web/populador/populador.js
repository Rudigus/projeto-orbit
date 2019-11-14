var ok = document.getElementById("ok");
var ld = document.getElementById("ld");
var le = document.getElementById("le");
ok.onclick = function printar() {
  let equacao = {
    polinomioEsquerdo: le.value,
    polinomioDireito: ld.value
  };
  let cabecalho = {
    elaborarResolucao: function(equacao){
      let resultado = equacao.polinomioEsquerdo;
      return resultado;
    }
  };
  var resultado = cabecalho.elaborarResolucao();
  console.log(resultado);
};
