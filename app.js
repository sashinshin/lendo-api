const Express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { BANK_PARTNER_URL } = require('./config.js');
const { createApplicationDb, updateApplicationDb, getAllDb, getByIdDb, getByStatusDb } = require('./database/models/dbHelpers.js');

const app = Express();
app.use(bodyParser.json());

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

app.post('/api/applications', async (req, res) => {
    const application = await createJob(req.body);

    if (!application.error) {
        await createApplicationDb(application);

        updatePoller(application.id);
        return res.sendStatus(200);
    };

    return res.status(400).send(application.error);
});

app.get('/api/applications', async (req, res) => {
    const status = req.query.status;
    
    let applications;
    if (status === 'rejected' || status === 'completed' || status === 'pending') {
        applications = await getByStatusDb(status);
    } else {
        applications = await getAllDb();
    };
    return res.status(200).send(applications);
});

app.get('/api/applications/:id', async (req, res) => {
    const application = await getByIdDb(req.params.id);
    if (application.length > 0) {
        return res.status(200).send(application);
    }
    return res.sendStatus(404);
});

module.exports = app;
