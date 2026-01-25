

async function getAll(req, res) {
    res.render("index", {title: "MainPage"});
}

module.exports = {
    getAll,
}