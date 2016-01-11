### 大文件，多文件上传
测试15G文件可以上传

重头戏在test.jade里面，引入js文件
var Uploader = Q.Uploader;
var uploader = new Uploader({
    url: "../admin/uploadVideo",//后台请求地址
    target: document.getElementById("upload-target"),
    view: document.getElementById("upload-view"),
    //allows: ".txt,.jpg,.png,.gif,.zip,.rar,.7z",//文件上传类型
    //每次上传都会发送的参数(POST方式)
    data: { user: "Devin" },
    on: {
        add: function (task) {
            if (task.disabled) return alert("允许上传的文件格式为：" + this.ops.allows);
            log(task.name + ": 已添加!");
        },
        remove: function (task) {
            log(task.name + ": 已移除!");
        },
        //上传之前触发
        upload: function (task) {
            //exe文件可以添加，但不会上传
            if (task.ext == ".exe") return false;
            //可针对单独的任务配置参数(POST方式)
            task.data = { name: task.name + "_" + Date.now() };
        },
        //上传完成后触发
        complete: function (task) {
            if (task.state != Uploader.COMPLETE) return log(task.name + ": " + Uploader.getStatusText(task.state) + "!");
            var json = task.json;
            if (!json) return log(task.name + ": 服务器未返回正确的数据");
            log("服务器返回:  " + (task.response || ""));
            log();
        }
    }
});






