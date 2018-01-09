var player = null;
var allEnemies = [];
// 这是我们的玩家要躲避的敌人 
var Enemy = function(speed,x,y,i) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';

    // 速度
    this.speed = speed;

    // 起始坐标
    this.x = x;
    this.y = y;
    this.i = i;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    if (this == null) { return;};

    if(this.speed < 60){
        this.speed = 60;
    }
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x +=  this.speed * dt;
    if(this.x > 506){
        this.x = -100 * (Math.random() * 3);
        this.speed = (Math.random() * 150).toFixed(0);
        this.y = 83 * ((Math.random() * 10).toFixed(0) % 3) + 55;
        //allEnemies[i] = new Enemy((Math.random() * 100).toFixed(0),-100,(83 * (this.i % 3) + 55),i);
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y){
    // 继承函数
    Enemy.call(this,0,x,y);    
    this.score = 0;

    this.sprite = 'images/char-boy.png';

}

// player移动函数
Player.prototype.handleInput = function(action){
    var crosswise = 100;
    var lengthways = 85;
    switch(action){
        case 'left':
            var move = this.x - crosswise;
            if(move > -crosswise){
                this.x = move;
            }
            break;
        case 'right':
            var move = this.x + crosswise;
            if(move < 500){
                this.x = move;
            }
            break;
        case 'up':
            var move = this.y - lengthways;

            if(move >= -20){
                this.y = move;
            }

            // 之前忘了加判断条件
            if(move <= -20){
                sleep("1000");
                this.score = this.score + 100;
            }
            break;

        case 'down':
            var move = this.y + lengthways;
            if(move <= 450){
                this.y = move;
            }
            break;
    }

    this.update();
}


Player.prototype.update = function(){
    allEnemies.forEach(function(enemy) {
        var absX = Math.abs(enemy.x - player.x);
        var absY = Math.abs(enemy.y - player.y);
        // console.log(absX+"...."+absY);

        if(absY < 65 && absX < 65){
            reset();
        }
    });

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //绘制分数
    ctx.fillStyle = "white";
    ctx.font = '26px Arial';
    ctx.fillText("Your Score: " + this.score, 15, 90);
};

// 触发重置的函数
function reset(){
    //player = new Player(300,320);
    player.x = 300;
    player.y = 320;
}

function sleep(msec){
    setTimeout(function(){
        reset();
    },msec);
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
function instantiation(){
    // 敌人
    for(var i = 0; i <= 4; i++){
        // 初始位置在三行石头，x轴为0的地方  TODO 
        allEnemies[i] = new Enemy((Math.random() * 200).toFixed(0),-50 * (Math.random() * 3),(83 * (i % 3) + 55),i);
    }

    // 游戏玩家 410 300 220 140 60 -20
    player = new Player(300,320);
}

instantiation();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
