var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.sqlite');

function sendData(res, data) {
  res.json({
    success: 1,
    message: 'Thành công',
    data: data
  });
}

router.post('/question', function (req, res, next) {
  db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS contest (question TEXT PRIMARY KEY, answer TEXT)");

    try {
      let data = req.body.data;
      if(!!data) {
        const stmt = db.prepare('INSERT OR REPLACE INTO contest(question, answer) VALUES(?, ?);');
        for(let i in data) {
          let q = i;
          let a = data[i];
          stmt.run(q, a);
        }
        stmt.finalize();
      }
    } catch (e) { }
  });
  sendData(res, []);
});

router.get('/question', function (req, res, next) {
  db.serialize( async () => {
    db.all(`SELECT * FROM contest`, (err, rows)=>{
      let data = {};
      for(let i in rows) {
        data[rows[i].question] = rows[i].answer;
      }
      sendData(res, data);
    });
  });
});

module.exports = router;
