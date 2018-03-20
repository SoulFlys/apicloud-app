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
    }
})
