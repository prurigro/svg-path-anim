const paths = document.querySelectorAll("path");
const links = document.querySelectorAll("a");

[].forEach.call(paths, hexToRgb);

Array.from(links).forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const animateTo = this.getAttribute("href").substring(1);

        getPaths(animateTo);
    });
});

function hexToRgb(path) {
    const points = path.getAttribute("fill").substring(1);
    const bigint = parseInt(points, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const color = r + "," + g + "," + b;

    path.setAttribute("fill", `rgba( ${color}, 0.5)`);
}

const toPathsArray = [];
const fromPathsArray = [];

function getPaths(animateTo) {
    const toPaths = document.getElementById(animateTo).querySelectorAll("path");

    Array.from(toPaths).forEach((path, i) => {
        const pathObj = {};

        const coordinates = toPaths[i].getAttribute("d").match(/M(-?[0-9][0-9]*),(-?[0-9][0-9]*)L(-?[0-9][0-9]*)\ (-?[0-9][0-9]*)\ (-?[0-9][0-9]*)\ (-?[0-9][0-9]*)z/);

        pathObj.fill = toPaths[i].getAttribute("fill");
        pathObj.x0 = coordinates[1];
        pathObj.y0 = coordinates[2];
        pathObj.L0 = coordinates[3];
        pathObj.L1 = coordinates[4];
        pathObj.L2 = coordinates[5];
        pathObj.join = coordinates[6];
        fromPathsArray.push(pathObj);

        // console.log(toPaths[i].getAttribute("d"))
        // console.log(pathObj.join)
    });

    Array.from(document.querySelector(".visible").querySelectorAll("path")).forEach((path, i) => {
        const coordinates = path.getAttribute("d").match(/M(-?[0-9][0-9]*),(-?[0-9][0-9]*)L(-?[0-9][0-9]*)\ (-?[0-9][0-9]*)\ (-?[0-9][0-9]*)\ (-?[0-9][0-9]*)z/);
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

    function animatePaths() {
        toPathsArray.forEach((obj, i) => {
            TweenLite.to(obj, 1, {x0:fromPathsArray[i].x0, y0:fromPathsArray[i].y0, L0:fromPathsArray[i].L0, L1:fromPathsArray[i].L1, L2:fromPathsArray[i].L2, join:fromPathsArray[i].join, ease: Power4.easeOut, onUpdate: function() {

                document.querySelector(".visible").querySelectorAll("path")[i].setAttribute("d" , `M${obj.x0},${obj.y0}L${obj.L0} ${obj.L1} ${obj.L2} ${obj.join}z`);
            } }); 

        });
        
        Array.from(document.querySelector(".visible").querySelectorAll("path")).forEach((path, i) => {
            const fromColor = path.getAttribute("fill");
            const toColor = fromPathsArray[i].fill;

            console.log(toColor)
            console.log(fromColor)
            console.log(path)
            TweenLite.to(path,1, {fill: "red"});
        });
    }
}


