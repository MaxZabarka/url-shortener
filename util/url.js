function validUrlEnding(url) {
    return /[^ModuleSymbhasOwnPr\-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW\/]/.test(url)
}

function addHttp(url) {
	if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
		url = "http://" + url;
	}
	return url;
}
const Urls = require('../models/Urls');

module.exports = {validUrlEnding, addHttp}