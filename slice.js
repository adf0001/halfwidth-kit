
var halfwidth_charset = require("./halfwidth-charset");
var halfwidth_charset_by_not_fullwidth = require("./halfwidth-charset-by-not-fullwidth");
var get_index = require("./get-index");

/*
Slice a string by halfwidth

halfwidthSlice( str, startHalfwidth, endHalfwidth [, regHalfwidth ] )
	startHalfwidth
		The start halfwidth index.
		If startHalfwidth < 0, it will be counted from the end of the string.

	endHalfwidth
		The end halfwidth index.
		Set null/undefined to indecate the end of the string.
		Set 0 to indecate the start of the string.
		If endHalfwidth < 0, it will be counted from the end of the string.

	regHalfwidth
		refer .length().
*/
module.exports = function halfwidthSlice(str, startHalfwidth, endHalfwidth, regHalfwidth) {
	//arguments
	if (regHalfwidth === false) regHalfwidth = halfwidth_charset_by_not_fullwidth;
	else if (!regHalfwidth) regHalfwidth = halfwidth_charset;

	//calculate
	var startIndex, endIndex;

	if (startHalfwidth > 0) {
		startIndex = get_index(str, 0, startHalfwidth, regHalfwidth);
	}
	else if (startHalfwidth === 0) startIndex = 0;
	else if (!(startHalfwidth < 0)) startIndex = 0;

	if (endHalfwidth > 0) {
		endIndex = get_index(str, 0, endHalfwidth, regHalfwidth);
	}
	else if (endHalfwidth === 0) endIndex = 0;	//0 to indecate the start of the string.
	else if (!endHalfwidth) endIndex = str.length;	//null/undefined to indecate the end of the string
	else if (!(endHalfwidth < 0)) endIndex = str.length;

	//negative
	if (startHalfwidth < 0 || endHalfwidth < 0) {
		var strRev = [...str].reverse().join("");
		if (startHalfwidth < 0) startIndex = str.length - get_index(strRev, 0, -startHalfwidth, regHalfwidth);
		if (endHalfwidth < 0) endIndex = str.length - get_index(strRev, 0, -endHalfwidth, regHalfwidth);
	}

	if (startIndex >= endIndex) return "";

	return str.substring(startIndex, endIndex);
}
