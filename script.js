var polys = document.querySelectorAll('path');
[].forEach.call(polys,changehex);

function changehex(poly) {
	var points = poly.getAttribute('fill').substring(1);
	var bigint = parseInt(points, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    const color = r + "," + g + "," + b;

    poly.setAttribute("fill", "rgba(" + color + ", 0.5)")
}


