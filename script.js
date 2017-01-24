const links = document.querySelectorAll("a");
const toPathsArray = [];
const fromPathsArray = [];

// click on link listener
Array.from(links).forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const animateTo = this.getAttribute("href").substring(1);

        getPaths(animateTo);
    });
});

// get d attribute of path using regex
const getCoordinates = function(path) {
    return path.getAttribute("points").match(/(-?[0-9][0-9]*),(-?[0-9][0-9]*)\ (-?[0-9][0-9]*),(-?[0-9][0-9]*)\ (-?[0-9][0-9]*),(-?[0-9][0-9]*)/);
};

function animatePaths() {
    // animate d attr
    toPathsArray.forEach((obj, i) => {
        TweenLite.to(obj, 1, { x0: fromPathsArray[i].x0, y0: fromPathsArray[i].y0, L0: fromPathsArray[i].L0, L1: fromPathsArray[i].L1, L2: fromPathsArray[i].L2, join: fromPathsArray[i].join, ease: Power4.easeOut, onUpdate: function() {
            console.log(document.querySelector(".visible"))
            document.querySelector(".visible").querySelectorAll("polygon")[i].setAttribute("points", `${obj.x0},${obj.y0} ${obj.L0},${obj.L1} ${obj.L2},${obj.join}`);
        } });
    });
    
    // animate color
    Array.from(document.querySelector(".visible").querySelectorAll("polygon")).forEach((path, i) => {
        const fromColor = path.getAttribute("fill");
        const toColor = fromPathsArray[i].fill;

        TweenMax.to(path, 1, { fill: toColor });
    });
}

// add d attribute values to arrays
function getPaths(animateTo) {
    const toPaths = document.getElementById(animateTo).querySelectorAll("polygon");

    Array.from(toPaths).forEach((path, i) => {
        const pathObj = {};

        const coordinates = getCoordinates(toPaths[i]);


        pathObj.fill = toPaths[i].getAttribute("fill");
        pathObj.x0 = coordinates[1];
        pathObj.y0 = coordinates[2];
        pathObj.L0 = coordinates[3];
        pathObj.L1 = coordinates[4];
        pathObj.L2 = coordinates[5];
        pathObj.join = coordinates[6];
        fromPathsArray.push(pathObj);
    });

    Array.from(document.querySelector(".visible").querySelectorAll("polygon")).forEach((path, i) => {
        const coordinates = getCoordinates(path);
        const toPathObj = {};

        toPathObj.fill = toPaths[i].getAttribute("fill");
        toPathObj.x0 = coordinates[1];
        toPathObj.y0 = coordinates[2];
        toPathObj.L0 = coordinates[3];
        toPathObj.L1 = coordinates[4];
        toPathObj.L2 = coordinates[5];
        toPathObj.join = coordinates[6];

        toPathsArray.push(toPathObj);
    });

    animatePaths();
}


// [].forEach.call(paths, hexToRgb);
// function hexToRgb(path) {
//     const points = path.getAttribute("fill").substring(1);
//     const bigint = parseInt(points, 16);
//     const r = (bigint >> 16) & 255;
//     const g = (bigint >> 8) & 255;
//     const b = bigint & 255;
//     const color = r + "," + g + "," + b;

//     path.setAttribute("fill", `rgb( ${color})`);
// }

