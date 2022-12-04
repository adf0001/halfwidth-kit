
//global variable, for html page, refer tpsvr @ npm.
halfwidth_kit = require("../index.js");

module.exports = {

	"length": function (done) {
		//if (typeof window !==/=== "undefined") throw "disable for browser/nodejs";

		done(!(
			halfwidth_kit.length("aaa") === 3 &&
			halfwidth_kit.length("aaa", false) === 3 &&

			halfwidth_kit.length("是是是") === 6 &&
			halfwidth_kit.length("是是是", false) === 6 &&

			halfwidth_kit.length("aaa是是是") === 9 &&
			halfwidth_kit.length("aaa是是是", false) === 9 &&

			halfwidth_kit.length("A\uD87E\uDC04Z") === 4 &&
			halfwidth_kit.length("A\uD87E\uDC04Z", false) === 4 &&

			halfwidth_kit.length("😄") === 2 &&		//correct, the "😄" is not in the Halfwidth definition
			halfwidth_kit.length("😄", false) === 1 &&		//fail, the "😄" \u{1F604} is not in the Fullwidth definition
			halfwidth_kit.length("😄", /[^😄\u1100-\u115F\u11A3-\u11A7]+/ug) === 2 &&		//user-defined, omit the rest

			halfwidth_kit.length("𞤲𞥋𞤣𞤫") === 8 &&	//4 different adlam chars, not in the Halfwidth definition
			halfwidth_kit.length("𞤲𞥋𞤣𞤫", false) === 4 &&	//also not in the Fullwidth definition
			/*
			In author's VsCode, the 4 chars is shown as 4 'unknown's, that is, 4 same halfwidth chars,
				so this test add them to the halfwidth charset, to make the result equals 4.
			refer:
				https://fuhaoku.net/block/Adlam
				https://www.unicode.org/charts/PDF/U1E900.pdf
			*/
			halfwidth_kit.length("𞤲𞥋𞤣𞤫", /[𞤲𞥋𞤣𞤫\u0000-\u00ff\uFF61-\uFF9F\uFFE8-\uFFEE]+/gu) === 4 &&

			halfwidth_kit.length("∀𝑥∈ℝ,𝑥²≥0") === 15 &&
			halfwidth_kit.length("∀𝑥∈ℝ,𝑥²≥0", false) === 9 &&
			//-------------------|----------|--
			//In author's VsCode, only the "∈" is a Fullwidth char, so the test want result be 10.
			halfwidth_kit.length("∀𝑥∈ℝ,𝑥²≥0", /[∀𝑥ℝ,𝑥²≥0]+/ug) === 10 &&	//defined the Halfwidth
			halfwidth_kit.length("∀𝑥∈ℝ,𝑥²≥0", /[^∈\u1100-\u115F\u11A3-\u11A7]+/ug) === 10 &&	//or defined the Fullwidth

			true
		));
	},

	"check exports": function (done) {
		var m = halfwidth_kit;
		for (var i in m) {
			if (typeof m[i] === "undefined") { done("undefined: " + i); return; }
		}
		done(false);

		console.log(m);
		var list = "export list: " + Object.keys(m).join(", ");
		console.log(list);
		return list;
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('halfwidth_kit', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
