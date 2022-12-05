# halfwidth-kit
halfwidth kit

# Install
```
npm install halfwidth-kit
```

# Usage & Api
```javascript
var halfwidth_kit = require("halfwidth-kit");

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
halfwidth_kit.length("aaa") === 3 &&
halfwidth_kit.length("是是是") === 6 &&
halfwidth_kit.length("aaa是是是") === 9 &&
halfwidth_kit.length("A\uD87E\uDC04Z") === 4 &&
halfwidth_kit.length("😄") === 2 &&
/*
In author's VsCode, without Adlam font support, the 4 chars are shown as 4 'unknown's,
	i.e. 4 same halfwidth 'unknown' chars, so this test add them to the halfwidth charset,
	to make the result equals 4.
	*/
halfwidth_kit.length("𞤲𞥋𞤣𞤫", /[𞤲𞥋𞤣𞤫\u0000-\u00ff\uFF61-\uFF9F\uFFE8-\uFFEE]+/gu) === 4 &&

//In author's VsCode, only the "∈" is a Fullwidth char, so the test want result be 10.
halfwidth_kit.length("∀𝑥∈ℝ,𝑥²≥0", /[∀𝑥ℝ,𝑥²≥0]+/ug) === 10 &&	//defined the Halfwidth
halfwidth_kit.length("∀𝑥∈ℝ,𝑥²≥0", /[^∈\u1100-\u115F\u11A3-\u11A7]+/ug) === 10 &&	//or defined the Fullwidth

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
halfwidth_kit.getIndex("12一二34三四", 3, 6) === 7 &&
halfwidth_kit.getIndex("12一二34三四", 3, 99) === 8 &&

halfwidth_kit.getIndex("12一二34三四", 0, 8) === 6 &&
halfwidth_kit.getIndex("12一二34三四", 0, 9) === 6 &&
halfwidth_kit.getIndex("12一二34三四", 0, 10) === 7 &&

//"A\uD87E\uDC04Z"==='A你Z'
halfwidth_kit.getIndex("A\uD87E\uDC04Z", 0, 1) === 1 &&
halfwidth_kit.getIndex("A\uD87E\uDC04Z", 0, 2) === 1 &&
halfwidth_kit.getIndex("A\uD87E\uDC04Z", 0, 3) === 3 &&

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

```
