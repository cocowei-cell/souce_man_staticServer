/**
 * @description: 文件上传
 * @param {type}
 * @return {type}
 */

const formidable = require("formidable");
const { checkToken } = require("./utils/Token");
const { URL } = require("./config");
module.exports = async (req, res) => {
  try {
    const token = req.headers;
    //核查token
    // await checkToken(token);
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads/static/img"; //上传路径
    form.keepExtensions = true; //保留文件扩展名
    form.maxFileSize = 1024 * 1024 * 10; //最大文件为10M
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw err;
      }
      let imgArray = [];
      for (let key in files) {
        if (!files[key].type.includes("image")) {
          return res.send({ msg: "请上传图片", code: 400 });
        }
        const temp = files[key].path.split("uploads");
        imgArray.push({
          temp_path: files[key].path, //文件上传的服务器路径
          url: URL + temp[1], //绝对路径
        });
      }
      //返回数据给前台
      return res.send({ msg: "ok", code: 200, files: imgArray });
    });
  } catch (error) {
    console.log(error)
    return res.send({ msg: "文件上传失败", code: 400 });
  }
};
