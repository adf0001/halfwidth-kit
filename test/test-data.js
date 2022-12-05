
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

			//4 different Adlam chars, escape("𞤲𞥋𞤣𞤫") === '%uD83A%uDD32%uD83A%uDD4B%uD83A%uDD23%uD83A%uDD2B'
			halfwidth_kit.length("𞤲𞥋𞤣𞤫") === 8 &&	//not in the Halfwidth definition
			halfwidth_kit.length("𞤲𞥋𞤣𞤫", false) === 4 &&	//also not in the Fullwidth definition
			/*
			In author's VsCode, without Adlam font support, the 4 chars is shown as 4 'unknown's,
				i.e. 4 same halfwidth 'unknown' chars, so this test add them to the halfwidth charset,
				to make the result equals 4.
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

	"getIndex": function (done) {
		//if (typeof window !==/=== "undefined") throw "disable for browser/nodejs";

		done(!(
			halfwidth_kit.getIndex("12", 0, 0) === 0 &&
			halfwidth_kit.getIndex("12", 0, 1) === 1 &&
			halfwidth_kit.getIndex("12", 0, 2) === 2 &&
			halfwidth_kit.getIndex("12", 0, 3) === 2 &&

			halfwidth_kit.getIndex("12", 1, 0) === 1 &&
			halfwidth_kit.getIndex("12", 1, 1) === 2 &&
			halfwidth_kit.getIndex("12", 1, 2) === 2 &&

			halfwidth_kit.getIndex("一二", 0, 0) === 0 &&
			halfwidth_kit.getIndex("一二", 0, 1) === 0 &&
			halfwidth_kit.getIndex("一二", 0, 2) === 1 &&
			halfwidth_kit.getIndex("一二", 0, 3) === 1 &&
			halfwidth_kit.getIndex("一二", 0, 4) === 2 &&
			halfwidth_kit.getIndex("一二", 0, 5) === 2 &&
			halfwidth_kit.getIndex("一二", 0, 6) === 2 &&

			halfwidth_kit.getIndex("一二", 1, 0) === 1 &&
			halfwidth_kit.getIndex("一二", 1, 1) === 1 &&
			halfwidth_kit.getIndex("一二", 1, 2) === 2 &&
			halfwidth_kit.getIndex("一二", 1, 3) === 2 &&
			halfwidth_kit.getIndex("一二", 1, 4) === 2 &&

			halfwidth_kit.getIndex("12一二", 0, 2) === 2 &&
			halfwidth_kit.getIndex("12一二", 0, 3) === 2 &&
			halfwidth_kit.getIndex("12一二", 0, 4) === 3 &&
			halfwidth_kit.getIndex("12一二", 0, 5) === 3 &&
			halfwidth_kit.getIndex("12一二", 0, 6) === 4 &&
			halfwidth_kit.getIndex("12一二", 0, 7) === 4 &&

			halfwidth_kit.getIndex("12一二34", 3, 2) === 4 &&
			halfwidth_kit.getIndex("12一二34", 3, 3) === 5 &&
			halfwidth_kit.getIndex("12一二34", 3, 4) === 6 &&
			halfwidth_kit.getIndex("12一二34", 3, 5) === 6 &&

			halfwidth_kit.getIndex("12一二34三四", 3, 6) === 7 &&
			halfwidth_kit.getIndex("12一二34三四", 3, 99) === 8 &&

			halfwidth_kit.getIndex("12一二34三四", 0, 8) === 6 &&
			halfwidth_kit.getIndex("12一二34三四", 0, 9) === 6 &&
			halfwidth_kit.getIndex("12一二34三四", 0, 10) === 7 &&

			halfwidth_kit.getIndex("一二34三四56", 0, 6) === 4 &&
			halfwidth_kit.getIndex("一二34三四56", 0, 7) === 4 &&
			halfwidth_kit.getIndex("一二34三四56", 0, 8) === 5 &&

			true
		));
	},

	"slice": function (done) {
		//if (typeof window !==/=== "undefined") throw "disable for browser/nodejs";

		done(!(
			halfwidth_kit.slice("12一二34三四", 0, 2) === "12" &&
			halfwidth_kit.slice("12一二34三四", 0, 3) === "12" &&
			halfwidth_kit.slice("12一二34三四", 0, 4) === "12一" &&
			halfwidth_kit.slice("12一二34三四", 2, -2) === "一二34三" &&
			halfwidth_kit.slice("12一二34三四", 3, -3) === "一二34三" &&
			halfwidth_kit.slice("12一二34三四", 4, -4) === "二34" &&

			halfwidth_kit.slice("12一二34三四", -1) === "" &&
			halfwidth_kit.slice("12一二34三四", -2) === "四" &&
			halfwidth_kit.slice("12一二34三四", -3) === "四" &&
			halfwidth_kit.slice("12一二34三四", -4) === "三四" &&
			halfwidth_kit.slice("12一二3", -1) === "3" &&
			halfwidth_kit.slice("12一二3", -2) === "3" &&
			halfwidth_kit.slice("12一二3", -3) === "二3" &&

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
