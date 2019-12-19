const lista_exemplos = document.getElementById('exemplos')

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
//var cabecalhos = JSON.parse(texto);
// var cabecalhoAtual = cabecalhos.cabecalho_01;
// Object.values(cabecalhoAtual.exemplos).forEach(function(textoExemplo) {
//     var item_lista = document.createElement("li");
//     item_lista.innerHTML = textoExemplo;
//     item_lista.style.listStyleType = "disc";
//     lista_exemplos.appendChild(item_lista);
// });
httpGetAsync("https://projeto-orbit.firebaseio.com/cabecalhos/cabecalho_03/materia/fisica.json", function() {
    console.log(this); // doesn't print the ip address
})
