$(document).ready(function() {
    let dialog = $("#dialog");
    dialog.dialog({
        title: "Dialog",
        modal: true,
        draggable: false,
        resizable: false,
        autoOpen: false,
        width: "auto",
        height: "auto"
    });
    dialog.dialog("open");
    dialog.dialog("close");
    $(document).on('click', ".ui-widget-overlay", function() {
        dialog.dialog("close");
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
