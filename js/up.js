class Up {
    constructor() {
        //点击眼睛进行切换type password=>text
        this.$('.eye').addEventListener('click', this.typeFn.bind(this, this.$('.pwd'), this.$('.eye')));
        //初始密码获取焦点
        this.$('.pwd').addEventListener('focus', this.pwdFn.bind(this, this.$('.p')));
        //失去焦点
        this.$('.pwd').addEventListener('blur', this.pwdF1n.bind(this, this.$('.pwd'), this.$('.errorP'), this.$('.p'), this.$('.erroL')));

        //新密码
        this.$('.neye').addEventListener('click', this.typeFn.bind(this, this.$('.npwd'), this.$('.neye')));
        //初始密码获取焦点
        this.$('.npwd').addEventListener('focus', this.pwdFn.bind(this, this.$('.np')));
        //失去焦点
        this.$('.npwd').addEventListener('blur', this.pwdF1n.bind(this, this.$('.npwd'), this.$('.nerrorP'), this.$('.np'), this.$('.nerroL'), this.$('.nerroQ')));

        //确认密码
        this.$('.seye').addEventListener('click', this.typeFn.bind(this, this.$('.spwd'), this.$('.seye')));
        //初始密码获取焦点
        this.$('.spwd').addEventListener('focus', this.pwdFn.bind(this, this.$('.sp')));
        //失去焦点
        this.$('.spwd').addEventListener('blur', this.pwdF1n.bind(this, this.$('.spwd'), this.$('.serrorP'), this.$('.sp'), this.$('.serroL')));
        //修改按钮
        this.$('.Login').addEventListener('click', this.Lfn.bind(this));
    }
    //点击修改按钮
    Lfn() {
        //获取到所有的值
        if (this.$('.pwd') !== '' && this.$('.npwd') !== '' && this.$('.spwd') !== '') {
            //获取Local数据
            let date = localStorage.getItem('tel');
            let date1 = localStorage.getItem('email');
            if (date) {
                date = JSON.parse(date);
                let tel = date.tel;
                //更新数据库中的密码值
                axios.post('../php/update.php', {
                    'tel': tel,
                    'password': this.$('.spwd').value
                }).then(v => {
                    if (v == 1) {
                        location.href = '../views/login.html'
                        localStorage.removeItem('tel');
                        localStorage.removeItem('password');
                    }
                })
            }
            if (date1) {
                date1 = JSON.parse(date1);
                let email = date.email;
                //更新数据库中的密码值
                axios.post('../php/update.php1', {
                    'email': email,
                    'password': this.$('.spwd').value
                }).then(v => {
                    if (v == 1) {
                        location.href = '../views/login.html'
                        //此时并且清空localSTor
                        localStorage.removeItem('email')
                        localStorage.removeItem('password')
                    }
                })
            }

        } else {
            return;
        }
    }
    //让内容上移
    pwdFn(tag) {
        // 获取焦点时
        // console.log(tag);
        tag.style.top = '6px';
        tag.style.fontSize = '12px';
    }
    //内容下移 失去焦点时
    pwdF1n(tag, err, p, errl, errq) {
        //newP ,sureP用于保存两个密码的值
        let newP = '';
        let sureP = '';
        //设置一个状态来判断两个是否都有内容
        let date = false;
        // console.log(err);
        if (tag.value == '') {
            err.style.display = 'block';
            p.style.top = '19px';
            p.style.fontSize = '16px';
            errl.style.display = 'none'

            if (errq == this.$('.nerroQ')) {
                errq.style.display = 'none'
            }
            //当元素获得或失去焦点时发生的事件属于 FocusEvent 对象。
            // console.log(errq != FocusEvent);
        } else {
            err.style.display = 'none';
            p.style.top = '6px';
            p.style.fontSize = '12px';
            //判断密码格式以及密码是否一致嘞
            let reg = /(?=.*?[a-z])(?=.*?[0-9]).{7,}$/;
            //判断是不是确认旧密码是否正确
            if (tag == (this.$('.pwd'))) {
                //获取登录是的localhistorage
                let password = JSON.parse(localStorage.getItem('password'));
                // console.log(password.password);
                let pwd = password.password;
                if (reg.test(tag.value) && (tag.value == pwd)) {
                    // tag.style.backgroun = 'green'
                    errl.style.display = 'none'
                } else {
                    errl.style.display = 'block';
                }
            }
            //新密码
            if (tag == (this.$('.npwd'))) {
                // console.log(1);
                //获取登录是的localhistorage
                let password = JSON.parse(localStorage.getItem('password'));
                // console.log(password.password);
                let pwd = password.password;
                // console.log(pwd);
                //判断是否格式正确 并且获取这个值 用于比较
                if (reg.test(tag.value)) {
                    // tag.style.backgroun = 'green'
                    errl.style.display = 'none';
                    errq.style.display = 'none'
                    // console.log(1);
                    // console.log(tag.value);
                    newP = tag.value
                } else {
                    errl.style.display = 'block';
                    errq.style.display = 'none';
                }
                if (tag.value == pwd) {
                    errq.style.display = 'block'
                    // console.log(2);
                }
            }

            if (tag == (this.$('.spwd'))) {
                if (reg.test(tag.value)) {
                    // tag.style.backgroun = 'green'
                    errl.style.display = 'none'
                    sureP = tag.value
                } else {
                    errl.style.display = 'block'
                }
            }

            //判断两个值是否相同必须是都存在

            if (newP) {
                if (sureP) {
                    console.log(1);
                }
            } else {
                console.log(2);
            }


        }


    }
    //查看密码
    typeFn(tag, eye) {
        // console.log(tag, eye);
        //获取到a
        //设置一个开关判断是否时设置了text
        let onff = false;
        // console.log(this.$('.pwd').getAttribute('type') == 'text');
        if (tag.getAttribute('type') == 'text') {
            onff = true;
        } else {
            onff = false;
        }
        if (onff) {
            tag.setAttribute('type', 'password');
            eye.innerHTML = '&#xe901;'
        } else {
            tag.setAttribute('type', 'text');
            eye.innerHTML = '&#xeb46;'
        }
    }
    $(tag) {
        return document.querySelector(tag);
    }
}
new Up;


// //让内容上移
// pwdFn(this,tag) {
//     tag.style.top = '6px';
//     tag.style.fontSize = '12px';
// }
// //内容下移
// pwdF1n(this,pwd, tag, tag) {
//     if (pwd.value == '') {
//         errop.style.display = 'block';
//         tag.style.top = '19px';
//         tag.style.fontSize = '16px';
//     } else {
//         tag.style.display = 'none';
//         tag.style.top = '6px';
//         tag.style.fontSize = '12px';
//     }
// }
// //查看密码
// typeFn(this,pwd, eye) {
//     //获取到a
//     //设置一个开关判断是否时设置了text
//     let onff = false;
//     // console.log(this.$('.pwd').getAttribute('type') == 'text');
//     if (pwd.getAttribute('type') == 'text') {
//         onff = true;
//     } else {
//         onff = false;
//     }
//     if (onff) {
//         pwd.setAttribute('type', 'password');
//         eye.innerHTML = '&#xe901;'
//     } else {
//         pwd.setAttribute('type', 'text');
//         eye.innerHTML = '&#xeb46;'
//     }
// }