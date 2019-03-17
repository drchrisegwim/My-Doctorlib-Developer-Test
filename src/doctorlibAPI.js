const express = require("express");
const app = express();
app.use(express.json());

const Joi = require("joi");

const persons = [{
        id: 1,
        reason: "PTO"
    },
    {
        id: 2,
        reason: "sickleave"
    }
];

const groups = [{
    id: 1,
    reason: "team event"
}];

const wholeTeams = [{
    id: 1,
    reason: "public holiday"
}];

// Http get - For viewing absence
app.get('/', (req, res) => {
    res.send('Welcome to Doctorlib API. You can expose absences of your staff to our platform via this endpoint. You can test the endpoints by requesting them via the listening port eg. http://localhost:3210/api/persons ');
});

app.get("/api/persons", (req, res) => {
    res.send(persons);
});

app.get("/api/groups", (req, res) => {
    res.send(groups);
});

app.get("/api/wholeTeams", (req, res) => {
    res.send(wholeTeams);
});


// Defining the webserver port to be used for this endpoint
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));