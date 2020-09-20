/**
 * @description: 删除模块
 * @param {type}
 * @return {type}
 */

const fs = require("fs");
const path = require("path");
const { checkToken } = require("./utils/Token");
module.exports = async (req, res) => {
  try {
    const token = req.headers.token;
    //验证token
    // await checkToken(token);
    //获取临时路径
    const { temp_path } = req.body;
    //执行异步删除该文件
    fs.unlink(temp_path, function (err) {
      if(err) {
        throw err;
      }
      return res.send({ msg: "删除成功", code: 200 });
    }); 
  } catch (error) {
    console.log(error);
    return res.send({ msg: "token非法", code: 400 });
  }
};
