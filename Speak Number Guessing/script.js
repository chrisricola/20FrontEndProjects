const msgEL = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start recognnition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    // writeMessage(msg);
    // checkNumber(msg);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);