var newP = document.createElement("p");

var newContent = document.createTextNode("This is the new text");

newP.appendChild(newContent);

var currentP = document.getElementById("below");
document.body.insertBefore(newP, currentP)

