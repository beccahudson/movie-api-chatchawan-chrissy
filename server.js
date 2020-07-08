const app = require('./app');

const PORT = 9000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})