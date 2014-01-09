function pointSizeToFit(text,fontname,width){
var tempFont = document.createElement("font");
tempFont.style.fontSize = "10px";
tempFont.style.fontFamily = fontname;
tempFont.innerHTML = text;
var tempWidth=tempFont.offsetWidth;
var scale = width/tempWidth;
return floor(10*scale);
}
