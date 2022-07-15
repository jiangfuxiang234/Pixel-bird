class Rectangle {
    constructor(width, height, left, top, Xspeed, Yspeed, dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.Xspeed = Xspeed;
        this.Yspeed = Yspeed;
        this.dom = dom;
        this.rendon();
    }
    rendon(){
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";

    }
    move(duration){
        const xdis = this.Xspeed * duration;
        const ydis = this.Yspeed * duration;
        this.left = this.left + xdis ;
        this.top = this.top + ydis;
        if(this.onMove){
            this.onMove()
        }
        this.rendon()
    }
}