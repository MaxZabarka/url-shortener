const path = require("path");
const express = require("express");
const nanoid = require("nanoid");
const urlHelpers = require("./util/url.js");

const app = express();
const Urls = require("./models/Urls");

app.set("view engine", "ejs");

app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.post("/create", (req, res, next) => {
  const newValue = urlHelpers.addHttp(req.body.url);
  let newKey;
  const customUrlInput = req.body.custom;
  //User used a custom path?
  if (customUrlInput) {
    //path isn't already taken?
    Urls.query(customUrlInput).then((result) => {
      if (!result) {
        //path is valid?
        if (!urlHelpers.validUrlEnding(customUrlInput)) {
          newKey = customUrlInput;
          if (newKey.length > 7) {
            res.render("message.ejs", { title: "Custom URL Ending too long" });
          }
          Urls.save(newValue, newKey);
          res.render("url-created.ejs", {
            url: newValue,
            key: newKey,
            domainPort: req.get("Host"),
            title: "Link Created!",
          });
        } else {
          res.render("message.ejs", { title: "Invalid input" });
          return;
        }
      } else {
        res.render("message.ejs", { title: "Link ending already taken" });
        return;
      }
    });
  } else {
    newKey = nanoid.customAlphabet(nanoid.urlAlphabet, 7)();
    Urls.save(newValue, newKey);
    res.render("url-created.ejs", {
      url: newValue,
      key: newKey,
      domainPort: req.get("Host"),
      title: "Link Created!",
    });
  }
});

app.get("/", (req, res, next) => {
  //Home page
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/", (req, res, next) => {
  //Url logic
  Urls.query(req.url.replace("/", "")).then((long_url) => {
    if (long_url) {
      res.redirect(long_url);
    } else {
      res.render("message.ejs", { title: "Link Not Found" });
    }
  });
});
const port = process.env.PORT || 5000;
console.log("Starting on port " + port);
app.listen(port);
