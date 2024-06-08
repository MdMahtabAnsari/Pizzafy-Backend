const express = require('express')
const serverConfig=require('./config/serverConfig')
const app=express();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(serverConfig.PORT, () => {
    console.log(`Example app listening on port ${serverConfig.PORT}`);
});







// 127.0.0.1:3000 => socket address
// IP:PORT => socket address

// SOLID