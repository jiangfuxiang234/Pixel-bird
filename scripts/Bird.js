const birdDOm = document.querySelector(".bird");
const birdStyle = getComputedStyle(birdDOm);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdLeft = parseFloat(birdStyle.left);
const birdTop = parseFloat(birdStyle.top);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;


class bird extends Rectangle{
    constructor(){
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDOm);
        this.maxY = gameHeight - landHeight - this.height; // landHeight在上一个js文件里面可以获取到，所以这里不要重新定义赋值
        this.timer = null; // 改变翅膀的定时器
        this.g = 1600; // 向下的加速度，单位：像素/秒²
        this.swingState = 1; // 小鸟翅膀的状态
         this.rendon();//bird有自己的rendon渲染方式，所以这里要重新渲染一下
    }
    // 开始扇动翅膀
    startSwing(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(()=>{
            this.swingState++;
            if(this.swingState === 4){
                this.swingState = 1
            }
            this.rendon();// 翅膀改变一次就渲染一次
        },200)
    }
    rendon(){
        super.rendon(); //重用父类渲染逻辑
        this.dom.className = `bird swing${this.swingState}`
    }
     // 停止扇动翅膀
    stopSwing(){
        clearInterval(this.timer);
        this.timer = null;
    }
    move(duration){
    super.move(duration); // 调用父类方法
    this.Yspeed += this.g * duration;
    }
    onMove(){ // 控制鸟的坐标范围
        if(this.top < 0){
            this.top = 0
        }
        if(this.top > this.maxY){
            this.top = this.maxY;
        }

    }
  // 向上跳，直接给一个向上的速度 
    jump(){
        this.Yspeed = -450;
    }
}