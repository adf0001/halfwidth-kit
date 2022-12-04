
/*
Default Halfwidth chars set.

reference:
	http://www.unicode.org/reports/tr11/
	http://www.alanwood.net/unicode/halfwidth_and_fullwidth_forms.html

NOTE: To all types, such as Fullwidth, Narrow, Wide, Ambiguous, even the Halfwidth,
	the actual display width depend on the font system of the environment, not only on the unicode standard.
*/

module.exports = /[\u0000-\u00ff\uFF61-\uFF9F\uFFE8-\uFFEE]+/ug;
