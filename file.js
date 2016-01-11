var fs = require('fs');
var multiparty = require('multiparty');

exports.test = function(req, res) {
  res.render('test', {
    title: '文件上传'
  })
}
exports.fileUpload = function(req, res) {
  var success = function(msg) {
      res.json({
        state: 2,
        name:msg
      });
    }
    //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './uploadDir'
  });
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    console.log(files);
    // console.log(fields.id[0]);
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      success(files);
    }
  });
}
