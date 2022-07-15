const landDOm = document.querySelector(".land");
const landStyle = getComputedStyle(landDOm);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);

class land extends Rectangle{
    constructor(speed){
        super(landWidth, landHeight, 0, landTop, speed, 0, landDOm)
    }
    onMove(){
        if(this.left <= -landWidth / 2){
            this.left = 0
        }
    }
}