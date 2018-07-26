var Carousel = function (doc) {
    // 查找相应元素
    this.touchDoc = document.querySelector(doc);
    this.lis = document.querySelectorAll(doc+' li');
    this.lisLength = this.lis.length;

    // 定义三张图片
    this.now = 0;
    this.pre = this.lisLength - 1;
    this.next = 1;

    // 开始位置
    this.startX = 0;
    // 位置差
    this.deltaX = 0;

    //屏幕宽度
    this.windowWidth = document.documentElement.clientWidth || document.body.clientWidth;

    // 定时滚动
    var that = this;
    this.timer = setInterval(function () {
        that.leftShow();
    }, 3000);

    // 初始化方法
    this.init();
}

// 初始化函数
Carousel.prototype.init = function () {
    // 设置div高度和图片一样高
    this.touchDoc.style.height = getComputedStyle(this.lis[0]).height;
    // 设置每张图片的位置
    var that = this;
    this.lis.forEach(function (item, index) {
        item.style.transform = 'translateX(' + that.windowWidth + 'px)';
    });

    // 给当前、前、后设置新位置
    this.lis[this.now].style.transform = 'translateX(0px)';
    this.lis[this.pre].style.transform = 'translateX(' + (-this.windowWidth) + 'px)';
    this.lis[this.next].style.transform = 'translateX(' + this.windowWidth + 'px)';

    var that = this;
    this.touchDoc.addEventListener('touchstart', function() {that.touchstartHandler(that, event);}, false);
    this.touchDoc.addEventListener('touchmove', function() {that.touchmoveHandler(that, event);}, false);
    this.touchDoc.addEventListener('touchend', function() {that.touchendHandler(that, event);}, false);
}

Carousel.prototype.touchstartHandler = function (that, event) {
    // 阻止默认事件
    event.preventDefault();
    // 一个手指进行滑动
    if(event.touches.length>1) {
        return;
    }
    // 当开始触摸的时候停止定时轮播
    clearInterval(that.timer);
    // 记录开始时间
    that.startX = event.touches[0].clientX;

    that.lis[that.now].style.transition = 'none';
    that.lis[that.pre].style.transition = 'none';
    that.lis[that.next].style.transition = 'none';
}

Carousel.prototype.touchmoveHandler = function (that, event) {
    // 阻止默认事件
    event.preventDefault();
    // 一个手指进行滑动
    if(event.touches.length>1) {
        return;
    }
    clearInterval(that.timer);
    // 得到实时坐标
    var curX = event.touches[0].clientX;
    // 改变位置
    that.lis[that.now].style.transform = 'translateX(' + (curX-that.startX) + 'px)';
    that.lis[that.pre].style.transform = 'translateX(' + (-that.windowWidth+curX-that.startX) + 'px)';
    that.lis[that.next].style.transform = 'translateX(' + (that.windowWidth+curX-that.startX) + 'px)';
}

Carousel.prototype.touchendHandler = function (that, event) {
    // 阻止默认事件
    event.preventDefault();

    that.deltaX = event.changedTouches[0].clientX - that.startX;
    if (that.deltaX < -that.windowWidth/3) { // 向左滑
        that.leftShow();
    } else if (that.deltaX > that.windowWidth/3) {
        that.rightShow();
    } else {
        that.stopShow();
    }

    that.timer = setInterval(function () {
        that.leftShow();
    }, 3000);
}

// 向左滚动
Carousel.prototype.leftShow = function () {
    this.pre = this.now;
    this.now = this.next;
    this.next++;
    if (this.next > this.lisLength-1) {
        this.next = 0;
    }

    this.lis[this.now].style.transition = 'all 0.3s ease 0s';
    this.lis[this.pre].style.transition = 'all 0.3s ease 0s';
    this.lis[this.next].style.transition = 'none';

    this.lis[this.now].style.transform = 'translateX(0px)';
    this.lis[this.pre].style.transform = 'translateX(' + (-this.windowWidth) + 'px)';
    this.lis[this.next].style.transform = 'translateX(' + this.windowWidth + 'px)';
}

// 向右滚动
Carousel.prototype.rightShow = function () {
    this.next = this.now;
    this.now = this.pre;
    this.pre--;
    if (this.pre < 0) {
        this.pre = 4;
    }

    this.lis[this.now].style.transition = 'all 0.3s ease 0s';
    this.lis[this.pre].style.transition = 'none';
    this.lis[this.next].style.transition = 'all 0.3s ease 0s';

    this.lis[this.now].style.transform = 'translateX(0px)';
    this.lis[this.pre].style.transform = 'translateX(' + (-this.windowWidth) + 'px)';
    this.lis[this.next].style.transform = 'translateX(' + this.windowWidth + 'px)';
}

// 回归到远点
Carousel.prototype.stopShow = function () {
    this.lis[this.now].style.transition = 'all 0.3s ease 0s';
    this.lis[this.pre].style.transition = 'all 0.3s ease 0s';
    this.lis[this.next].style.transition = 'all 0.3s ease 0s';

    this.lis[this.now].style.transform = 'translateX(0px)';
    this.lis[this.pre].style.transform = 'translateX(' + (-this.windowWidth) + 'px)';
    this.lis[this.next].style.transform = 'translateX(' + this.windowWidth + 'px)';
}
