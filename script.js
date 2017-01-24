
// get d attribute of path using regex
const getCoordinates = function(path) {
    return path.getAttribute("points").match(/(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)\ (-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)\ (-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)/);
};

const links = document.querySelectorAll("a");
let toPathsArray = [];
let fromPathsArray = getPathsArray(document.querySelector(".svg-holder").querySelectorAll("polygon"));
let animateTo = "nat";

// click on link listener
Array.from(links).forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const animateTo = this.getAttribute("href").substring(1);
        getPaths(animateTo);
    });
});


function getPathsArray(object) {
    const pathsArray = [];

    Array.from(object).forEach((path, i) => {
        const coordinates = getCoordinates(path);
        const pathObj = {};

        pathObj.fill = path.getAttribute("fill");
        pathObj.x0 = coordinates[1];
        pathObj.y0 = coordinates[2];
        pathObj.L0 = coordinates[3];
        pathObj.L1 = coordinates[4];
        pathObj.L2 = coordinates[5];
        pathObj.join = coordinates[6];

        pathsArray.push(pathObj);
    });
   // console.log(pathsArray[0])

    return pathsArray;
}

function animatePaths() {
    // animate d attr
    const polygons = Array.from(document.querySelector(".svg-holder").querySelectorAll("polygon"));
    console.log(fromPathsArray[0])
    console.log(toPathsArray[0])

    fromPathsArray.forEach((obj, i) => {
        TweenLite.to(obj, 1, { x0: toPathsArray[i].x0, y0: toPathsArray[i].y0, L0: toPathsArray[i].L0, L1: toPathsArray[i].L1, L2: toPathsArray[i].L2, join: toPathsArray[i].join, ease: Power4.easeOut, onUpdate: function() {
            polygons[i].setAttribute("points", `${obj.x0},${obj.y0} ${obj.L0},${obj.L1} ${obj.L2},${obj.join}`);
        } });
    });

    // animate color
    Array.from(document.querySelector(".svg-holder").querySelectorAll("polygon")).forEach((path, i) => {
        const fromColor = fromPathsArray[i].fill;
        const toColor = toPathsArray[i].fill;

        TweenMax.to(path, 1, { fill: toColor });
    });
}

// add d attribute values to arrays
function getPaths(animateTo) {
    toPathsArray = getPathsArray(document.getElementById(animateTo).querySelectorAll("polygon"));

    animatePaths();

    fromPathsArray = toPathsArray;
}
