require("dotenv").config();

const app = require("./app.js");
const port = process.env.PORT || 8080;
const dbConfig = require("./config/db.config.js");

dbConfig();
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
    
})

