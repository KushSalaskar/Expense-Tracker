const userRouter = require('./userRoutes')

module.exports = (app) => {
    app.get("/healthz", (req, res) => {
        res.json({"res": "App is running fine"});
    });

    app.use('/v1/user', userRouter)
}