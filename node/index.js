const express = require('express');
const config = {
  host: 'db',
  user: 'root',
  password: 'dev',
  database: 'nodedb'
}
const mysql = require('mysql');
let connection = null;


const app = express();
const PORT = 3000

app.get('/',  (req, res) => {
  if(connection === null) connection = mysql.createConnection(config)
  const sql = `INSERT INTO people (id, name) VALUES (${parseInt(Math.random() * 100)}, 'Marcelo-${Math.random()}')`;
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
      return res.send(html);
    });
  })
})
app.listen(PORT, function() {
  console.log('listening on port 3000');
})
