
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
       if(document.getElementsByName('Input')[0].value != "") {
          calculate();
       }
    }
    else if( event.code == 'Backspace') {
        document.getElementsByName('Input')[0].value = 
            document.getElementsByName('Input')[0].value.slice(0,-1);
    }
    else {
        
    }
});


function calculate() {
    var p = document.getElementsByName('Input')[0].value;
    var q = eval(p);
    document.getElementsByName('Input')[0].value = q;
}

document.querySelector('#del').onclick = function() {
    document.getElementsByName('Input')[0].value = "";
    document.getElementById('=').focus();
}
document.querySelector('#multiply').onclick = function(){
    document.getElementsByName('Input')[0].value += '*';
    document.getElementById('=').focus();
}
document.querySelector('#one').onclick = function(){
    document.getElementsByName('Input')[0].value += '1';
    document.getElementById('=').focus();
}
document.querySelector('#two').onclick = function(){
    document.getElementsByName('Input')[0].value += '2';
    document.getElementById('=').focus();
}
document.querySelector('#three').onclick = function(){
    document.getElementsByName('Input')[0].value += '3';
    document.getElementById('=').focus();
}
document.querySelector('#four').onclick = function(){
    document.getElementsByName('Input')[0].value += '4';
    document.getElementById('=').focus();
}
document.querySelector('#five').onclick = function(){
    document.getElementsByName('Input')[0].value += '5';
    document.getElementById('=').focus();
}
document.querySelector('#six').onclick = function(){
    document.getElementsByName('Input')[0].value += '6';
    document.getElementById('=').focus();
}
document.querySelector('#seven').onclick = function(){
    document.getElementsByName('Input')[0].value += '7';
    document.getElementById('=').focus();
}
document.querySelector('#eight').onclick = function(){
    document.getElementsByName('Input')[0].value += '8';
    document.getElementById('=').focus();
}
document.querySelector('#nine').onclick = function(){
    document.getElementsByName('Input')[0].value += '9';
    document.getElementById('=').focus();
}
document.querySelector('#zero').onclick = function(){
    document.getElementsByName('Input')[0].value += '0';
    document.getElementById('=').focus();
}
document.querySelector('#divide').onclick = function(){
    document.getElementsByName('Input')[0].value += '/';
    document.getElementById('=').focus();
}
document.querySelector('#add').onclick = function(){
    document.getElementsByName('Input')[0].value += '+';
    document.getElementById('=').focus();
    
}
document.querySelector('#subtract').onclick = function(){
    document.getElementsByName('Input')[0].value += '-';
    document.getElementById('=').focus();
}
document.querySelector('#equals').onclick = function() {
    calculate();
    document.getElementById('=').focus();
}