var Carousel = function (doc) {
    // 查找相应元素
    this.touchDoc = document.querySelector(doc);
    this.lis = document.querySelectorAll(doc+' li');
    this.lisLength = this.lis.length;

    // 定义三张图片
    this.now = 0;
    this.pre = this.lisLength - 1;
    this.next = 1;

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
