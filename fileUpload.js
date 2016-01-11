var fs = require('fs');
var multiparty = require('multiparty');

module.exports = {
  uploadServer: function(req, res, next, success) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({
      uploadDir: './uploadDir'
    });
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
      console.log(fields);
      console.log(files);
      // console.log(fields.id[0]);
      var filesTmp = JSON.stringify(files, null, 2);
      if (err) {
        console.log('parse error: ' + err);
      } else {
        //console.log('parse files: ' + filesTmp);
        //重命名为真实文件名
        console.log(files);
        var result = [];
        for (var i = 0; i < files.inputFile.length; i++) {
          if (files.inputFile[i].size == 0) {
            fs.unlinkSync(files.inputFile[i].path);
          } else {
            var inputFile = files.inputFile[i];
            var n=inputFile.originalFilename;
            var t=n.split(".")[1];
            var uploadedPath = inputFile.path;
            var name = uploadedPath.split('\\')[uploadedPath.split('\\').length-1];
            var dstPath = './uploadDir/' + name;
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var URL = y + "/" + m + "/" + d + "/" + name;
            var file = {
              fileName: name,
              dstPath: dstPath,
              fileType: files.inputFile[i].headers['content-type'],
              fileSize: files.inputFile[i].size,
              URL:URL,
              videoId:fields.id
            }

            result.push(file);
            console.log(result);
          }
        }
        success(result);
      }
    });
  }
}
