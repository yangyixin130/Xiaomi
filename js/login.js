class Login {
    constructor() {
        //显示下拉框
        this.$('.dropdown-toggle').addEventListener('mouseenter', this.IFn.bind(this))
        this.$('.dropdown-menu').addEventListener('mouseleave', this.LFn.bind(this));
        //分别给中文和英文绑定事件
        //设置判断用于点击二维码图标时 进行中英文切换
        this.Stauess = false;
        //设置一个点击二维码的判断开关 
        this.erweima = false;
        this.$('.a1').addEventListener('click', this.CFn.bind(this));
        this.$('.a2').addEventListener('click', this.EFn.bind(this));
        //获取到页面中所有的内容并且转化成对应的英文
        this.as = document.querySelectorAll('.header-top-right .item');

        //显示扫码登录
        this.$('.login-img').addEventListener('mouseenter', this.tipFn.bind(this));
        this.$('.login-img').addEventListener('mouseleave', this.tpFn.bind(this));
        //设置onblur时进行lable内容的上移
        this.$('.user').addEventListener('focus', this.userFn.bind(this))
        this.$('.pwd').addEventListener('focus', this.pwdFn.bind(this))

        //失去焦点时回到原位置
        this.$('.user').addEventListener('blur', this.user1Fn.bind(this))
        this.$('.pwd').addEventListener('blur', this.pwdF1n.bind(this))
        //点击眼睛进行切换type password=>text
        this.$('.eye').addEventListener('click', this.typeFn.bind(this));
        //点击注册切换到注册页面
        this.$('.zhuce').addEventListener('click', this.zhuceFn.bind(this))
        this.$('.l').addEventListener('click', this.lFn.bind(this));
        //点击二维码显示二维码页面
        this.$('.login-img').addEventListener('click', this.erFn.bind(this, true));

        //获取注册页面的input 手机号
        this.$('.tel-right input').addEventListener('focus', this.zuFn.bind(this))
        this.$('.tel-right input').addEventListener('blur', this.sqFn.bind(this))

        this.$('.ma-left input').addEventListener('focus', this.zu1Fn.bind(this))
        this.$('.ma-left input').addEventListener('blur', this.sq1Fn.bind(this))
        //点击失效进行刷新
        this.$('.erweima button').addEventListener('click', this.shiFn.bind(this))
    }
    //显示下拉框
    IFn() {
        this.$('.dropdown-menu').style.display = 'block';
    }
    LFn() {
        this.$('.dropdown-menu').style.display = 'none';
    }
    //中英文切换
    EFn() {
        this.Stauess = true;
        this.$('.header-top-left').innerHTML = `<div class="img">
        <a href="">
            <img src="https://s02.mifile.cn/assets/static/image/logo-mi2.png" alt="">
        </a>
    </div>Mi Account`;
        this.as[0].innerHTML = 'User Agreement ';
        this.as[1].innerHTML = 'Privacy Policy ';
        this.as[2].innerHTML = 'Need help?';
        this.$('.l').innerHTML = 'Sigin in'
        this.$('.zhuce').innerHTML = 'Sign up '
        this.$('.tag').innerHTML = '‎English';
        this.$('.header-top-right').style.width = '405px';
        this.$('.login-content-top').style.width = '170px';
        this.$('.use').innerHTML = 'Email/Phone/Mi Account'
        this.$('.p').innerHTML = 'Password';
        this.$('.Login').innerHTML = 'Sign in'
        this.$('.bottom-left a').innerHTML = 'Forgot password?';
        this.$('.bottom-right a').innerHTML = 'Sign in using phone number';
        this.$('.other .title').innerHTML = 'More options';
        this.$('.footer').innerHTML = `
       Xiaomi Inc., All rights reserved - Beijing ICP - 10046444 - <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134" target="_blank" rel="noopener noreferrer">Beijing Public Security ICP-11010802020134</a> - Beijing ICP licence No. - 110507
        `
        this.$('.diqu').innerHTML = 'Region';
        this.$('.slect-info').innerHTML = 'China';
        this.$('.tel-left label').innerHTML = 'Country code';
        this.$('.tel-right label').innerHTML = 'Phone number';
        this.$('.ma-left label').innerHTML = 'Verification code';
        this.$('.ma-right input').value = 'Get verification code';
        this.$('.Tip a').innerHTML = "Can't receive verification code?";
        this.$('.check span').innerHTML = `I've read and agreed to Xiaomi's <a href="#node">User Agreement</a>and<a href="#node">Privacy Policy</a>`
        this.$('.check span').style.width = '600px';
        this.$('.input2 .title').innerHTML = 'Scan QR code to sign in';
        this.$('.tops').innerHTML = `
        Go to Settings > Mi Account on your Mi Phone and tap the Scanner icon to sign in using a QR code
                                <i class="iconfont tishi">&#xe7ec;</i>`;
        this.$('.tips').innerHTML = 'can QR codes';
        this.$('.tips').style.width = '115px'

    }
    CFn() {
        this.Stauess = false;
        this.$('.header-top-left').innerHTML = `<div class="img">
        <a href="">
            <img src="https://s02.mifile.cn/assets/static/image/logo-mi2.png" alt="">
        </a>
    </div>小米账号`;

        this.as[0].innerHTML = '用户协议';
        this.as[1].innerHTML = '隐私政策';
        this.as[2].innerHTML = '帮助中心';
        this.$('.tag').innerHTML = `
                            <div class="tag dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">‎中文(简体)‎
                            </div>
                            <div class="dropdown-menu">
                                <a class="dropdown-item a1" href="#">中文繁体</a>
                                <a class="dropdown-item a2" href="#">English</a>
                            </div>
                        `
        this.$('.l').innerHTML = '登录'
        this.$('.zhuce').innerHTML = '注册'
        this.$('.use').innerHTML = '邮箱/手机号码/小米ID'
        this.$('.p').innerHTML = '密码';
        this.$('.Login').innerHTML = '登录'
        this.$('.login-content-top').style.width = '128px'
        this.$('.bottom-left a').innerHTML = '忘记密码';
        this.$('.bottom-right a').innerHTML = '手机号登录';
        this.$('.other .title').innerHTML = '其他方式登录';
        this.$('.footer').innerHTML = `小米公司版权所有-京ICP备10046444-<a
                        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134" target="_blank"
                        rel="noopener noreferrer">京公网安备11010802020134号</a>-京ICP证110507号`
        this.$('.diqu').innerHTML = '国家/地区';
        this.$('.slect-info').innerHTML = '中国';
        this.$('.tel-left label').innerHTML = '国家码';
        this.$('.tel-right label').innerHTML = '手机号';
        this.$('.ma-left label').innerHTML = '短信验证码';
        this.$('.ma-right input').value = '获取验证码';
        this.$('.Tip a').innerHTML = "收不到短信？";
        this.$('.check span').innerHTML = `已阅读并同意小米账号 <a href="#node">用户协议</a>和<a href="#node">隐私政策</a>`
        this.$('.check span').style.width = '400px';
        this.$('.input2 .title').innerHTML = '扫码登录 安全快捷';
        this.$('.input2 .tops').innerHTML = `
        请使用小米手机/米家等小米旗下APP扫码登录
                                <i class="iconfont tishi">&#xe7ec;</i>`;
        this.$('.tips').innerHTML = '扫码登录'

    }
    //失效时进行点击刷新
    shiFn() {
        this.$('.erweima div').style.visibility = 'hidden';
        this.$('.erweima button').style.visibility = 'hidden';

    }
    //显示扫码登录
    tipFn(index) {
        this.$('.tips').style.display = 'block';

    }
    tpFn() {
        this.$('.tips').style.display = 'none';
    }
    //lable上移 获取焦点时
    userFn() {
        this.$('.use').style.top = '6px';
        this.$('.use').style.fontSize = '12px';
    }
    pwdFn() {
        this.$('.p').style.top = '6px';
        this.$('.p').style.fontSize = '12px';
    }
    //失去焦点
    user1Fn() {
        //获取到输入框的值
        // console.log(this.$('.user').value == '');
        if (this.$('.user').value == '') {
            //创建一个div节点用于显示用户名为空
            this.$('.errorU').style.display = 'block';
            this.$('.use').style.top = '19px';
            this.$('.use').style.fontSize = '16px';
            this.$('.erroL').style.display = 'none';
        } else {
            this.$('.errorU').style.display = 'none';
            this.$('.use').style.top = '6px';
            this.$('.use').style.fontSize = '12px';
            //判断邮箱格式是否正确
            let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            let reg1 = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            let reg2 = /^[a-zA-Z]/;

            // console.log(reg.test(this.$('.e').value));
            if (reg.test(this.$('.user').value) || reg1.test(this.$('.user').value) || reg2.test(this.$('.user').value)) {
                this.$('.erroL').style.display = 'none';
            } else {
                this.$('.erroL').style.display = 'block';
            }
            // if (!reg.test(this.$('.user').value)) {
            //     this.$('.erroL').style.display = 'block';
            // } else {
            //     this.$('.erroL').style.display = 'none';
            // }
        }

    }
    pwdF1n() {
        if (this.$('.pwd').value == '') {
            this.$('.errorP').style.display = 'block';
            this.$('.p').style.top = '19px';
            this.$('.p').style.fontSize = '16px';
            this.$('.Login').style.opacity = '0.5'
        } else {
            this.$('.errorP').style.display = 'none';
            this.$('.p').style.top = '6px';
            this.$('.p').style.fontSize = '12px';
            if (this.$('.user').value == '') {
                this.$('.Login').style.opacity = '0.5'
            } else {
                this.$('.Login').style.opacity = '1'
            }
        }


    }
    //查看密码
    typeFn() {
        //获取到a
        //设置一个开关判断是否时设置了text
        let onff = false;
        // console.log(this.$('.pwd').getAttribute('type') == 'text');
        if (this.$('.pwd').getAttribute('type') == 'text') {
            onff = true;
        } else {
            onff = false;
        }
        if (onff) {
            this.$('.pwd').setAttribute('type', 'password');
            this.$('.eye').innerHTML = '&#xe901;'
        } else {
            this.$('.pwd').setAttribute('type', 'text');
            this.$('.eye').innerHTML = '&#xeb46;'
        }
    }
    lFn() {
        this.$('.input').style.visibility = 'visible';
        this.$('.input1').style.visibility = ' hidden'
        this.$('.l').style.fontWeight = 'bold'
        this.$('.l').style.color = '#333'
        this.$('.zhuce').style.fontWeight = 'none'
        this.$('.zhuce').style.color = '#bbb'
        this.$('.other').style.marginTop = '0';
    }
    //设置定时器的方法
    setTime(index) {
        let time = setInterval(() => {
            this.$('.erweima div').style.visibility = 'visible';
            this.$('.erweima button').style.visibility = 'visible';
        }, 2000);

        //第25秒进行清除定时器
        let time1 = setTimeout(() => {
            console.log(1);
            clearInterval(time)
        }, 2500);
        if (!index) {
            clearInterval(time);
            clearTimeout(time1);
            this.$('.erweima div').style.visibility = 'hidden';
            this.$('.erweima button').style.visibility = 'hidden';
            console.log(2);

        }


    }
    //切换到二维码页面
    erFn() {
        let time = '';
        if (this.$('.login-img')) {
            // console.log(this.erweima);
            //设置判断开关为true
            this.erweima = true;
            this.$('.login-content-top').style.visibility = 'hidden';
            this.$('.input1').style.visibility = 'hidden';
            this.$('.input').style.visibility = 'hidden';
            this.$('.input2').style.visibility = ' visible';
            this.$('.login-img i').innerHTML = '&#xe656;';
            if (this.Stauess) {
                this.$('.tips').innerHTML = 'Sign for usesing password';
            } else {
                this.$('.tips').innerHTML = '密码登录'
            }
            this.$('.login-img').className = 'login-img-1';

            //还是通过判断进行失效的显示和清除
            this.setTime(this.erweima)

        } else {
            // console.log(this.erweima, time);
            this.erweima = false;
            this.$('.login-content-top').style.visibility = 'visible';
            this.$('.input1').style.visibility = 'hidden';
            this.$('.input').style.visibility = 'visible';
            this.$('.input2').style.visibility = ' hidden';
            this.$('.login-img-1 i').innerHTML = '&#xe65f';
            // console.log(this.Stauess);
            //通过开关状态用于设置鼠标移入的中英文切换
            if (this.Stauess) {
                this.$('.tips').innerHTML = 'can QR codes';
            } else {
                this.$('.tips').innerHTML = '扫码登录';
            }
            this.setTime(this.erweima);
            this.$('.login-img-1').className = 'login-img';
            this.$('.erweima div').style.visibility = 'hidden';
            this.$('.erweima button').style.visibility = 'hidden';
        }

    }
    //切换的注册页面
    zhuceFn() {
        this.$('.input').style.visibility = 'hidden';
        this.$('.input1').style.visibility = ' visible'
        this.$('.input2').style.visibility = ' hidden';
        this.$('.l').style.fontWeight = 'none'
        this.$('.zhuce').style.fontWeight = 'bold'
        this.$('.l').style.color = '#bbb'
        this.$('.zhuce').style.color = '#333'
        this.$('.other').style.marginTop = '40px';
        this.$('.login-content-top').style.visibility = 'visible';
    }
    //设置注册页面的label上下移动
    zuFn() {
        this.$('.tel-right label').style.top = '8px';
        this.$('.tel-right label').style.fontSize = '12px'

    }
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
            } else {
                this.$('.error1').style.display = 'none';
                this.$('.tel-right label').style.top = '8px';
                this.$('.tel-right label').style.fontSize = '12px'
            }
        }
    }
    zu1Fn() {
        this.$('.ma-left label').style.top = '8px';
        this.$('.ma-left label').style.fontSize = '12px'
    }
    sq1Fn() {
        this.$('.ma-left label').style.top = '24px';
        this.$('.ma-left label').style.fontSize = '14px'
    }
    //t
    $(tag) {
        return document.querySelector(tag)
    }
}
new Login