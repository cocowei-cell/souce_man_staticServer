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
    form.uploadDir = "./uploads/static/img";
    form.keepExtensions = true;
    form.maxFileSize = 1024 * 1024 * 2;
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw err;
      }
      let imgArray = [];
      for (let key in files) {
        const temp = files[key].path.split("uploads");
        imgArray.push(URL + temp[1]);
      }
      //返回数据给前台
      return res.send({ msg: "ok", code: 200, files: imgArray });
    });
  } catch (error) {
    return res.send({ msg: "文件上传失败", code: 400 });
  }
};
