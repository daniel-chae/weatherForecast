const path = require("path"); //used for string path manipulation provided by node
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express(); // create express app
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public"); //__dirname, __filename provided by node to the current file/folder path
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); //expect hbs file as a default view extension. don't have to specify file extension in res.render.
app.set("views", viewPath); //specify where views are located, don't have to specify file path in res.render
hbs.registerPartials(partialsPath); //register partials to be used for hbs

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //all files in public directory is usable

app.get("", (req, res) => {
  //for root route, render index.hbs from specified view path
  res.render("index", {
    title: "Weather",
    name: "Daniel"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Daniel"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Daniel",
    Message: "This is help message for you"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address."
    });
  }

  geocode(address, (error, { longtitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longtitude, (error, forecast) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        location,
        forecast,
        address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Daniel"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Daniel"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
