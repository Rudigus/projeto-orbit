const divProps = document.getElementById('lista-props');

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true)
    xmlHttp.send(null);
}
//var cabecalhos = JSON.parse(texto);
// var cabecalhoAtual = cabecalhos.cabecalho_01;
// Object.values(cabecalhoAtual.exemplos).forEach(function(textoExemplo) {
//     var item_lista = document.createElement("li");
//     item_lista.innerHTML = textoExemplo;
//     item_lista.style.listStyleType = "disc";
//     lista_exemplos.appendChild(item_lista);
// });

// httpGetAsync('https://projeto-orbit.firebaseio.com/cabecalho.json', function(texto){
//   var cabecalhos = JSON.parse(texto);
//   var cabecalhosMatematica = cabecalhos.materia.matematica;
//   var cabecalhosFisica = cabecalhos.materia.fisica;
//   console.log(cabecalhosMatematica);
//   for(var topico in cabecalhosMatematica){
//     if (Object.prototype.hasOwnProperty.call(cabecalhosMatematica, topico)) {
//       console.log(cabecalhosMatematica[topico].titulo);
//       console.log(cabecalhosMatematica[topico].descricao);
//       var item_lista = document.createElement("li");
//       item_lista.innerHTML = cabecalhosMatematica[topico].descricao;
//       item_lista.style.listStyleType = "disc";
//       divProps.appendChild(item_lista);
//     }
//   }
// });

httpGetAsync('https://projeto-orbit.firebaseio.com/propriedades.json', function(texto){
  // Transforma o texto em um objeto
  // var cabecalhos = texto;
  var propriedades = JSON.parse(texto);
  console.log(propriedades);
  for(var topico in cabecalhosMatematica){
    if (Object.prototype.hasOwnProperty.call(cabecalhosMatematica, topico)) {
      console.log(cabecalhosMatematica[topico].titulo);
      console.log(cabecalhosMatematica[topico].descricao);
      var item_lista = document.createElement("li");
      item_lista.innerHTML = cabecalhosMatematica[topico].descricao;
      item_lista.style.listStyleType = "disc";
      divProps.appendChild(item_lista);
    }
  }
});


  // var cabecalhoAtual = cabecalhos.cabecalho_01;
  //
  // Object.values(cabecalhoAtual.exemplos).forEach(function(textoExemplo)
  // {
  //     var item_lista = document.createElement("li");
  //     item_lista.innerHTML = textoExemplo;
  //     item_lista.style.listStyleType = "disc";
  //     lista_exemplos.appendChild(item_lista);
  // });

/*
httpGetAsync('https://projeto-orbit.firebaseio.com/cabecalhos.json', function(texto){
  // Transforma o texto em um objeto
  var cabecalhos = JSON.parse(texto);
  var cabecalhoAtual = cabecalhos.cabecalho_01;

  Object.values(cabecalhoAtual.exemplos).forEach(function(textoExemplo)
  {
      var item_lista = document.createElement("li");
      item_lista.innerHTML = textoExemplo;
      item_lista.style.listStyleType = "disc";
      lista_exemplos.appendChild(item_lista);
  });
});
*/
