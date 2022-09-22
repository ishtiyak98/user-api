const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route");

const app = express();
const PORT = process.env.PORT || 5000;

//!------- MiddleWare ------
app.use(express.json());
app.use(cors());


app.use(userRoute)

app.get("/", (req, res) => {
  res.send("USER API SERVER");
});

app.use((req, res, next) => {
    res.status(404).json({
        message: "route Not Found!"
    })
});

app.listen(PORT, () => {
  console.log(`server is running from port: http://localhost:${PORT}`);
});
