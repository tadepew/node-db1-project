const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db("accounts")
    .then(response => {
      console.log("GET / response:", response);
      res.status(200).json(response);
    })
    .catch(error => {
      console.log("GET / error:", error);
      res.status(500).json({ message: "GET / failed." });
    });
});

server.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(response => {
      console.log("GET /:id response:", response);

      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "No account with id " + req.params.id + " found." });
      }
    })
    .catch(error => {
      console.log("GET /:id error:", error);
      res.status(500).json({ message: "GET /:id failed." });
    });
});

server.post("/", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then(response => {
      console.log("POST / response:", response);

      if (response.length > 0) {
        res.status(201).json(response);
      } else {
        res.status(404).json({ message: "POST error..." });
      }
    })
    .catch(error => {
      console.log("POST / error:", error);
      res.status(500).json({ message: "POST / failed." });
    });
});

server.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(response => {
      console.log("PUT /:id response:", response);

      if (response > 0) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "No account with id " + req.params.id + " found." });
      }
    })
    .catch(error => {
      console.log("PUT /:id error:", error);
      res.status(500).json({ message: "PUT /:id failed." });
    });
});

server.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(response => {
      console.log("DELETE /:id response:", response);

      if (response > 0) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "No user with id " + req.params.id + " found." });
      }
    })
    .catch(error => {
      console.log("DELETE /:id error:", error);
      res.status(500).json({ message: "DELETE /:id failed." });
    });
});

module.exports = server;
