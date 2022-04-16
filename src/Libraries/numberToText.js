function numberToText(num) {
	const text = `${num}`.split("");
	for(let i = text.length - 3; i > 0; i -= 3) {
		text.splice(i, 0, ",");
	}
	return text.join("");
}

export default numberToText;