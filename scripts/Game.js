class Game{
    constructor(){
        this.Land = new land(-100); // land和pipeProduce的speed通过形参传入可以更方便的控制他们的速度相等
        this.Bird = new bird();
        this.Sky = new sky();
        this.Pipeproduce = new pipeProduce(-100);
        this.timer = null;
        this.tick = 16; // 移动事件间隔，单位为毫秒
        this.gameOver = false;
    }
    start(){
        if(this.timer){
            return;
        }else if(this.gameOver){
          window.location.reload(); // 刷新页面，重新开始游戏
        }
        this.Bird.startSwing();
        this.Pipeproduce.startProduce();
        this.timer = setInterval(()=>{
            const duration = this.tick / 1000; // 换算成秒
            this.Land.move(duration);
            this.Sky.move(duration);
            this.Bird.move(duration);
            this.Pipeproduce.pipes.forEach((pipe)=>{ // 每一个水管都要执行move
                pipe.move(duration)
            })
            if(this.isGanmeover()){
                this.stop();
                this.gameOver = true;
            }
        },this.tick)

    }
    // 判断两个矩形是否碰撞
    isHit(rec1, rec2){
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        const rec1X = rec1.left + rec1.width / 2; // 矩形1中心点的横向距离
        const rec1Y = rec1.top + rec1.height / 2; // 矩形1中心点的纵向距离
        const rec2X = rec2.left + rec2.width / 2;
        const rec2Y = rec2.top + rec2.height / 2;
        const centerX = Math.abs(rec2X - rec1X); //两个矩形的中心点的横向距离
        const centerY = Math.abs(rec2Y - rec1Y); //两个矩形的中心点的纵向距离
        if(centerX < (rec1.width + rec2.width) / 2 && centerY < (rec1.height + rec2.height) / 2 ){
            return true;
        }
            return false;
        
    }
    isGanmeover(){
        if(this.Bird.top === this.Bird.maxY){ // 小鸟碰到地板
            return true;
        } 
        for(let i = 0; i < this.Pipeproduce.pipes.length; i++){
            const pipe = this.Pipeproduce.pipes[i];
            if(this.isHit(this.Bird, pipe.uppipe) || this.isHit(this.Bird, pipe.downpipe)){ // 判断小鸟是否有碰到上面或下面的水管
                return true;
            }
        }
            return false;
        
    }
    stop(){ // 暂停
        clearInterval(this.timer);
        this.timer = null;
        this.Bird.stopSwing();
        this.Pipeproduce.stopProduce();
    }
    event(){ // 绑定键盘事件
        window.onkeydown = (e) => {
            if(e.key === "Enter"){
                if(this.timer){
                    this.stop()
                }else{
                    this.start();
                }
            }else if(e.key === " "){
                this.Bird.jump()
            }
        }
    }

}

const g = new Game();
g.event();