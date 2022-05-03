$(document).ready(function() {
    let dialog = $("#dialog");
    dialog.dialog({
        title: "Image Viewer",
        modal: true,
        draggable: false,
        resizable: false,
        autoOpen: false,
        width: "auto",
        height: "auto"
    });
    let dialogBirds = $("#dialogBirds");
    dialogBirds.dialog({
        title: "Select a Country",
        modal: true,
        draggable: false,
        resizable: false,
        autoOpen: false,
        width: 400,
        height: 150
    });
    $(document).on('click', ".ui-widget-overlay", function() {
        dialog.dialog("close");
        dialogBirds.dialog("close");
    });
});

function showImage(name, imageURL) {
    let dialog = $("#dialog");
    dialog.dialog("open");
    let dialogContainer = document.getElementById('dialogContainer');
    let img = document.createElement('img');
    img.src = imageURL;
    img.alt = name;
    img.id = 'previewImage';
    dialogContainer.innerHTML = '';
    dialogContainer.appendChild(img);
    $("span.ui-dialog-title").text(name);
}
