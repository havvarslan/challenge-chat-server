const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //when server deals with json request for req.body
app.use(cors());

var messages = [
  {
    id: "1",
    from: "Havva",
    text: "Study more"
  },
  {
    id: "2",
    from: "Selma",
    text: "Play Piano"
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to chat server");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  var getId = req.params.id;
  var message = messages.find(o => {
    return o.id === getId;
  });
  console.log(message);
  res.send(message);
});

// app.get("/messages/search", (req, res) => {
//   var searchText = request.query.text;
//   var searchResults = messages.filter(param => )
// })

app.post("/messages", (req, res) => {
  if(req.body.from && req.body.text !==""){
  const newMessage = req.body;
  messages.push(newMessage);
  res.send(newMessage);
  } else {
    res.status(400).send('Not Found');
  }
});



app.delete("/messages/:id", (req, res) => {
  const messageToDelete = messages.find(mes => mes.id === req.params.id);
  messages.splice(messages.indexOf(messageToDelete), 1);
  res.send("Deleted Message" + req.params.id);
});


// app.get("/messages", (req, res) => {
//   // if (req.query.text === undefined) {
//     res.status(400).send('Not Found');
//   // } else {
//   //   res.send("");
//   // }
// });

const listener = app.listen(9000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
