// Design From https://www.youtube.com/watch?v=49f1cjZWRJA


// Global variables
const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById('stop');
const reset_btn = document.getElementById('reset');

let seconds = 0;
let interval = null;

var audio = new Audio('chime_alarm.m4a');

// Event listeners
start_btn.addEventListener('click',start);
stop_btn.addEventListener('click',stop);
reset_btn.addEventListener('click',reset);

// Viewing slider inputs
slider('h','hour');
slider('m','minute');
slider('s','second');

function slider(i, c) {
    document.getElementById(i).oninput = function() {
        
        if(this.value < 10) {
            document.getElementById(c).innerText = '0' + this.value;
        }
        else {
            document.getElementById(c).innerText = this.value;
        }
    }
}

// Update the timer
function timer () {
    seconds = parseFloat(document.getElementById('hour').innerText) * 3600 + 
        parseFloat(document.getElementById('minute').innerText) * 60 + 
        parseFloat(document.getElementById('second').innerText);
    
        if(seconds === 0) {
            return;
        }

    seconds--;

    // format our time
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds % 60;

    if(secs < 10) secs = '0' + secs;
    if(mins < 10) mins = '0' + mins;
    if(hrs < 10) hrs = '0' + hrs;
    if(seconds === 0) {
        // Play a sound here
        audio.play();
        clearInterval(interval);
        interval = null;
    }

    document.getElementById('hour').innerText = hrs;
    document.getElementById('minute').innerText = mins;
    document.getElementById('second').innerText = secs;

    document.getElementById('h').value = hrs;
    document.getElementById('m').value = mins;
    document.getElementById('s').value = secs;
}

function start () {
    if(interval) {
        return
    }

    interval = setInterval(timer,1000);
}

function stop () {
    clearInterval(interval);
    interval = null;
    audio.pause();
    audio.currentTime = 0;
}

function reset () {
    stop();
    seconds = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('h').value = 0;
    document.getElementById('minute').innerText = '00';
    document.getElementById('m').value = 0;
    document.getElementById('second').innerText = '00';
    document.getElementById('s').value = 0;
    audio.pause();
    audio.currentTime = 0;
}
