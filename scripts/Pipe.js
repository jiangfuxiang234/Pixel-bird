const gameWidth = gameDom.clientWidth;

class pipe extends Rectangle{
    constructor(height, top, speed, dom){
    super (52 , height, gameWidth, top, speed, 0, dom)
}
    onMove(){
        if(this.left < -this.width){
            this.dom.remove() // dom虽然被移除了，但是他创建的这个对象没有被移除，所以下面还要将所有创建的对象放进数组里，再去判断是否移除；
        }
    }
}
// 随机产生柱子的高度
function rendonHeight(minHeight, maxHeight){
    return Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
}
// 产生柱子对
class pipePare{
    constructor(speed){
        this.spaceHeight = 150; // 柱子之间空隙高度
        this.minHeight = 80; // 柱子最小高度
        this.maxHeight = landTop - this.spaceHeight - this.minHeight; // 柱子最大高度
        const upHeight = rendonHeight(this.minHeight, this.maxHeight); // 随机取到一个柱子高度
        const upDom = document.createElement("div");
        upDom.className = "pipe up";
        this.uppipe = new pipe(upHeight, 0, speed, upDom);
        const downHeight = landTop - this.spaceHeight - upHeight; // 下水管的高度取决于上水管的高度
        const downTop = landTop - downHeight;
        const downDOm = document.createElement("div");
        downDOm.className = "pipe down"
        this.downpipe = new pipe(downHeight, downTop, speed, downDOm);
        gameDom.appendChild(upDom);
        gameDom.appendChild(downDOm);
    }
    move(duration){
        this.uppipe.move(duration); // 由于this.uppipe是new pipe产生的，所以还是能用到Rectangle里面的move
        this.downpipe.move(duration);
    }

    get useless (){ // 判断有没有出界
        return this.uppipe.left < -this.uppipe.width;
    }
}
// 不断产生柱子对
class pipeProduce{
    constructor(speed){
        this.speed = speed;
        this.timer = null;
        this.pipes = [];
        this.tick = 1500;
    }

    startProduce(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(()=>{
            this.pipes.push(new pipePare(this.speed));
            for(let i = 0; i < this.pipes.length; i++){
            if(this.pipes[i].useless){
                this.pipes.splice(i, 1);
                i--;
            }
        }
        },this.tick)
    }
    // 停止产生柱子对
    stopProduce(){
        clearInterval(this.timer);
        this.timer = null;
    }
}
