let TextResize = function(){
    let elem = document.getElementById("shifttext");
    let size = elem.style.fontSize;

    setInterval(() => {
    size++;
    elem.style.fontSize = (size%40 + 30)+"px";},
    100);
}

export default TextResize; 