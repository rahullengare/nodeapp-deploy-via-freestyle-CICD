const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, This is nodeapp deployed successfully using the Jenkins Freestyle Jobs');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
