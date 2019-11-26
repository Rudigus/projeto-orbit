    var associativa = httpGetAsync('https://first-6a712.firebaseio.com/propriedades/asssociativa.json', console.log);

  const preObjeto = document.getElementById('objeto')

  const refObjeto = firebase.database().ref().child('propriedades') 

  const ulPropriedades = document.getElementById('propriedades')

  const refPropriedades = firebase.database().ref().child('propriedades')

  refObjeto.on('value', snap =>{
      preObjeto.innerText = JSON.stringify(snap.val(), null , 1 )
  } )

  refPropriedades.on('child_added', snap=>{
      const li = document.createElement('li')
      var ok = snap.val();
      li.innerText = snap.val()
      ulPropriedades.appendChild(li)

  })

  refPropriedades.on('child_changed', snap=>{
      const liChanged = document.getElementById(snap.key)
      liChanged.innerText = snap.val()
  })

  refPropriedades.on('child_removed', snap=>{
    const liRemove = document.getElementById(snap.key)
    liRemove.remove()
})

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