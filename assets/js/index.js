$(function () {
    // --------------- 获取用户信息，并渲染到页面中 ---------------
    // 调用函数
    getUserInfo()

})

// 封装一个函数, 完成获取用户信息, 并渲染到页面中的功能
// 函数要放到入口函数的外面, 以便别的页面调用(复用)
function getUserInfo() {
    $.ajax({
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        // 带my的路径都需要设置请求头, 参数写保存到本地的 token
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            if (res.status === 0) {
                // 设置欢迎语 (如果有昵称就用昵称,没有就用用户名)
                var name = res.data.nickname || res.data.username
                $('.welcome').html('欢迎您,&nbsp;&nbsp;' + name)
                // 设置头像 (如果有图片就用图片,没有就用默认的首字节加绿底)
                if (res.data.user_pic) {
                    $('.layui-nav-img').prop('src', res.data.user_pic).show()
                    $('.text-img').hide()
                } else {
                    $('.text-img').css('display', 'inline-block').text(name.slice(0, 1).toUpperCase())
                    $('.layui-nav-img').hide()
                }
            }
        }
    })
}