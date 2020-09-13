$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败！')
                }
                layer.msg('添加分类成功！')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
    var editAdd = null
    $('body').on('click', '.btn-edit', function() {
        editAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#edit-add').html()
        });


        var cateId = $(this).attr('data-id')
        $.ajax({
            url: `/my/article/cates/${cateId}`,
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('edit-form', res.data)
            }
        })
    })
    $('body').on('submit', '#edit-add2', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('编辑分类成功！')
                layer.close(editAdd)
                initArtCateList()
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
})