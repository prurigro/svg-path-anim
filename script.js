
// get points of polygons using regex
const getCoordinates = function(path) {
    return path.getAttribute("points").match(/(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)\ (-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)\ (-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)/);
};

const links = document.querySelectorAll("a");
let toPathsArray = [];
let fromPathsArray = getPathsArray(document.querySelector(".svg-holder").querySelectorAll("polygon"));

// click on link listener
[].forEach.call(links, function(el, i, els) {
    el.addEventListener("click", function(event) {
        const animateTo = this.getAttribute("href").substring(1);

        [].forEach.call(els, function(el) {
            if (el !== this) {
                el.classList.remove("active");
            } else {
                this.classList.add("active");
            }
        }, this);

        event.preventDefault();
        this.classList.add("active");
        getPaths(animateTo);
    });
});

function getPathsArray(object) {
    const pathsArray = [];

    Array.from(object).forEach((path, i) => {
        const coordinates = getCoordinates(path);

        pathsArray.push({
            fill: path.getAttribute("fill"),
            x0: coordinates[1],
            y0: coordinates[2],
            L0: coordinates[3],
            L1: coordinates[4],
            L2: coordinates[5],
            join: coordinates[6]
        });
    });

    return pathsArray;
}

function animatePaths() {
    // animate polygon points attr
    const polygons = Array.from(document.querySelector(".svg-holder").querySelectorAll("polygon"));

    console.log(fromPathsArray[0]);
    console.log(toPathsArray[0]);

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

// add points attribute values to arrays
function getPaths(animateTo) {
    toPathsArray = getPathsArray(document.getElementById(animateTo).querySelectorAll("polygon"));

    animatePaths();

    fromPathsArray = toPathsArray;
}
