class Rest {
    constructor() {
        //显示下拉框
        this.$('.dropdown-toggle').addEventListener('mouseenter', this.IFn.bind(this))
        this.$('.dropdown-menu').addEventListener('mouseleave', this.LFn.bind(this));
        //点击箭头显示改变颜色以及border
        this.count = 0;
        this.$('.jiantou').addEventListener('click', this.jianFn.bind(this));
        //鼠标移入li时设置样式
        this.lisObj = document.querySelectorAll('.select li');
        this.lisObj.forEach(v => {
            v.addEventListener('mouseenter', this.lisFn.bind(this))
        })
        this.lisObj.forEach(v => {
            v.addEventListener('click', this.licFn.bind(this));
        })
        //邮箱移入时邮箱上移
        this.$('.e').addEventListener('focus', this.emFn.bind(this));
        //失去焦点时
        this.$('.e').addEventListener('blur', this.esFn.bind(this));
        //电话号码失去焦点和获取焦点
        this.$('.tel-right input').addEventListener('focus', this.zuFn.bind(this))
        this.$('.tel-right input').addEventListener('blur', this.sqFn.bind(this))
        this.$('.Login').addEventListener('click', this.ajaxFn.bind(this));
    }

    ajaxFn() {
        //判断是谁显示
        // console.log(this.$('.tel').style.display);
        // console.log(this.setStyle(this.$('.tel'), 'display') == 'block');
        if (this.setStyle(this.$('.tel'), 'display') == 'block') {
            //获取他的电话号码值
            let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

            if (this.$('.tel-right input').value == '' || !reg.test(this.$('.tel-right input').value)) {
                return
            } else {
                //向rest.php传递ajax值
                axios.post('../php/reset.php', {
                    'tel': this.$('.tel-right input').value
                }).then(date => {
                    let reg = /1/;
                    if (reg.test(date)) {
                        // console.log(date = date.substring(1));
                        date = date.substring(1)
                        location.href = '../views/uPassword.html';
                        //并且设置一个名为passwrod的localStorage
                        localStorage.setItem('password', JSON.stringify({
                            "password": date
                        }))
                        localStorage.setItem('tel', JSON.stringify({
                            "tel": this.$('.tel-right input').value
                        }))
                    } else {
                        alert('此账户不存在,请注册')
                    }
                })
            }
        } else {
            // console.log(this.$('.email .e').value);
            let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (this.$('.email .e').value == '' || !reg.test(this.$('.email .e').value)) {
                return
            } else {
                //向rest.php传递ajax值
                axios.post('../php/email.php', {
                    'email': this.$('.email .e').value
                }).then(date => {
                    let reg = /1/;
                    console.log(reg.test(date));
                    if (date == 1) {
                        let reg = /1/;
                        if (reg.test(date)) {
                            // console.log(date = date.substring(1));
                            date = date.substring(1)
                            location.href = '../views/uPassword.html';
                            //并且设置一个名为passwrod的localStorage
                            localStorage.setItem('email', JSON.stringify({
                                "email": this.$('.email .e').value
                            }))
                        } else {
                            alert('此账户不存在,请注册')
                        }
                    } else {
                        alert('此账户不存在,请注册')
                    }
                })
            }
        }
    }
    //电话号码的焦点
    zuFn() {
        this.$('.tel-right label').style.top = '8px';
        this.$('.tel-right label').style.fontSize = '12px'

    }
    //电话号码的焦点
    sqFn() {
        this.$('.tel-right label').style.top = '24px';
        this.$('.tel-right label').style.fontSize = '14px'
        if (this.$('.tel-right input').value == '') {
            this.$('.error').style.display = 'block';
            this.$('.error1').style.display = 'none';
        } else {
            this.$('.error').style.display = 'none';
            //进行正则判断
            let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if (!reg.test(this.$('.tel-right input').value)) {
                this.$('.error1').style.display = 'block';
                this.$('.tel-right label').style.top = '8px';
                this.$('.tel-right label').style.fontSize = '12px'
                this.$('.Login').style.opacity = '0.5';
            } else {
                this.$('.error1').style.display = 'none';
                this.$('.tel-right label').style.top = '8px';
                this.$('.tel-right label').style.fontSize = '12px'
                this.$('.Login').style.opacity = '1';
            }
        }
    }
    //失去焦点
    esFn() {
        this.$('.p').style.fontSize = '14px';
        this.$('.p').style.top = '19px';
        //获取对应的值
        // console.log(this.$('.e').value);
        if (this.$('.e').value == '') {
            this.$('.errorP').style.display = 'block';
            this.$('.e').style.opacity = '0.5'
            this.$('.erroL').style.display = 'none';
        } else {
            this.$('.errorP').style.display = 'none';
            this.$('.p').style.fontSize = '12px';
            this.$('.p').style.top = '6px';
            //判断邮箱格式是否正确
            let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            // console.log(reg.test(this.$('.e').value));
            if (!reg.test(this.$('.e').value)) {
                this.$('.erroL').style.display = 'block';
            } else {
                this.$('.erroL').style.display = 'none';
            }
        }
    }
    //获取焦点时
    emFn() {
        this.$('.p').style.fontSize = '12px';
        this.$('.p').style.top = '6px';
    }
    //点击li
    licFn() {
        this.$('.select').style.display = 'none';
        this.$('.user').style.borderColor = '#F9F9F9'
        this.jianFn();
        //改变.use的值
        this.$('.use').innerHTML = event.target.innerHTML;
        this.$('.jiantou').innerHTML = '&#xe62d;'
        //判断点击了哪个li
        // console.log(/[Tel]$/.test(event.target.className), event.target.className);
        // console.log(event.target.className.search('Tel'));
        if (/[Tel]$/.test(event.target.className), event.target.className) {
            this.$('.tel').style.display = 'block';
            this.$('.email').style.display = 'none';
        }


        if (event.target.className == 'user1 Emali') {
            this.$('.email').style.display = 'block';
            this.$('.tel').style.display = 'none';
        }

    }
    //移入li
    lisFn() {
        //一进来直接清除
        this.lisObj.forEach(v => {
            v.className = '';
        })
        event.target.className = 'active';

    }
    jianFn() {
        //用于计数 来切换箭头上下
        this.count++;
        //改变箭头样式'
        // console.log(this.count);
        if (this.count % 2 == 0 && this.count != 0) {
            this.$('.jiantou').innerHTML = '&#xe62d;'
            this.$('.user').style.borderColor = '#F9F9F9'
            this.$('.select').style.display = 'none';
        } else {
            this.$('.jiantou').innerHTML = '&#xe62c;'
            this.$('.user').style.borderColor = 'orange'
            this.$('.select').style.display = 'block';
        }



    }
    //显示下拉框
    IFn() {
        this.$('.dropdown-menu').style.display = 'block';
    }
    LFn() {
        this.$('.dropdown-menu').style.display = 'none';
    }
    $(tag) {
        return document.querySelector(tag);
    }
    setStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj)[attr]
        }
    }
}

new Rest