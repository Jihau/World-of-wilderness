let imageSources = ['../img/nature/forestpath.png', '../img/nature/green_flowers.png', '../img/nature/green_leafs.png', '../img/nature/white_flowers.png'];

let index = 0;
const imgElement = document.getElementById("imageSource");

function change() {
   imgElement.src = imageSources[index];
   index > 2 ? index = 0 : index++;
}

window.onload = function () {
    setInterval(change, 3000);
};