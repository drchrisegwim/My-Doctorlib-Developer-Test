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

// Http post - For Creating absence
app.post("/api/persons", (req, res) => {
    const result = validatePersons(req.body);
    if (result.error) {
        return res.send(400, result.error.details[0].message);
    }

    const person = {
        id: persons.length + 1,
        reason: req.body.reason
    };
    books.push(person);
    res.send(person);
});

app.post("/api/groups", (req, res) => {
    const result = validateGroups(req.body);
    if (result.error) {
        return res.send(400, result.error.details[0].message);
    }

    const group = {
        id: groups.length + 1,
        reason: req.body.reason
    };
    books.push(group);
    res.send(group);
});

app.post("/api/wholeTeams", (req, res) => {
    const result = validateWholeTeams(req.body);
    if (result.error) {
        return res.send(400, result.error.details[0].message);
    }

    const wholeTeam = {
        id: wholeTeams.length + 1,
        reason: req.body.reason
    };
    books.push(wholeTeam);
    res.send(wholeTeam);
});


// Validation using JOI
function validatePersons(person) {
    const schema = {
        reason: Joi.string()
            .min(20)
            .required()
    };
    return Joi.validate(person, schema);
}


function validateGroups(group) {
    const schema = {
        reason: Joi.string()
            .min(20)
            .required()
    };
    return Joi.validate(group, schema);
}


function validateWholeTeams(wholeTeam) {
    const schema = {
        reason: Joi.string()
            .min(20)
            .required()
    };
    return Joi.validate(wholeTeam, schema);
}

// Defining the webserver port to be used for this endpoint
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));