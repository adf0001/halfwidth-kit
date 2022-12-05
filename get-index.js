
var halfwidth_charset = require("./halfwidth-charset");
var halfwidth_charset_by_not_fullwidth = require("./halfwidth-charset-by-not-fullwidth");

/*
Calculate the index of a string by halfwidth

halfwidthIndex( str, startIndex, halfwidthCount [, regHalfwidth ] )
	startIndex
		The start index of the string.

		Note: If startIndex is not from head, i.e value 0, be careful to select a startIndex
			to avoid spliting a unicode char. An example: "A\uD87E\uDC04Z".slice(0,2) === 'A\uD87E',
			in this case, the startIndex should be 1 or 3, not a 2 that cause error.

	halfwidthCount
		The halfwidth count to step forward.
	regHalfwidth
		refer .length().
*/
module.exports = function halfwidthIndex(str, startIndex, halfwidthCount, regHalfwidth) {
	//arguments
	if (regHalfwidth === false) regHalfwidth = halfwidth_charset_by_not_fullwidth;
	else if (!regHalfwidth) regHalfwidth = halfwidth_charset;

	if (startIndex < 0) startIndex = 0;
	else if (startIndex > str.length) startIndex = str.length;

	//calculate
	var lastIndex = startIndex, rsl, s, sa, sl;

	regHalfwidth.lastIndex = startIndex;

	while (lastIndex < str.length) {
		rsl = regHalfwidth.exec(str);

		//full-width
		s = str.slice(lastIndex, rsl ? rsl.index : str.length);
		sa = [...s];
		sl = sa.length * 2;
		if (sl > halfwidthCount) {
			return lastIndex + sa.slice(0, Math.floor(halfwidthCount / 2)).join("").length;
		}
		lastIndex += s.length;
		halfwidthCount -= sl;

		if (!rsl) return lastIndex;

		//half-width
		s = rsl[0];
		sa = [...s];
		sl = sa.length;
		if (sl > halfwidthCount) {
			return rsl.index + sa.slice(0, halfwidthCount).join("").length;
		}
		lastIndex += s.length;
		halfwidthCount -= sl;
	}
	return lastIndex;
}
