// 当发送$.ajax 等方法时候之前都会,都会触发这个方法
// option是指ajax所有配置
$.ajaxPrefilter(function(option) {
    // console.log(option);
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    option.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})