const paths = document.querySelectorAll('path');
const natPaths = document.querySelectorAll('#nat path');

const links = document.querySelectorAll('a');

[].forEach.call(paths,hexToRgb);

natPaths.forEach(function(path) {
	animatePaths(path);
})

function hexToRgb(path) {
	const points = path.getAttribute('fill').substring(1);
	const bigint = parseInt(points, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const color = r + "," + g + "," + b;

    path.setAttribute("fill", `rgba( ${color}, 0.5)`);
}


function animatePaths(path) {

}