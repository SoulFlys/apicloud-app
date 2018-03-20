Page({
    data: {
        dataSource: []
    },
    onLoad: function(options) {
        var pageParam = this.data.pageParam;
        if (pageParam) {
            this.setData({
                dataSource: pageParam.dataSource
            });
        } else {
            console.log('pageParam不存在')
        }
    },
    itemTouched: function(event) {
        var name = event.target.dataset['tapName'];
        var obj = {
            type: 'cellClick',
            name: name
        };
        callApi(obj);
    },
    changeTui: function(event) {
        var tStatus = event.detail.value;
        var tKey = event.target.dataset.key;
        var obj = {
            type: 'switchChange',
            key: tKey,
            status: tStatus
        }
        callApi(obj);
    }
})
