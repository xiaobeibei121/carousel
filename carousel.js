var carousel = document.getElementById('carousel');
var lis = Array.from(document.querySelectorAll('#carousel li'));

// 定义三张图片
var now = 0;
var pre = 4;
var next = 1;

var windowWidth;
init();
function init() {
    windowWidth = document.documentElement.clientWidth || document.body.clientWidth;

    // 设置div和图片一样高
    carousel.style.height = getComputedStyle(lis[0]).height;

    // 设置每张图片的位置
    lis.forEach(function (item, index) {
        item.style.transform = 'translateX(' + windowWidth + 'px)';
    });

    // 给当前、前、后设置新位置
    lis[now].style.transform = 'translateX(0px)';
    lis[pre].style.transform = 'translateX(' + (-windowWidth) + 'px)';
    lis[next].style.transform = 'translateX(' + windowWidth + 'px)';
}

var timer = setInterval(function () {
    leftShow();
}, 3000);

function leftShow() {
    pre = now;
    now = next;
    next++;
    if (next > 4) {
        next = 0;
    }

    lis[now].style.transition = 'all 0.3s ease 0s';
    lis[pre].style.transition = 'all 0.3s ease 0s';
    lis[next].style.transition = 'none';

    lis[now].style.transform = 'translateX(0px)';
    lis[pre].style.transform = 'translateX(' + (-windowWidth) + 'px)';
    lis[next].style.transform = 'translateX(' + windowWidth + 'px)';
}

function rightShow() {
    next = now;
    now = pre;
    pre--;
    if (pre < 0) {
        pre = 4;
    }

    lis[now].style.transition = 'all 0.3s ease 0s';
    lis[pre].style.transition = 'none';
    lis[next].style.transition = 'all 0.3s ease 0s';

    lis[now].style.transform = 'translateX(0px)';
    lis[pre].style.transform = 'translateX(' + (-windowWidth) + 'px)';
    lis[next].style.transform = 'translateX(' + windowWidth + 'px)';
}

function stopShow() {
    lis[now].style.transition = 'all 0.3s ease 0s';
    lis[pre].style.transition = 'all 0.3s ease 0s';
    lis[next].style.transition = 'all 0.3s ease 0s';

    lis[now].style.transform = 'translateX(0px)';
    lis[pre].style.transform = 'translateX(' + (-windowWidth) + 'px)';
    lis[next].style.transform = 'translateX(' + windowWidth + 'px)';
}

carousel.addEventListener('touchstart', touchstartHandler, false);
carousel.addEventListener('touchmove', touchmoveHandler, false);
carousel.addEventListener('touchend', touchendHandler, false);


var deltaX;// 手指的偏移量
var startX;// 触摸开始时候手指位置

function touchstartHandler(event) {
    // 阻止默认事件
    event.preventDefault();
    // 一个手指进行滑动
    if(event.touches.length>1) {
        return;
    }
    // 当开始触摸的时候停止定时轮播
    clearInterval(timer);
    // 记录开始时间
    startX = event.touches[0].clientX;
    // deltaX = event.touches[0].clientX;

    lis[now].style.transition = 'none';
    lis[pre].style.transition = 'none';
    lis[next].style.transition = 'none';
}

function touchmoveHandler(event) {
    // 阻止默认事件
    event.preventDefault();
    // 一个手指进行滑动
    if(event.touches.length>1) {
        return;
    }
    clearInterval(timer);
    // 得到实时坐标
    var curX = event.touches[0].clientX;
    // 改变位置
    lis[now].style.transform = 'translateX(' + (curX-startX) + 'px)';
    lis[pre].style.transform = 'translateX(' + (-windowWidth+curX-startX) + 'px)';
    lis[next].style.transform = 'translateX(' + (windowWidth+curX-startX) + 'px)';
}

function touchendHandler(event) {
    // 阻止默认事件
    event.preventDefault();

    deltaX = event.changedTouches[0].clientX - startX;
    if (deltaX < -windowWidth/3) { // 向左滑
        leftShow();
    } else if (deltaX > windowWidth/3) {
        rightShow();
    } else {
        stopShow();
    }

    timer = setInterval(function () {
        leftShow();
    }, 3000);
}