$(function() {
    // 切换登录与注册页面
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        // 自定义表单验证规则
        // 获取form表单模块
    var form = layui.form
    var layer = layui.layer
        // 定义验证规则
    form.verify({
            password: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repassword: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        // 注册功能
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                layer.msg('注册成功，请登录！')
                $('#link_login').click()
            })
        })
        // 登录功能
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 把token保存到本地
                localStorage.setItem('token', res.token)
                    // 跳转页面
                location.href = '/index.html'
            }
        })
    })
})