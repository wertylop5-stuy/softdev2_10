"use strict";

const SVG_NS = "http://www.w3.org/2000/svg";

let circles;

class Circle {
	constructor(cx, cy, svg) {
		let that = this
		this.elem = Circle.createElem(cx, cy);
		this.elem.addEventListener("click", e => {
			that.toggle(e);
		});
		this.svg = svg;
		this.toggled = false;

		this.svg.appendChild(this.elem);
	}

	static setAttr(obj, attr) {
		for (let a in attr) {
			obj.setAttribute(a, attr[a]);
		}
	}

	static createElem(cx, cy) {
		let temp = document.createElementNS(SVG_NS, "circle");
		Circle.setAttr(temp, {
			cx,
			cy,
			r: 20,
			stroke: "black",
			fill: "BlanchedAlmond"
		});
		
		return temp;
	}

	toggle(e) {
		if (this.toggled) {
			let maxX = this.svg.getAttribute("width");
			let maxY = this.svg.getAttribute("height");
			let that = this;
			
			this.svg.removeChild(this.elem);
			this.elem = Circle.createElem(randMax(maxX), randMax(maxY));
			this.elem.addEventListener("click", e => {
				that.toggle(e);
			});

			this.svg.appendChild(this.elem);
			this.toggled = false;
		}
		else {
			Circle.setAttr(this.elem, {
				fill: "green"
			});
			
			this.toggled = true;
		}
		
		e.stopPropagation();
	}
	
	removeElem() {
		this.svg.removeChild(this.elem);
	}
}

function randMax(max) {
    return Math.floor(Math.random() * ((max - 20) + 1));
}

(() => {
	let svg = document.getElementById("boi");
	let clear = document.getElementById("clear");
	circles = [];
	
	svg.addEventListener("click", e => {
		let cx = e.offsetX;
		let cy = e.offsetY;
		
		circles.splice(0, 0, new Circle(cx, cy, svg));
	});

	clear.addEventListener("click", e => {
		for (let x = circles.length-1; x >= 0; x--) {
			circles[x].removeElem();
		}
		circles.splice(0, circles.length);
	});

})();

