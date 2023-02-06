function _test () {
  const vpbQID = $('#q1 input[type="hidden"]').attr('name').split(':')[0];
  const _xhttp = new XMLHttpRequest();
  _xhttp.onload = function () {
    let vpbQuestions = JSON.parse(this.responseText)['data'];
    for (let i = 1; i <= 40; i++) {
      let question = $('#q' + i + ' .qtext').text();
      if (question != null && question != undefined) {
        let correct = vpbQuestions[question];
        if (correct != null && correct != undefined) {
          if (correct.startsWith('\[')) {
            try {
              let multiChoice = JSON.parse(correct);
              for (let a = 0; a < 6; a++) {
                let answerText = $('#q' + i + ' label[for="' + vpbQID + ':' + i + '_choice' + a + '"]').text();
                for(let m in multiChoice) {
                  if (answerText.startsWith(multiChoice[m])) {
                    $('#q' + i + ' label[for="' + vpbQID + ':' + i + '_choice' + a + '"]').text(answerText + ' (*)');
                    break;
                  }
                }
              }
            } catch (e) { }
          } else {
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
    }
    console.log('DONE');
  };
  _xhttp.open('GET', 'https://5eef-2401-d800-7ce0-4530-98a2-64c5-f7c2-e574.ngrok.io/test/question', true);
  _xhttp.send();
}

function _insert (data) {
  const _xhttp = new XMLHttpRequest();
  _xhttp.onload = function () {
    let response = JSON.parse(this.responseText);
    console.log('DONE');
  };
  _xhttp.open('POST', 'https://5eef-2401-d800-7ce0-4530-98a2-64c5-f7c2-e574.ngrok.io/test/question', true);
  _xhttp.setRequestHeader('content-type', 'application/json');
  _xhttp.send(JSON.stringify({data: data}));
  // _xhttp.send();
}

function _collect () {
  const vpbQID = $('#q1 input[type="hidden"]').attr('name').split(':')[0];
  const data = {};
  for (let i = 1; i <= 40; i++) {
    let question = $('#q' + i + ' .qtext').text();
    let point = $('#q' + i + ' .grade').text();
    if (point == 'Đạt điểm 1,00 trên 1,00') {
      try {
        for (let a = 0; a < 6; a++) {
          let answerText = $('#q' + i + ' label[for="' + vpbQID + ':' + i + '_answer' + a + '"]').text();
          let input = document.getElementById(vpbQID + ':' + i + '_answer' + a);
          if (input != null && input.checked == true) {
            data[question] = answerText.replace(' (*)', '');
            break;
          }
        }
      } catch (e) { }
      try {
        if (!data[question]) {
          let multiChoice = [];
          for (let a = 0; a < 6; a++) {
            let answerText = $('#q' + i + ' label[for="' + vpbQID + ':' + i + '_choice' + a + '"]').text().split('\.')[0];
            let input = document.getElementById(vpbQID + ':' + i + '_choice' + a);
            if (input != null && input.checked == true) {
              multiChoice.push(answerText.replace(' (*)', ''));
            }
          }
          if (multiChoice.length > 0) {
            data[question] = JSON.stringify(multiChoice);
          }
        }
      } catch (e) { }
    }
  }
  _insert(data);
}

function _currentDomain() {
  console.log(window.location.hostname);
  return;
}
