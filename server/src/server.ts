import express from 'express';

const PORT = 3000;
const app = express();

const obj = {
  name: 'Marcus',
  age: 19,
  occupation: 'dev'
}

app.get('/', (req, res) => {
  res.json({oi:'Hello World!', obj});
})

app.listen(PORT, () => console.log(`Running at ${PORT}...`))