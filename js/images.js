let imageSources = ['../img/nature/capy.jpg', '../img/nature/green_flowers.png', '../img/nature/cow.png', '../img/nature/white_flowers.png', '../img/nature/crocos.png' , '../img/nature/cat1.png', '../img/nature/leopard.png', '../img/nature/forestpath.jpg'];

let index = 1;
const imgElement = document.getElementById("imageSource");

function change() {
   imgElement.src = imageSources[index];
   index > 6 ? index = 1 : index++;
}

window.onload = function () {
    setInterval(change, 3000);
};