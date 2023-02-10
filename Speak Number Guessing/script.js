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

    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
    msgEL.innerHTML = `
        <div>You Said: </div>
        <span class="box">${msg}</span>
    `;
}

// Check mesasge against number 
function checkNumber(msg){
    const num = +msg;

    // Check if valid number
    if(Number.isNaN(num)) {
        msgEL.innerHTML += '<div> That is not a valid number</div>';
        return;
    }

    // check if in range
    if (num > 100 || num < 1) {
        msgEL.innerHTML = '<div>Number must be between 1 and 100</div>';
        return;
    }

    // Check number
    if(num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number!<br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNum) {
        msgEL.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgEL.innerHTML += '<div>GO HIGHER</div>';
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
});