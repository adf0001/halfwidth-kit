
var halfwidth_charset = require("./halfwidth-charset");
var halfwidth_charset_by_not_fullwidth = require("./halfwidth-charset-by-not-fullwidth");
var length = require("./length");
var get_index = require("./get-index");
var slice = require("./slice");


module.exports = {
	halfwidth_charset,
	halfwidth_charset_by_not_fullwidth,

	length,

	get_index,
	getIndex: get_index,

	slice,

}
