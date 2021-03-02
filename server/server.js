const express = require('express');
const port = process.env.PORT || 3001;
const app = express();
let cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/api/result", (req,res) => {
  console.log("here")
  res.json({Answer :"Hello"})
})

app.listen(port, () => {
  console.log('CRA server running on port', port);
});