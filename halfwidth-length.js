
var halfwidth_charset = require("./halfwidth-charset");
var halfwidth_charset_by_not_fullwidth = require("./halfwidth-charset-by-not-fullwidth");

/*
Calculate the halfwidth-length of a string

halfwidthLength( str [, regHalfwidth ] )
	regHalfwidth
		An RegExp object of Halfwidth charset for calculation.

		The default value is /[\u0000-\u00ff\uFF61-\uFF9F\uFFE8-\uFFEE]+/ug.

		When set `false`, use the default charset by not-Fullwidth, that is,
			the default value is /[^\u1100-\u115F\u11A3-\u11A7 ... \u{30000}-\u{3FFFD}]+/ug.

		A user-defined RegExp object should contain some key elements like '/[...]+/ug' or '^' if needed.

NOTE: To all types, such as Fullwidth, Narrow, Wide, Ambiguous, and even the Halfwidth,
	the actual display width depend on the font system of the environment, not only on the unicode standard.
*/
module.exports = function halfwidthLength(str, regHalfwidth) {
	//arguments
	if (regHalfwidth === false) regHalfwidth = halfwidth_charset_by_not_fullwidth;

	//calculate
	var l0 = [...str].length;	//original length, refer https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length

	//remove all halfwidth chars
	str = str.replace(regHalfwidth || halfwidth_charset, "");
	var lFull = [...str].length;

	return (l0 - lFull) +		//length of half
		(lFull * 2);		//length of full width
}
