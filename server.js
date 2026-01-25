const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
const indexRoutes = require("./routes/indexRoute");

app.use(express.urlencoded({extended: true}));
app.use("/", indexRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});