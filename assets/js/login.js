$(function () {
    // --------------- 登录注册切换功能 ---------------  
    //             且 切换时清空表单的内容
    $('#goto-register a').on('click', function () {
        $('#register').show().prev().hide()
        $('#login form').get(0).reset() // 切换后重置表单表单
    })
    $('#goto-login a').on('click', function () {
        $('#register').hide().prev().show()
        $('#register form').get(0).reset() // 切换后重置表单表单
    })
    // --------------- 表单验证 ---------------
    var form = layui.form
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // 验证确认密码与输入的密码是否一致
        repassword: function (value) {
            var pw1 = $('.pw1')
            if (value !== pw1.val()) {
                return '两次密码不一致'
            }
        }
    });

    // --------------- 注册功能 ---------------
    // 监听submit事件
    $('#register form').on('submit', function (e) {
        // 阻止浏览器默认行为 (阻止表单自动提交)  
        e.preventDefault()
        // 获取表单输入的内容
        var formData = $(this).serialize()
        // 发送ajax请求获取后台接口数据
        $.post('http://www.liulongbin.top:3007/api/reguser', formData,
            function (res) {
                // 注册成功与否都提示信息
                layer.msg(res.message);
                if (res.status === 0) {
                    // 注册成功, 切到登录区
                    $('#goto-login a').trigger('click')
                }
            })
    })
})