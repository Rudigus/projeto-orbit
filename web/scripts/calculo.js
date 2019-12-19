console.log("oi");

var truee = false;
var botaoCalcular = document.getElementById("botaoCalcular");
var botaoCalcular2 = document.getElementById("botaoCalcular2");
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
	p = new Cabecalho("","","",listaMonomiosEsquerdo,listaMonomiosDireito);
	console.log(p.aplicarValorParcial(dicionario));
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
    console.log(p.aplicarValorParcial(dicionario));
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
