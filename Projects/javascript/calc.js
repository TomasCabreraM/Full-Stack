function add(){

    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number1").value;
    
    var addedNumber = Number(number1) + Number(number2);

    document.getElementById("result").innerText = "Result = " + addedNumber
}
function minus(){

    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number1").value;
    
    var addedNumber = Number(number1) - Number(number2);

    document.getElementById("result").innerText = "Result = " + addedNumber
}
function multiply(){

    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number1").value;
    
    var addedNumber = Number(number1) * Number(number2);

    document.getElementById("result").innerText = "Result = " + addedNumber
}
function divide(){

    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number1").value;
    
    var addedNumber = Number(number1) / Number(number2);

    document.getElementById("result").innerText = "Result = " + addedNumber
}

