
/*
Halfwidth chars set, by not-Fullwidth.

reference:
	http://www.unicode.org/reports/tr11/
	http://www.alanwood.net/unicode/halfwidth_and_fullwidth_forms.html
	https://www.php.net/manual/en/function.mb-strwidth.php	

NOTE: To all types, such as Fullwidth, Narrow, Wide, Ambiguous, even the Halfwidth,
	the actual display width depend on the font system of the environment, not only on the unicode standard.	
*/

module.exports = /[^\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6\u{1B000}-\u{1B001}\u{1F200}-\u{1F202}\u{1F210}-\u{1F23A}\u{1F240}-\u{1F248}\u{1F250}-\u{1F251}\u{20000}-\u{2FFFD}\u{30000}-\u{3FFFD}]+/ug;
