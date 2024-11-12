module.exports = (app) => {
    app.get("/healthz", (req, res) => {
        res.json({"res": "App is running fine"});
    });
}