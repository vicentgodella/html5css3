


var caseAwesomizer= function () {
  var characters = this.value.split('').map(
    function (letter, i) {
      if(i%2 === 0) {
        return letter.toUpperCase();
      } else {
        return letter.toLowerCase();
      }
    });
  transformed = characters.join('');
  document.getElementById('output-awesome').value = transformed;
}


document.getElementById('input-awesome').addEventListener('input', caseAwesomizer, false);