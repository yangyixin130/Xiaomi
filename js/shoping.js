class shoping {
    constructor() {
        //设置底部图片的显示与隐藏
        this.qihuan()
        //获取到LocalStorage数据
        this.getStorage()
        //给所有的按钮绑定事件
        this.$('.all').addEventListener('click', this.allFn.bind(this));
        // console.log(document.querySelectorAll('.cbutton'));
        this.allinputs = document.querySelectorAll('.cbutton');
        // console.log(this.allinputs);
        this.danFn();
        this.totalNP();
        // console.log(this.$('.delete'));
        this.$('.list-body').addEventListener('click', this.maopaoFn.bind(this));
        //一进来就判断是否有数据 无进清空这个购物车让没有数据的页面展示出来
        this.pdFn()
    }
    //判断
    pdFn() {
        //获取到页面的LocalStorage
        let date = localStorage.getItem('cart');
        // console.log(Boolean(date));
        date = JSON.parse(date);
        // console.log(JSON.parse(date));
        if (date == null || date.length == 0) {
            this.$('.main-shop').style.display = "block";

        } else {
            this.$('.main-shop').style.display = 'none';
            this.$('.cart-goods-list').style.display = 'block';
        }
    }
    //点击+号添加数量
    addFn() {
        //获取到他的上一个兄弟节点
        // event.target.prevouseSlibing
        // console.log(event.target.previousElementSibling.value++);
        //ID 与数量num
        let goodsid = event.target.parentNode.parentNode.getAttribute('goods-id');
        event.target.previousElementSibling.value++;
        let num = event.target.previousElementSibling.value;
        // console.log(num);
        this.totalNP()
        this.updateFn(goodsid, num)
    }
    //减号
    jianFn() {
        let goodsid = event.target.parentNode.parentNode.getAttribute('goods-id');
        let num = 0;
        if (event.target.nextElementSibling.value > 1) {
            event.target.nextElementSibling.value--;
            num = event.target.nextElementSibling.value--;
            this.totalNP();
            this.updateFn(goodsid, num)
        } else {
            alert('不能为最小值');
            return
        }
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
        //遍历
        date.forEach((v, k) => {
            //判断两个id是否相等
            if (id == v.id) {
                if (num) {
                    v.num = num; // 修改数量
                } else {
                    //否则的话每次删除一次
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
        this.$('.count').innerHTML = c;

    }
    //冒泡来获取点击的内容进行事件的执行
    maopaoFn() {
        // console.log(event.target);
        // console.log(event.target.className == 'delete');
        if (event.target.className == 'delete') {
            this.deleteFn();
        }
        if (event.target.className == 'add') {
            this.addFn()
        }
        if (event.target.className == 'reduce') {
            this.jianFn()
        }
    }
    // //删除按钮 删除数据
    deleteFn() {
        let that = this;
        // console.log(that);
        //同总价时获取祖先 进行删除
        let list = event.target.parentNode.parentNode;
        //判断是否点击了我们的allinputs
        let c = list.querySelector('.cbutton').checked;

        //弹窗是否要删除
        let a = confirm('确定删除？')
        if (a) {
            list.remove();
            //获取到商品的id
            // console.log(list.getAttribute('goods-id'));
            let goodsId = list.getAttribute('goods-id');
            //重新更新总价和数量

            if (c) {
                //重新获取一次input
                this.allinputs = document.querySelectorAll('.cbutton')
                // console.log(this.allinputs);
                that.totalNP(this.allinputs);
                if (this.allinputs.length == 0) {
                    this.$('.totla').innerHTML == 0;
                    //设置cart-goods-list样式为None
                    this.$('.cart-goods-list').style.display = 'none';
                    this.$('.main-shop').style.display = "block";

                }

            }
            //更新数据
            this.updateFn(goodsId)
            // this.totalNP();
        } else {
            return
        }
    }
    //获取总价格和选中数量
    totalNP(allinputs) {
        //设置总价和选中数量以及共多少件
        let that = this;
        let tnum = 0;
        let tprice = 0;
        // if (!allinputs && allinputs.length == 0) {
        //     this.$('.totla').innerHTML = 0;
        // }
        this.allinputs = allinputs || this.allinputs;
        //获取所有allinputs的选中状态 注意为空的时候必须重新获取
        this.allinputs.forEach(v => {
            if (v.checked) {
                //获取到当前的祖先元素 用于获取此时的数量和小计
                let list = v.parentNode.parentNode;
                let price = list.querySelector('.col-price').innerHTML - 0;
                let num = list.querySelector('.count-input').value - 0;
                tnum += num;
                tprice += price * num;
                // console.log(1);
            }
            //获取选择的数量
            that.$('.totla').innerHTML = tnum;
            // console.log(that.$('.totla').innerHTML);
            that.$('em').innerHTML = tprice;
        })
        //获取到此时的数据中的Num 
    }
    //设置全选
    allFn(eve) {
        // console.log(eve.target.checked);
        let checkStaues = eve.target.checked;
        //遍历所有单选
        this.allinputs.forEach(v => {
            v.checked = checkStaues;
        })
        if (checkStaues) {
            this.totalNP();
        } else {
            this.totalNP();
        }
    }
    //设置单选
    danFn() {
        let that = this;
        let num = this.allinputs.length;
        let count = 0;
        this.allinputs.forEach(v => {
            //一进来就判断状态
            v.checked && count++;
            v.onclick = function () {
                // console.log(v.parentNode.parentNode.querySelector('.col-price').innerHTML);
                if (v.checked) {
                    // console.log(1);
                    count++;
                    console.log(count);
                    if (count == num) {
                        that.$('.all').checked = true
                    }
                } else {
                    // console.log(2);
                    count--;
                    that.$('.all').checked = false;
                }
                that.totalNP();
            }
        })
    }
    //获取到后台数据
    //获取页面点击的数据
    getStorage() {
        //获取lcalStorage
        let cart = localStorage.getItem('cart');
        if (!cart) {
            return;
        } else {
            // console.log(cart);

            let htm = '';
            //转换为对象进行遍历
            cart = JSON.parse(cart);
            let c = 0;
            cart.forEach(goods => {
                // console.log(goods);
                // 添加到页面中去
                htm += `<div class='list-item' goods-id=${goods.id}>
                <div class="col col-check">
        <input type="checkbox" class='cbutton' checked></div>
        <div class="col col-img"><img src="${goods.src}"></div>
        <div class="col col-name">${goods.name}</div>
        <div class="col col-price">${goods.price}</div>
        <div class="col col-num">
              <span class="reduce">-</span>
              <input class="count-input" type="text" value="${goods.num}">
              <span class="add">+</span>
            </div>
        <div class="col col-total">${goods.num *goods.price}</div>
        <div class="col col-action">
                <button class='delete'>X</button>
        </div>
        </div>
        
        `;
                //所有商品数量
                // console.log(Number(goods.num));
                c += Number(goods.num);
                this.$('.count').innerHTML = c;
            });
            //获取到tbody进行添加到节点
            this.$('.list-body').innerHTML = htm;

            // location.reload()

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
    $(tag) {
        return document.querySelector(tag)
    }
}
new shoping