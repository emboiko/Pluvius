const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("/", (req, res) => {
    res.render("index", { title: "Pluvius" });
});

app.get("/weather", (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "You must provide a location."
        });
    }

    geocode(req.query.location, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err });
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send(err);
            }

            res.send({
                location: location,
                forecast: forecastData
            });
        });
    });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.get("/links", (req, res) => {
    res.render("links", { title: "Links & Resources" });
});

app.all("*", (req, res) => {
    res.render("404", {
        title: "Page Not Found",
        message: "Well, this is awkward. It appears you've stumbled onto a page which does not exist. "
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
