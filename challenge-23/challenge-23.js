(function(win, doc){
  'use strict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  var $numbers = doc.querySelectorAll('[data-js="num"]');

  var $result = doc.querySelector('[data-js="result"]');

  var $clean = doc.querySelector('[data-js="clean"]');

  var $operations = doc.querySelectorAll('[data-js="operation"]');

  var operators = [];


  $numbers.forEach(function(number){
    number.addEventListener('click', function(event){

      event.preventDefault();
      addNumber(event.target.getAttribute('data-num'));
    });
  });

  $clean.addEventListener('click', function(event){

    event.preventDefault();
    clean();
  });

  $operations.forEach(function(operation){

    operators.push(operation.getAttribute('data-operation'));
    operation.addEventListener('click', function(event){
      event.preventDefault();
      addOperation(event.target.getAttribute('data-operation'));
    });
  });

  function clean(){
    setValue(0);
  }

  function addValue(value){
    $result.value += value;
  }

  function setValue(value){
    $result.value = value;
  }

  function replaceLastChar(char){
    setValue(getValue().replace(/.$/, char));
  }

  function addNumber(number){
    // Se tiver somente o zero no valor, não
    if(getValue() == "0"){
      return setValue(number);
    }
    addValue(number);
  }

  function addOperation(operation){
    if(isOperator(getLastCharacter())) return replaceLastChar(operation);
    addValue(operation);
  }


  function getLastCharacter(){
    var value = getValue();
    return value[value.length - 1];
  }

  function getValue() {
    return $result.value;
  }

  function isOperator(char) {

    return operators.some(function(operator){
      return operator == char;
    })
  }


})(window, document);
