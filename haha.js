"use strict";

const SVG_NS = "http://www.w3.org/2000/svg";
const CHANGED_CLASS = "changed";
const CIRCLE_CLASS = "circ";

let svg;

function randMax(max) {
	return Math.random()*max;
}

function createCircle(cx, cy) {
	let temp = document.createElementNS(SVG_NS, "circle");
	setAttr(temp, {
		cx,
		cy,
		r: 20,
		stroke: "black",
		fill: "BlanchedAlmond"
	});
	temp.classList.add(CIRCLE_CLASS);
	temp.addEventListener("click", doThing);
	
	return temp;
}

function doThing(e) {
	if (e.target.classList.contains(CHANGED_CLASS)) {
		let maxX = svg.getAttribute("width");
		let maxY = svg.getAttribute("height");
		
		svg.removeChild(e.target);
		let temp = createCircle(randMax(maxX), randMax(maxY));

		svg.appendChild(temp);
	}
	else {
		setAttr(e.target, {
			fill: "green"
		});
		e.target.classList.add(CHANGED_CLASS);
	}
	
	e.stopPropagation();
}

function setAttr(obj, attr) {
	for (let a in attr) {
		obj.setAttribute(a, attr[a]);
	}
}

(() => {
	svg = document.getElementById("boi");
	let clear = document.getElementById("clear");
	
	svg.addEventListener("click", e => {
		let cx = e.offsetX;
		let cy = e.offsetY;
		let temp = createCircle(cx, cy);
		
		svg.appendChild(temp);
	});

	clear.addEventListener("click", e => {
		let l = document.getElementsByClassName(CIRCLE_CLASS);
		for (let x = l.length-1; x >= 0; x--) {
			svg.removeChild(l[x]);
			console.log(l);
		}
	});
})();

