const path = require("path");
const express = require("express");
const nanoid = require("nanoid");
const { url } = require("inspector");

function addhttp(url) {
	if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
		url = "http://" + url;
	}
	return url;
}

const app = express();
const urls = {
	abc: "google.com",
	123: "https://instagram.com",
	new: "google.com",
};

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.post("/create", (req, res, next) => {
    const newValue = addhttp(req.body.url);
    let newKey
    while(urls[newKey]) {
        newKey = nanoid.customAlphabet(nanoid.urlAlphabet, 7)();
    }
	urls[newKey] = newValue;
	res.render("url-created.pug", {
		url: newValue,
		key: newKey,
        domainPort: req.get("Host"),
	});

});

app.get("/", (req, res, next) => {
	//Home page
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use((req, res, next) => {
	//Url logic
	const url = urls[req.url.replace("/", "")];
	if (url) {
		res.redirect(url);
	} else {
		res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
	}
});

app.listen(3000);
