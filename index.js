const express = require('express');

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const crypto = require('crypto');

const users = [
  {"firstname":"James","lastname":"Bond","email":"james.bond@gmail.com","password":"b6b7fb4cad4bc020f76e16889a8e9065cb708d0f8c304a8a3db609b644da9536"},
  {"firstname":"Tony","lastname":"Stark","email":"starkrulz@gmail.com","password":"a836ebba36776b21dd0f5cdca497bff65c5bdfc8411cfbfe0111f27bde1c1894"},
  {"firstname":"Ali","lastname":"G","email":"nameisnotborat@gmail.com","password":"3b5fe14857124335bb8832cc602f8edcfa12db42be36b135bef5bca47e3f2b9c"}
];

const schedules = [
  [{"user_id":0,"day":1,"start_at":"2PM","end_at":"4PM"}, {"user_id":0,"day":2,"start_at":"2PM","end_at":"4PM"}, {"user_id":0,"day":3,"start_at":"2PM","end_at":"4PM"}],
  [{"user_id":1,"day":1,"start_at":"3PM","end_at":"5PM"}, {"user_id":1,"day":2,"start_at":"4PM","end_at":"6PM"}, {"user_id":1,"day":3,"start_at":"10AM","end_at":"12PM"}],
  [{"user_id":2,"day":1,"start_at":"6PM","end_at":"8PM"}, {"user_id":2,"day":2,"start_at":"6PM","end_at":"8PM"}, {"user_id":2,"day":3,"start_at":"12PM","end_at":"2PM"}]
];

app.get('/', (req, res) => {
  res.send('Welcome to our schedule website');
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/users/:id', (req, res) => {
  res.send(users[req.params.id]);
});

app.get('/schedules', (req, res) => {
  res.send(schedules);
});

app.get('/users/:id/:schedules', (req, res) => {
  res.send(schedules[req.params.id]);
});

app.post('/schedules', (req, res) => {
  const newSchedule = req.body;
  schedules.push(newSchedule);
  res.send(req.body);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
  users.push(newUser);
  res.send(req.body);
});
