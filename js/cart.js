class Index {
    constructor() {
        this.cart = this.$('#topbar-cart');
        // this.a = this.cart.firstElementChild;
        this.cart.addEventListener('mouseenter', this.cartFn.bind(this));
        this.cart.addEventListener('mouseleave', this.cartFn1.bind(this));
        //获取到输入框
        this.inputObj = this.$('.search-text')
        this.inputObj.addEventListener('focus', this.foFn.bind(this))
        this.inputObj.addEventListener('blur', this.bLFn.bind(this))
        //获取到所有的Li用于添加.active
        this.lisObj = Array.from(this.$('.result-list').children);
        this.placeholder(this.lisObj, this.inputObj);
        // console.log(typeof (Array.from(this.lisObj)));
        //用于添加active 以及和键盘按下的事件
        this.index = -1;
        this.lisObjFn()
        this.inputObj.addEventListener('keydown', this.downFn.bind(this, this.index));
        //设置轮播
        // let index = 0;
        //图片的切换效果
        this.qihuan()
        //获取到所有的.nav-lunbo下面的所有Li标签
        this.lunboLisObj = document.querySelectorAll('.nav-lunbo li');
        //设置移入切换热门和更多
        document.querySelectorAll('.more').forEach(v => {
            v.addEventListener('mouseenter', this.mFn.bind(this));
        })
        document.querySelectorAll('.more1').forEach(v => {
            v.addEventListener('mouseenter', this.m1Fn.bind(this));
        })
        // console.log(this.$('.mobile-right').firstElementChild);
        // console.log(this.$('.mobile-right').lastElementChild);
        //设置点击back回到顶部
        this.$('.back').addEventListener('click', this.backFn.bind(this))
        document.documentElement.scrollTop = 260;
        // console.log(document.documentElement.scrollTop);
        //判断是否到达400  达到就显示向上按键 以及继续回到顶部
        this.blFn();
        //用于判断购物车是否有数据
        this.shopFn();
        //给x添加删除同样要更新数据
        //btn1去购物车结算
        this.$('.btn1').addEventListener('click', this.tiaoFn.bind(this));
        //一进来就让滚轮在301;
        if (!this.$('.delte')) {
            return
        } else {
            this.$('.delte').addEventListener('click', this.deFn.bind(this));
            // console.log(1);
        }

    }
    //设置每3秒切换一次plachoder
    placeholder(lis, input) {
        // console.log(lis.length);
        let c;
        // console.log(lis, input);
        setInterval(() => {
            c = parseInt((Math.random() * (lis.length - 1)) + 1)
            input.placeholder = lis[c].innerHTML.trim();
        }, 2500);

    }
    tiaoFn() {
        location.href = './shoping.html'
    }
    deFn() {
        console.log(event.target.parentNode);
        let id = event.target.parentNode.getAttribute('goods-id');
        // console.log(id);
        //删除这个li
        let num = event.target.parentNode.getAttribute('goods-num');
        event.target.parentNode.remove();
        this.updateFn(id);
        //更新数量和总数
        this.totalNP();
        //隐藏样式 判断是否为空的时候在进行隐藏他
        this.$('.cart-bottom').style.display = 'none';
        this.shopFn();

    }
    //获取总价格和选中数量
    totalNP() {
        //重新获取此时的locaStorage的数据
        let c = 0;
        let n = 0;
        let date = localStorage.getItem('cart');
        if (!date) {
            return
        }
        date = JSON.parse(date);
        date.forEach(goods => {
            c += goods.num * goods.price;
            n += Number(goods.num);
        })
        this.$('.left i').innerHTML = n;
        this.$('.fixed-shop').innerHTML = n;
        this.$('.left .price').innerHTML = c;

    }
    //更新数据 默认数据为0
    updateFn(id, num = 0) {
        //删除的时候获取ID 删除localStorage中的对应id的数据
        let date = localStorage.getItem('cart');
        //判断数据是否空
        if (!date) {
            return
        }
        date = JSON.parse(date);
        // console.log(date);
        //遍历
        date.forEach((v, k) => {
            //判断两个id是否相等
            if (id == v.id) {
                if (num) {
                    v.num = num; // 修改数量
                } else {
                    //否则的话每次删除一次
                    // console.log(1);
                    date.splice(k, 1)

                }
            }
        })
        //重新更新数据
        localStorage.setItem('cart', JSON.stringify(date))
        //重新获取num
        let c = 0;
        date = JSON.parse(localStorage.getItem('cart')).forEach(goods => {
            c += Number(goods.num)
        })
        this.$('.Num').innerHTML = c;

    }
    shopFn() {
        //获取到页面的localStorage
        let date = localStorage.getItem('cart');
        //进行判断
        date = JSON.parse(date);
        //用于在购物车中显示买了多少数量的东西
        let count = 0;
        let htm = '';
        // 如果数据为空 则[] date.length = 0;
        // date为空
        if (date == null || date.length == 0) {
            //显示购物车中无数据 也就是有div.empty
            let div = document.createElement('div');
            div.className = 'empty';
            div.innerHTML = '购物车中还没有商品，赶紧选购吧'
            this.$('.cart-menu').appendChild(div)
        } else {
            //遍历到date中的num
            date.forEach(goods => {
                count += Number(goods.num);
                //添加到
                htm += `<li class='item-list' goods-id=${goods.id} goods-num=${goods.num}><a  href='#node' class='Img'><img src='${goods.src}'></a>
                            <a href='#node' class='name'>${goods.name}</a>
                            <a href='#node'>${goods.price}元*${goods.num}</a>
                            <a  class='delte'>x</i>
                </li>`
                this.$('.Num').innerHTML = count;
                this.$('.left i').innerHTML = goods.num;
                this.$('.left .price').innerHTML += `${goods.price * goods.num}元`
                this.$('.fixed-shop').innerHTML = goods.num;
            })
            this.$('.List').innerHTML = htm;
            this.totalNP()
        }
    }
    // 购物车移入效果
    cartFn() {
        this.cart.className = 'topbar-carts  topbar-cart-active'
        //获取到cart-menu标签并且让她高度为40 同时让字体显示出来
        let date = localStorage.getItem('cart');
        // console.log(date);
        date = JSON.parse(date)
        if (date == null || date.length == 0) {
            this.$('.cart-menu').style.height = 100 + 'px';
            this.$('.cart-menu .empty').style.display = 'block';
        } else {
            this.$('.cart-bottom').style.display = 'block';
            document.querySelectorAll('.item-list').forEach(v => {
                v.style.display = 'block'
            })
        }
    }
    cartFn1() {
        this.cart.className = 'topbar-carts'
        this.$('.cart-menu').style.height = 0;
        document.querySelectorAll('.item-list').forEach(v => {
            v.style.display = 'none'
        })
        this.$('.cart-bottom').style.display = 'none';
        // this.$('.cart-menu .empty').style.display = 'none';
        if (this.$('.cart-menu .empty')) {
            this.$('.cart-menu .empty').style.display = 'none';
        }
    }
    //添加输入框移入移出效果的效果 并且border变色
    foFn() {
        this.$('.keyword-list').style.display = 'block';
        this.$('.search-text').style.border = '1px solid #ff6700';
        this.$('.search-btn').style.border = '1px solid #ff6700';

    }
    bLFn() {
        this.$('.keyword-list').style.display = 'none';
        this.$('.search-text').style.border = '1px solid #e0e0e0';
        this.$('.search-btn').style.border = '1px solid #e0e0e0';
    }

    //鼠标移入li时添加.active类
    addActive(index) {
        //一进来就取消
        // console.log(index);
        this.lisObj.forEach((v, k) => {
            v.className = null;
        })
        //选中的时候进行添加.actve
        // console.log(this.lisObj[index].className);
        this.lisObj[index].className = 'active'
    }
    //给下拉框绑定一个键盘按下事件
    downFn() {
        // console.log(event.keyCode);
        //判断点击的是38还是40进行上次切换
        if (event.keyCode == 38) {
            // console.log(index);
            if (this.index == -1 || this.index == 0) {
                //直接让她变为最后一个进行加
                this.index = this.lisObj.length - 1;
                console.log(this.index);
            } else {
                this.index--;
                console.log(this.index)
            }
            //调用addActive()方法
            this.addActive(this.index)
        }

        if (event.keyCode == 40) {
            if (this.index >= this.lisObj.length - 1) {
                // console.log(this.index);
                //直接让她等于0
                this.index = 0;
            } else {
                this.index++;
            }
            //调用addActive()方法
            this.addActive(this.index)
        }
    }


    //广告图片切换效果
    qihuan() {
        //每3秒加一次.active
        setInterval(() => {
            this.$('.safe-auth').classList.add('active');
            this.$('.img1').style.opacity = 0;
            this.$('.img2').style.opacity = 1;

        }, 3000);

        //每6秒清除一次.active
        setInterval(() => {
            this.$('.safe-auth').classList.remove('active');
            this.$('.img1').style.opacity = 10;
            this.$('.img2').style.opacity = 0;
        }, 6000);
    }
    //设置移入热门切换图片样式 就添加隐藏
    mFn() {
        console.log(event.target);
        //一进来删除所有的
        // console.log(event.target.parentNode.nextElementSibling.lastElementChild.lastElementChild);
        event.target.parentNode.nextElementSibling.lastElementChild.lastElementChild.classList.add('hide')
        event.target.parentNode.nextElementSibling.lastElementChild.firstElementChild.classList.remove('hide')
    }
    m1Fn() {
        console.log(event.target);
        //一进来删除所有的
        event.target.parentNode.nextElementSibling.lastElementChild.firstElementChild.classList.add('hide')
        event.target.parentNode.nextElementSibling.lastElementChild.lastElementChild.classList.remove('hide')

    }
    lisObjFn() {
        //用于设置切换时的下标
        let that = this;

        for (let i = 0; i < this.lisObj.length; i++) {
            this.lisObj[i].onmouseover = function () {
                this.index = i; //获得索引值 赋值给Index 方便进行函数的添加类
                that.addActive(this.index)
            }
        }
    }
    //设置按钮在400时才显示出来
    blFn() {

        let time = setInterval(() => {
            //获取到scroll事件 大于400菜让按钮显示出来
            if (document.documentElement.scrollTop > 400) {
                this.$('.back').parentNode.style.display = 'block';
            } else {
                this.$('.back').parentNode.style.display = 'none';
            }
        }, 20);
    }
    //设置点击回到顶部
    backFn() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    $(tag) {
        return document.querySelector(tag)
    }
    //运动函数
    move(obj, objAttr, cb) {
        let that = this
        let onff = false;
        this.time = setInterval(function () {
            for (let attr in objAttr) {
                let ns = parseInt(that.setStyle(obj, attr));
                let speed = (objAttr[attr] - ns) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if (objAttr[attr] == ns) {
                    onff = true;
                }
                obj.style[attr] = ns + speed + 'px';
            }
            if (onff) {
                clearInterval(this.time);
                cb && cb();
            }
        }, 20)
    }




    //获取实时位置
    setStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj)[attr]
        }
    }
}
new Index
window.onscroll = function () {
    let top = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(top);
    if (top > 200) {
        document.querySelector('.header-jieshao').classList.add('active1');

    } else {
        document.querySelector('.header-jieshao').classList.remove('active1');
    }
}