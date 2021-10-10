const Express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { BANK_PARTNER_URL } = require('./config.js');
const { createApplicationDb, updateApplicationDb, getAllDb, getByStatusDb } = require('./database/models/dbHelpers.js');

const app = Express();
app.use(bodyParser.json());

// Helper functions
const createJob = async (data) => {
    try {
        const res = await axios.post(`${BANK_PARTNER_URL}/api/applications`, data);
        return res.data;

    } catch (error) {
        return error.response.data;
    }
};

const getJob = async (id) => {
    try {
        const res = await axios.get(`${BANK_PARTNER_URL}/api/jobs?application_id=${id}`);
        return res.data;

    } catch (error) {
        console.log(error.response);
    }
};

const updatePoller = async (id) => {
    const job = await getJob(id);

    if (job.status === 'pending') {
        setTimeout(async () => {
            updatePoller(id);
        }, 5000);
    } else {
        await updateApplicationDb(id, { status: job.status});
    };
};

// Create application
app.post('/api/applications', async (req, res) => {
    const application = await createJob(req.body);

    if (!application.error) {
        await createApplicationDb(application);

        updatePoller(application.id);
        return res.sendStatus(200);
    };

    return res.status(400).send(application.error);
});


// Get applications
app.get('/api/applications', async (req, res) => {
    const applications = await getAllDb();
    return res.status(200).send(applications);
});

app.get('/api/applications/:status', async (req, res) => {
    const applications = await getByStatusDb(req.params.status);
    return res.status(200).send(applications);
});

// create application endpoint and poll it
module.exports = app;

// decouple http request and queing system (rabbitmq?)
// crate application, send to bank api, keep polling, send back