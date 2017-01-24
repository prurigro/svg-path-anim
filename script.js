const paths = document.querySelectorAll('path');
const links = document.querySelectorAll('a');

[].forEach.call(paths,hexToRgb);


Array.from(links).forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const animateTo = this.getAttribute("href").substring(1);

        getPaths(animateTo);
    });
});


function hexToRgb(path) {
	const points = path.getAttribute('fill').substring(1);
	const bigint = parseInt(points, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const color = r + "," + g + "," + b;

    path.setAttribute("fill", `rgba( ${color}, 0.5)`);
}

const pathObj = {};
const fromPathObj = {};
const toPathsArray = [];
const fromPathsArray =[];

function getPaths(animateTo) {
	const toPaths = document.getElementById(animateTo).querySelectorAll('path');

	Array.from(toPaths).forEach((path, i) => {

	   const d = toPaths[i].getAttribute("d");
	   pathObj.fill = toPaths[i].getAttribute("fill");
	   pathObj.x0 = d.match(/\M(.*)\,/)[1];
	   pathObj.y0 = d.match(/\,(.*)\L/)[1];
	   L = d.substring(d.indexOf("L")+1).split(" ");
	   pathObj.L0 = L[0];
	   pathObj.L1 = L[1];
	   pathObj.L2 = L[2];
	   pathObj.join = L[3].slice(0, -1);

	   	toPathsArray.push(pathObj);

	});

		
	 Array.from(document.querySelector(".visible").querySelectorAll("path")).forEach((path, i) => {


	 	// TweenLite.to(fromPathObj, 1, { x0: pathObj.x0, onUpdate: function() {
   //          path.setAttribute("d",`M${pathObj.x0},${pathObj.y0}L${pathObj.L0} ${pathObj.L1} ${pathObj.L2} ${pathObj.join}z`);
   //      } });
	 });

}

