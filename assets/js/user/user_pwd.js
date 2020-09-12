$(function() {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            var oldPwd = $('.layui-form [name=oldPwd]').val()
            if (oldPwd === value) {
                return '新旧密码不能一致'
            }
        },
        rePwd: function(value) {
            var newPwd = $('.layui-form [name=newPwd]').val()
            if (newPwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                top.window.location.href = '/login.html'
            }
        })
    })
})