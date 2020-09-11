// 当发送$.ajax 等方法时候之前都会,都会触发这个方法
// option是指ajax所有配置
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    option.url = 'http://ajax.frontend.itheima.net' + option.url
})