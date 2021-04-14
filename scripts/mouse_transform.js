let constrain = 100;
let card_container = document.getElementById("card-container");
let card = document.getElementById("card");

function generateRotationCSS(x, y, el) {
	let box = el.getBoundingClientRect();
	let calcX = -(y - box.y - box.height / 2) / constrain;
	let calcY = (x - box.x - box.width / 2) / constrain;

	// calculate the shadow.
	card.style.boxShadow = `
	${-(x - box.x - box.width / 2) / 12}px 
	${-(y - box.y - box.height / 2) / 12}px 
	${
		Math.sqrt(
			(x - (box.x + box.width / 2)) ** 2 +
				(y - (box.y + box.height / 2)) ** 2
		) / 10
	}px #000000B7`;

	// return the generated css.
	return (
		"perspective(100px) " +
		"   rotateX(" +
		calcX +
		"deg) " +
		"   rotateY(" +
		calcY +
		"deg) "
	);
}

function applyRotationCSS(el, xyEl) {
	el.style.transform = generateRotationCSS.apply(null, xyEl);
}

card_container.addEventListener("mousemove", (e) => {
	let xy = [e.clientX, e.clientY];
	let position = xy.concat([card]);

	window.requestAnimationFrame(function () {
		applyRotationCSS(card, position);
	});
});
