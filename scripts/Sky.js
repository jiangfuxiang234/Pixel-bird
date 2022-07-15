const skeyDOm = document.querySelector(".sky");
const skeyStyle = getComputedStyle(skeyDOm);
const skeyWidth = parseFloat(skeyStyle.width);
const skeyHeight = parseFloat(skeyStyle.height);

class sky extends Rectangle{
    constructor(){
        super(skeyWidth, skeyHeight, 0, 0, -50, 0, skeyDOm)
    }
    onMove(){
        if(this.left <= -skeyWidth / 2){ // 天空背景到头了就又从头开始
            this.left = 0
        }
    }
}