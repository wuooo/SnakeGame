//随机生成食物
//获取食物
let food =document.querySelector('.food');
    function changeFood(){
        //随机生成左偏移量
        food.style.left=Math.round(Math.random()*29)*10+'px';
        //随机生成右偏移量
        food.style.top=Math.round(Math.random()*29)*10+'px';
    };
changeFood();
    //控制贪吃蛇头部移动
    //获取贪吃蛇的身体
    let snake=document.getElementById('snake');
    let body=snake.getElementsByTagName('div');
    let head=body[0];
    //获取分数,等级
    let scores = document.getElementsByTagName('span')[0];
    let levels = document.getElementsByTagName('span')[1];
    //设置一个初始分数与等级
    let score=0,level=1;
    //创建变量去获取贪吃蛇的移动方向
    let dir = null;
    //为贪吃蛇绑定键盘键按下事件，按下相应键盘键则触发事件
    document.addEventListener('keydown',function(event) {
    //    保持贪吃蛇一直移动就要判断键值是不是方向键
    //    除了方向键按下其他键都不能改变贪吃蛇的移动状态
        //    即只要按键就移动，且不关乎按下不按都不会取消
        let keys=['up','ArrowUp','down','ArrowDown','left','ArrowLeft','right','ArrowRight'];
        if(keys.indexOf(event.key)!==-1){
            //获取键盘按键值
            dir = event.key;
        }
    });
    //判断是移动键的哪个方向，要兼容IE以及按下移动10px
    //获取贪吃蛇的头部x,y偏移量
    setTimeout(function move() {
        //贪吃蛇头部的偏移量
        let top = head.offsetTop;
        let left = head.offsetLeft;
        switch (dir) {
            case 'ArrowUp':
            case 'up':
                top -= 10;
                //判断是否回头
                //蛇头与第二节身子偏移量的比较,前提有第二节身子
                if(body[1]&&top==body[1].offsetTop){
                  //保证身子原地不动且不停止前进
                    top+=20;
                }
                break;
            case 'ArrowDown':
            case 'down':
                top += 10;
                if(body[1]&&top==body[1].offsetTop){
                    top-=20;
                }
                break;
            case 'ArrowRight':
            case 'right':
                left += 10;
                if(body[1]&&left==body[1].offsetLeft){
                    left-=20;
                }
                break;
            case 'ArrowLeft':
            case 'left':
                left -= 10;
                if(body[1]&&left==body[1].offsetLeft){
                    left+=20;
                }
                break;
        };
        //检测贪吃蛇是否撞墙
        //即检测偏移量
        if (top < 0 || top > 290 || left < 0 || left > 290) {
            alert('撞墙啦！GAME OVER！');
            //    提示游戏结束，贪吃蛇不再移动
            return;
        };
        //判断贪吃蛇是否吃到食物
        if (left === food.offsetLeft && food.offsetTop === top) {
            changeFood();
            //吃到食物后身体增加一格
            //创建一个新身体
            let newBody = document.createElement('div');
            //新身体加在原贪吃蛇后面
            snake.appendChild(newBody);
            //分数加一
            score++;
            scores.innerHTML=score;
            //判断分数升级，到达一定级别不再提速了，没得玩
            if(level<12&&score / 10 === level){
                level++;
                levels.innerHTML=level;
            }
        };
        //获取前后身子的位置
        //第一个身子头后面一个，最后一个身子就是尾巴
        for (let i = body.length - 1; i > 0; i--) {
            let bodyLeft = body[i-1].offsetLeft;
            let bodyTop = body[i-1].offsetTop;
            //增加的身体也要移动，后来的身子位置顶替前一个身子的位置
            body[i].style.left = bodyLeft + 'px';
            body[i].style.top= bodyTop + 'px';
            //    判断有没有碰到自己的身子
            //    身子的偏移量与头部一样
            if(bodyLeft===left&&bodyTop===top){
                alert('撞到自己了！GAME OVER!');
                return;
            }
        }
        //修改贪吃蛇蛇头的位置
        head.style.left = left + 'px';
        head.style.top = top + 'px';
      //设置等级增加，移速增加
        setTimeout(move, 300-30*(level-1));
    }, 300);
