
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


function btns(sign, addition) {
    document.querySelector(sign).onclick = function(){
        document.getElementsByName('Input')[0].value +=
        addition;
        document.getElementById('=').focus();
    }
}

btns('#decimal','.');
btns('#multiply','*');
btns('#one','1');
btns('#two','2');
btns('#three','3');
btns('#four','4');
btns('#five','5');
btns('#six','6');
btns('#seven','7');
btns('#eight','8');
btns('#nine','9');
btns('#zero','0');
btns('#divide','/');
btns('#add','+');
btns('#subtract','-');

document.querySelector('#del').onclick = function() {
    document.getElementsByName('Input')[0].value = "";
    document.getElementById('=').focus();
}
document.querySelector('#equals').onclick = function() {
    calculate();
    document.getElementById('=').focus();
}