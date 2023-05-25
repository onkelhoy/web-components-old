// tools
import '@circular-tools/doc/wc';

// component
import '@circular/icon/bundle-wc';

const circleIcons = [
    "circle_empty",
    "clock_loader_10",
    "clock_loader_20",
    "clock_loader_40",
    "clock_loader_60",
    "clock_loader_80",
    "clock_loader_90",
    "circle",
];
let ticker = 1;
let index = 0;

window.onload = () => {

    requestAnimationFrame(change);
}   


function change() {
    if (ticker % 30 === 0) {
        index++;
        window.animation.name = circleIcons[index % circleIcons.length];
    }
    ticker++;
    requestAnimationFrame(change)
}