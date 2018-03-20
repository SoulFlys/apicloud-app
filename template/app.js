App({
    onLaunch: function(options) {
        console.log('onLaunch', JSON.stringify(options));
    },
    onShow: function(options) {
        console.log('onShow', JSON.stringify(options));
    },
    onHide: function() {
        console.log('onHide');
    },
    onError: function(msg) {
        console.log('onError', JSON.stringify(msg));
    },
    globalData: 'I am global data'
})
