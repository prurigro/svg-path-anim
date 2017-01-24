let toPathsArray = [];
let fromPathsArray = [];

// get d attribute of path using regex
function getCoordinates(path) {
    return path.getAttribute("d").match(/M(-?[0-9][0-9]*),(-?[0-9][0-9]*)L(-?[0-9][0-9]*)\ (-?[0-9][0-9]*)\ (-?[0-9][0-9]*)\ (-?[0-9][0-9]*)z/);
}

function animatePaths() {
    // animate d attr
    toPathsArray.forEach((obj, i) => {
        TweenLite.to(obj, 1, { x0: fromPathsArray[i].x0, y0: fromPathsArray[i].y0, L0: fromPathsArray[i].L0, L1: fromPathsArray[i].L1, L2: fromPathsArray[i].L2, join: fromPathsArray[i].join, ease: Power4.easeOut, onUpdate: function() {
            document.querySelector(".visible").querySelectorAll("path")[i].setAttribute("d", `M${obj.x0},${obj.y0}L${obj.L0} ${obj.L1} ${obj.L2} ${obj.join}z`);
        } });
    });

    // animate color
    Array.from(document.querySelector(".visible").querySelectorAll("path")).forEach((path, i) => {
        const fromColor = path.getAttribute("fill");
        const toColor = fromPathsArray[i].fill;

        TweenMax.to(path, 1, { fill: toColor });
    });
}

function getPathsArray(object) {
    const pathsArray = [];

    Array.from(object).forEach((path, const links = document.querySelectorAll("a");
let toPathsArray = [];
let fromPathsArray = [];
let animateTo;

// get d attribute of path using regex
const getCoordinates = function(path) {
    return path.getAttribute("d").match(/M(-?[0-9][0-9]*),(-?[0-9][0-9]*)L(-?[0-9][0-9]*)\ (-?[0-9][0-9]*)\ (-?[0-9][0-9]*)\ (-?[0-9][0-9]*)z/);
};

function animatePaths() {
    // animate d attr
    fromPathsArray.forEach((obj, i) => {            
        console.log(obj.x0)
        console.log(toPathsArray[i].x0)

        TweenLite.to(obj, 1, { x0: toPathsArray[i].x0, y0: toPathsArray[i].y0, L0: toPathsArray[i].L0, L1: toPathsArray[i].L1, L2: toPathsArray[i].L2, join: toPathsArray[i].join, ease: Power4.easeOut, onUpdate: function() {
            document.querySelector(".visible").querySelectorAll("path")[i].setAttribute("d", `M${obj.x0},${obj.y0}L${obj.L0} ${obj.L1} ${obj.L2} ${obj.join}z`);
        } });
    });
    
    // animate color
    Array.from(document.querySelector(".visible").querySelectorAll("path")).forEach((path, i) => {
        const fromColor = path.getAttribute("fill");
        const toColor = toPathsArray[i].fill;

        TweenMax.to(path, 1, { fill: toColor });
    });
}

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

    return pathsArray;
}

// add d attribute values to arrays
function getPaths(animateTo) {
    toPathsArray = getPathsArray(document.querySelector(".visible").querySelectorAll("path"));
    animatePaths();
    fromPathsArray = toPathsArray;
}

fromPathsArray = getPathsArray(document.getElementById("yeojin").querySelectorAll("path"));

// click on link listener
Array.from(links).forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        animateTo = this.getAttribute("href").substring(1);

        getPaths(animateTo);

        setTimeout(function(){
            document.querySelector(".visible").setAttribute("class", "hidden");
            document.getElementById(animateTo).setAttribute("class", "visible");
        },1000);
    });
});
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

i) => {
        const coordinates = getCoordinates(path);
        const pathObj = {};

        pathObj.fill = toPaths[i].getAttribute("fill");
        pathObj.x0 = coordinates[1];
        pathObj.y0 = coordinates[2];
        pathObj.L0 = coordinates[3];
        pathObj.L1 = coordinates[4];
        pathObj.L2 = coordinates[5];
        pathObj.join = coordinates[6];

        pathsArray.push(pathObj);
    });

    return pathsArray;
}

function getPaths(animateTo) {
    toPathsArray = getPathsArray(document.querySelector(".visible").querySelectorAll("path"));
    animatePaths();
    fromPathsArray = toPathsArray;
}

// populate the fromPathsArray with the initial state
fromPathsArray = getPathsArray(document.getElementById(animateTo).querySelectorAll("path"));

// click on link listener
Array.from(document.querySelectorAll("a")).forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const animateTo = this.getAttribute("href").substring(1);

        getPaths(animateTo);
    });
});