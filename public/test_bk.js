function _test() {
  const vpbQID = $('#q1 input[type="hidden"]').attr('name').split(':')[0];
  const _xhttp = new XMLHttpRequest();
  _xhttp.onload = function () {
    let vpbQuestions = JSON.parse(this.responseText)['data'];
    for (let i = 1; i <= 40; i++) {
      let question = $('#q' + i + ' .qtext').text();
      if (question != null && question != undefined) {
        let correct = vpbQuestions[question];
        if (correct != null && correct != undefined) {
          for (let a = 0; a < 6; a++) {
            let answerText = $('#q' + i + ' label[for="' + vpbQID + ':' + i + '_answer' + a + '"]').text();
            if (correct == answerText) {
              $('#q' + i + ' label[for="' + vpbQID + ':' + i + '_answer' + a + '"]').text(answerText + ' (*)');
              break;
            }
          }
        }
      }
    }
    console.log('DONE');
  };
  _xhttp.open('GET', 'https://edb0-2402-800-3efd-d23e-4949-6714-7622-f121.ngrok.io/test/question', true);
  _xhttp.send();
}

function _insert(data) {
  const _xhttp = new XMLHttpRequest();
  _xhttp.onload = function () {
    let response = JSON.parse(this.responseText);
    console.log('DONE');
  };
  _xhttp.open('POST', 'https://edb0-2402-800-3efd-d23e-4949-6714-7622-f121.ngrok.io/test/question', true);
  _xhttp.setRequestHeader("content-type", "application/json");
  _xhttp.send(JSON.stringify({ data: data }));
  // _xhttp.send();
}

function _collect () {
  const vpbQID = $('#q1 input[type="hidden"]').attr('name').split(':')[0];
  const data = {};
  for(let i=1; i<=40; i++) {
    let question = $('#q'+i+' .qtext').text();
    let point = $('#q'+i+' .grade').text();
    if(point == 'Đạt điểm 1,00 trên 1,00') {
      for(let a=0; a<6; a++) {
        let answerText = $('#q'+i+' label[for="'+vpbQID+':'+i+'_answer'+a+'"]').text();
        let input = document.getElementById(vpbQID+':'+i+'_answer'+a);
        if(input != null && input.checked == true) {
          data[question] = answerText.replace(' (*)', '');
          break;
        }
      }
    }
  }
  _insert(data);
}
