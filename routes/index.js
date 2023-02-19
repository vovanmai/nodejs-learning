module.exports = (app) => {
    require("./tutorial.route")(app);
    require("./user.route")(app);
}