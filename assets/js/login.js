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
})