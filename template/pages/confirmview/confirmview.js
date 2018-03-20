Page({
    data: {
        title: {content: '标题'},
        msg: {content: '消息内容'},
        buttons: [{ content: '取消'}, {content: '确定'}]
    },
    onLoad: function() {
        var pageParam = this.data.pageParam;
        if (pageParam) {
            var tButtons = pageParam.buttons;
            this.setData({
                title: pageParam.title,
                msg: pageParam.msg,
                buttons: tButtons
            });
        } else {
            console.log('pageParam不存在')
        }
    },
    btnTouched: function(event) {
        var tIndex = event.target.dataset.index;
        var obj = {
            type: 'buttonClick',
            buttonIndex: tIndex,
            status: !!tIndex
        }
        callApi(obj);
    }
})
