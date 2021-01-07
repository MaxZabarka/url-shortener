const path = require("path");
const express = require("express");
const nanoid = require("nanoid");



function validUrlEnding(url) {
    return /[^ModuleSymbhasOwnPr\-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW\/]/.test(url)
}

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

// app.set("view engine", "pug");
app.set("view engine", "ejs");

app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.post("/create", (req, res, next) => {
    const newValue = addhttp(req.body.url);
    let newKey
    // console.log(validUrlEnding(req.body.custom));
    if (req.body.custom) {
        if (!urls[req.body.custom]) {
            if (!validUrlEnding(req.body.custom)) {
                newKey = req.body.custom
            } else {
                res.render("message.ejs",{title:"Invalid input"})
                return
            }
        } else {
            res.render("message.ejs",{title:"Link ending already taken"})
            return
        }


    } else {
        while(urls[newKey]) {
            newKey = nanoid.customAlphabet(nanoid.urlAlphabet, 7)();
        }
    }

	urls[newKey] = newValue;
	res.render("url-created.ejs", {
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
        res.render("message.ejs",{title:"Link Not Found"})
	}
});

app.listen(3000);
