/*
 * xiaofang JavaScript Library
 * Copyright (c) 2018 www.taokezhushou.com
 */
(function(window){
    var wxui = { uitemplate: null, headerH: 0, footerH: 0 };

    wxui.fixStatusBarAndTabBar = function(h) {
        var header = $api.dom('header');
        wxui.headerH = $api.fixStatusBar(header);
        wxui.footerH = h === undefined ? 49 : h;

        // console.log('wxui.headerH', wxui.headerH)
    };
    wxui.init = function(path, callback) {
        wxui.uitemplate = api.require("UITemplate");
        var _path = path ? path : 'widget://template';
        wxui.uitemplate.init({
            path: _path
        }, function(ret, err) {
            if ('function' === typeof callback) {
                callback(ret);
            }
        });
    };
    wxui.openView = function(param, callback) {
        if ('[object Object]' !== Object.prototype.toString(param)) {
            return;
        }

        if(!wxui.uitemplate){
            // console.log('uitemplate模块没有初始化，重新进行初始化')
            wxui.init('', function() {
                wxui.openView(param, callback);
            });
            return;
        }

        wxui.uitemplate.openView(param, function(ret, err) {
            // if (ret) {
            //     console.log('UITemplate.openView callback=>ret:' + JSON.stringify(ret));
            // } else {
            //     console.log('UITemplate.openView callback=>err:' + JSON.stringify(err));
            // }
            if ('function' == typeof callback) {
                callback(ret, err);
            }
        });
    };
    wxui.list = function(name, param, callback) {
        var _param = {
            name: name,
            url: 'pages/' + name + '/' + name,
            rect: {
                marginTop: wxui.headerH,
                marginBottom: wxui.footerH,
                w: 'auto'
            },
            level: 'normal',
            data: {
                pageParam: param
            }
        }
        // console.log('list _param', JSON.stringify(_param));
        wxui.openView(_param, function(ret, err) {
            if ('function' == typeof callback) {
                callback(ret, err);
            }
        });
    };
    wxui.setData = function(param) {
        if (!param.name) {
            console.log('setData失败，缺少name参数');
            return;
        } else if (!param.data) {
            console.log('setData失败，缺少data参数');
            return;
        }
        wxui.uitemplate.setData(param);
    };
    wxui.alert = function(param, callback) {
        var _param = {
            name: 'alert',
            url: 'pages/alertview/alertview',
            rect: {
                marginTop: 0,
                h: 'auto',
                w: 'auto'
            },
            level: 'alert',
            data: {
                pageParam: param
            }
        }
        wxui.openView(_param, function(ret, err) {
            if (ret && 'buttonClick' == ret.type) {
                wxui.uitemplate.closeView({ name: 'alert' });
                if ('function' == typeof callback) {
                    callback(ret, err);
                }
            }
        });
    };
    wxui.confirm = function(param, callback) {
        var _param = {
            name: 'confirm',
            url: 'pages/confirmview/confirmview',
            rect: {
                marginTop: 0,
                h: 'auto',
                w: 'auto'
            },
            level: 'alert',
            data: {
                pageParam: param
            }
        }
        wxui.openView(_param, function(ret, err) {
            if (ret && 'buttonClick' == ret.type) {
                wxui.uitemplate.closeView({ name: 'alert' });
                if ('function' == typeof callback) {
                    callback(ret, err);
                }
            }
        });
    };
    wxui.sheet = function(param, callback) {
        var _param = {
            name: 'sheet',
            url: 'pages/sheetview/sheetview',
            rect: {
                marginTop: 0,
                h: 'auto',
                w: 'auto'
            },
            level: 'alert',
            data: {
                pageParam: param
            }
        }
        wxui.openView(_param, function(ret, err) {
            if (ret && ret.type) {
                wxui.uitemplate.closeView({ name: 'sheet' });
                if ('function' == typeof callback) {
                    callback(ret, err);
                }
            }
        });
    };
    wxui.inputField = function(callback) {
        var _param = {
            name: 'inputField',
            url: 'pages/inputfield/inputfield',
            rect: {
                marginTop: api.winHeight - 50 - api.safeArea.bottom,
                h: 50,
                w: 'auto'
            },
            level: 'normal'
        }
        wxui.openView(_param, function(ret, err) {
            if ('function' == typeof callback) {
                callback(ret, err);
            }
        });
    }
    wxui.closeView = function(name) {
        wxui.uitemplate.closeView({name: name});
    };

    window.wxui = wxui;
})(window);







// var _Debug = true,
//     _isInit = false;
// function fixStatusBar() {
//     var _eHeader = $api.dom('header');
//     return $api.fixStatusBar(_eHeader);
// }
//
// function WXUI(path) {
//
//     var _UITemplate = api.require("UITemplate");
//
//     function LOG(msg) {
//         if (!api.debug || !_Debug) {
//             return;
//         }
//         console.log(msg);
//     }
//
//
//     function _init(path, callback) {
//         var _path = path ? path : 'widget://template';
//
//         _UITemplate.init({
//             path: _path
//         }, function(ret, err) {
//             _isInit = true;
//             if ('function' === typeof callback) {
//                 callback(ret);
//             }
//         });
//     }
//
//     function _openView(param, callback) {
//         if ('[object Object]' !== Object.prototype.toString(param)) {
//             return;
//         }
//
//         if (!_isInit) {
//             LOG('模块没有初始化，重新进行初始化');
//             _init('', function() {
//                 _openView(param, callback);
//             });
//             return;
//         }
//
//         _UITemplate.openView(param, function(ret, err) {
//             if (ret) {
//                 LOG('UITemplate.openView callback=>ret:' + JSON.stringify(ret));
//             } else {
//                 LOG('UITemplate.openView callback=>err:' + JSON.stringify(err));
//             }
//             if ('function' == typeof callback) {
//                 callback(ret, err);
//             }
//         });
//     }
//
//     function _alert(param, callback) {
//         var _param = {
//             name: 'alert',
//             url: 'pages/alertview/alertview',
//             rect: {
//                 marginTop: 0,
//                 h: 'auto',
//                 w: 'auto'
//             },
//             level: 'alert',
//             data: {
//                 pageParam: param
//             }
//         }
//         _openView(_param, function(ret, err) {
//             if (ret && 'buttonClick' == ret.type) {
//                 _UITemplate.closeView({
//                     name: 'alert'
//                 });
//                 if ('function' == typeof callback) {
//                     callback(ret, err);
//                 }
//             }
//         });
//     }
//
//     function _confirm(param, callback) {
//         var _param = {
//             name: 'confirm',
//             url: 'pages/confirmview/confirmview',
//             rect: {
//                 marginTop: 0,
//                 h: 'auto',
//                 w: 'auto'
//             },
//             level: 'alert',
//             data: {
//                 pageParam: param
//             }
//         }
//         _openView(_param, function(ret, err) {
//             if (ret && 'buttonClick' == ret.type) {
//                 _UITemplate.closeView({
//                     name: 'confirm'
//                 });
//                 if ('function' == typeof callback) {
//                     callback(ret, err);
//                 }
//             }
//         });
//     }
//
//     function _sheet(param, callback) {
//         var _param = {
//             name: 'sheet',
//             url: 'pages/sheetview/sheetview',
//             rect: {
//                 marginTop: 0,
//                 h: 'auto',
//                 w: 'auto'
//             },
//             level: 'alert',
//             data: {
//                 pageParam: param
//             }
//         }
//         _openView(_param, function(ret, err) {
//             if (ret && ret.type) {
//                 _UITemplate.closeView({
//                     name: 'sheet'
//                 });
//                 if ('function' == typeof callback) {
//                     callback(ret, err);
//                 }
//             }
//         });
//     }
//
//     function _inputField(callback) {
//         var _param = {
//             name: 'inputField',
//             url: 'pages/inputfield/inputfield',
//             rect: {
//                 marginTop: api.winHeight - 50 - api.safeArea.bottom,
//                 h: 50,
//                 w: 'auto'
//             },
//             level: 'normal'
//         }
//         _openView(_param, function(ret, err) {
//             if ('function' == typeof callback) {
//                 callback(ret, err);
//             }
//         });
//     }
//
//     function _list(name, param, callback) {
//         var _param = {
//             name: name,
//             url: 'pages/' + name + '/' + name,
//             rect: {
//                 marginTop: 68,
//                 marginBottom: 49,
//                 w: 'auto'
//             },
//             level: 'normal',
//             data: {
//                 pageParam: param
//             }
//         }
//
//         _openView(_param, function(ret, err) {
//             if ('function' == typeof callback) {
//                 callback(ret, err);
//             }
//         });
//     }
//
//     function _setData(param) {
//         if (!param.name) {
//             LOG('setData失败，缺少name参数');
//             return;
//         } else if (!param.data) {
//             LOG('setData失败，缺少data参数');
//             return;
//         }
//         _UITemplate.setData(param)
//     }
//
//     function _switchView(param, rect, callback) {
//         var _param = {
//             name: 'cell-switch',
//             url: 'pages/cell-switch/cell-switch',
//             rect: rect,
//             data: {
//                 pageParam: param
//             }
//         }
//
//         _openView(_param, function(ret, err) {
//             if ('function' == typeof callback) {
//                 callback(ret, err);
//             }
//         });
//     }
//
//     function _myinfo(param, callback) {
//         var _param = {
//             name: 'myinfo',
//             url: 'pages/myinfo/myinfo',
//             rect: {
//                 marginTop: 150,
//                 marginBottom: 49,
//                 w: 'auto'
//             },
//             data: {
//                 pageParam: param
//             }
//         }
//
//         _openView(_param, function(ret, err) {
//             if ('function' == typeof callback) {
//                 callback(ret, err);
//             }
//         });
//     }
//
//
//
//
//     _WXUI = {
//         init: _init,
//         openView: _openView,
//         alert: _alert,
//         confirm: _confirm,
//         sheet: _sheet,
//         inputField: _inputField,
//         list: _list,
//         setData: _setData,
//         switchView: _switchView,
//         myinfo: _myinfo
//     }
//
//     return _WXUI;
// }
