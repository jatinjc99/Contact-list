const express = require("express");
const path = require("path");
const port = 8001;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));
// middle ware1
app.use(function (req, res, next) {
  req.myName = "jatin   ";
  //console.log("middleware 1 called");
  next();
});

//middle ware 2

app.use(function (req, res, next) {
  // console.log("my name is", req.myName);
  // console.log("middleware 2 called");
  next();
});

var contactList = [
  { name: "jatin", phone: "1234567" },
  { name: "tony stark", phone: "11223344" },
  { name: "walter white", phone: "28739237" },
];

app.get("/", function (req, res) {
  // console.log("from the get of route controller", req.myName);
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("error in fetching contacts from db");
      return;
    }
    return res.render("home", {
      title: "contact list ",
      contact_list: contacts,
    });
  });

  //   return res.render("home", {
  //     title: "contact list ",
  //     contact_list: contactList,
  //   });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "let us play with ejs",
  });
});

app.post("/create-contact", function (req, res) {
  //   contactList.push({
  //     name: req.body.name,
  //     phone: req.body.phone,
  //   });

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newConatct) {
      if (err) {
        console.log("error in creating contact");
        return;
      }

      console.log("*****", newConatct);
      return res.redirect("back");
    }
  );

  //return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }

  console.log("Yup! My express server is running on Port", port);
});

app.get("/delete-contact/", function (req, res) {
  // get the id from the parameters
  let id = req.query.id;

  // find the conatct in the data base using id and del

  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting ");
      return;
    }
    return res.redirect("back");
  });

  //return res.redirect("back");
});
