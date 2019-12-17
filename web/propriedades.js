//Está sendo pego no banco de dados o valor que está armazenado no local indicado, e guradando em uma variavel 
var associativa = httpGetAsync('https://projeto-orbit.firebaseio.com/cabeçalhos/cabeçalho_02/propriedades/asssociativa.json', console.log);
var comutativa = httpGetAsync('https://projeto-orbit.firebaseio.com/cabeçalhos/cabeçalho_02/propriedades/comutativa.json', console.log);
var elemento_nulo = httpGetAsync('https://projeto-orbit.firebaseio.com/cabeçalhos/cabeçalho_02/propriedades/elemento-nulo.json', console.log);
var elemento_neutro = httpGetAsync('https://projeto-orbit.firebaseio.com/cabeçalhos/cabeçalho_02/propriedades/elemento-neutro.json', console.log);
var distributiva = httpGetAsync('https://projeto-orbit.firebaseio.com/cabeçalhos/cabeçalho_02/propriedades/distributiva.json', console.log);


function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

/* Não precisa de outra função, mas essa função não é muito recomendada (deprecated)
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}*/

/*
function httpGetAsync(theUrl) // Tentativa de fazer a função não precisar chamar outra na mesma hora
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            return xmlHttp.responseText;
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
*/
