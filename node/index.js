const express = require('express');
const config = {
  host: 'db',
  user: 'root',
  password: 'dev',
  database: 'nodedb'
}
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const app = express();
const PORT = 3000

app.get('/',  (req, res) => {
  const sql = `INSERT INTO people (name) VALUES ('Marcelo')`;
  const get = `SELECT * FROM people`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    connection.query(get, (err, result) => {
      if (err) {
        console.log(err);
        return res.send(err)
      }
      let html = '<h1>Hello FullCycle</h1>';
      html += '<ul>';
      result.forEach(person => {
        html += `<li>${person.name}</li>`;
      });
      html += '</ul>';
      connection.destroy();
      return res.send(html);
    });
  })
})
app.listen(PORT, function() {
  console.log('listening on port 3000');
})
