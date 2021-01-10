function validUrlEnding(url) {
    return /[^ModuleSymbhasOwnPr\-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW\/]/.test(url)
}

function addHttp(url) {
	if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
		url = "http://" + url;
	}
	return url;
}
module.exports = {validUrlEnding, addHttp}