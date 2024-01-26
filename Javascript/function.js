var text1 = 0;

function changeMyNumber(value,valueTwo,valueThree){
    text1 = value + valueTwo + valueThree;
}

changeMyNumber(3,4,7)


document.getElementById("text1").innerHTML = text1;