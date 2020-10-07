const express = require("express");

const app = express();

const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));

//配置跨域CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //设置跨域请求源
  res.header(
    "Access-Control-Allow-Headers",
    "content-type,Content-Length, Authorization,token, Accept,Access-Token,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "get,delete,put,post");
  res.header("Control-cache", `max-age=${60 * 60 * 24}`);
  next();
});
//处理上传文件
app.post("/upload", require("./uploads"));
//处理删除文件
app.post("/delete", require("./delete"));
app.listen(3001, () => {
  console.log("the server is listening");
});
