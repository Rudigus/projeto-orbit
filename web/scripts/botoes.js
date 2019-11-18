var botoesAuxiliares = document.getElementById("botoesAuxiliares").children;
var inputsCalculadora = document.getElementsByClassName("inputCalculadora");
var ultimoInput = inputsCalculadora[0];
console.log(botoesAuxiliares);
console.log(botoesAuxiliares[0].alt);
console.log(inputsCalculadora[1].value);
for(i = 0; i < inputsCalculadora.length; i++)
{
  inputAtual = inputsCalculadora[i];
  inputAtual.addEventListener("blur", function(){
    ultimoInput = event.target;
  })
}
for(i = 0; i < botoesAuxiliares.length; i++)
{
  botaoAtual = botoesAuxiliares[i];
  botaoAtual.addEventListener("click", function(){
    if(ultimoInput === inputsCalculadora[1])
    {
      console.log(botaoAtual);
      inputsCalculadora[1].value += botaoAtual.alt;
    }
    else
    {
      inputsCalculadora[0].value += botaoAtual.alt;
    }
  })
}
