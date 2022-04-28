function initMe(){
    window.addEventListener('message', receiveMessage, false)
}
function receiveMessage(event) {
    let logger = document.getElementById('console');
    logger.value = event.data;
}
function clearConsole() {
    let logger = document.getElementById('console');
    logger.value = '';
}
window.onload = initMe;