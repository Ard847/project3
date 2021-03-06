const express = require('express');
const userQuery = require('./models/user');
const orm = require('./config/orm');
const port = process.env.PORT || 3001;
const app = express();
let cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/api/result", async (req,res) => {
  console.log("here")
  const user = await orm.Users.findAll({/* {where:{sessionId:userId} */raw : true});
  console.log(user)
  res.json({Answer : user})
})

app.listen(port, () => {
  console.log('CRA server running on port', port);
});