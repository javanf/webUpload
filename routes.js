
var File=require('./file');

module.exports = function(app) {
  //Index
  //文件上传
  app.get('/admin/test', File.test);
  app.post('/admin/uploadVideo',File.fileUpload);
}
