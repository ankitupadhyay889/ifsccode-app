const express = require("express");
const bodyParser = require("body-parser");
const ifsc = require("ifsc");

const app = express();

app.set('view engine','ejs')

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render('index' , {title: 'IFSC Code Bank Information Finder',response:'',data:false });
});

app.post("/ifsc", (req, res) => {
  var code = req.body.ifsc;

  if (ifsc.validate(code)) {
    ifsc.fetchDetails(code).then(function (response) {
      console.log(response);
      res.render("index", {
        title: "IFSC Code Bank Information Finder",
        response: response,
        data: true,
      });
    });
  } else {
    res.send("IFSC Code is wrong");
  }
});

app.listen(port, () => {
  console.log(`Server is run on ${port}`);
});
