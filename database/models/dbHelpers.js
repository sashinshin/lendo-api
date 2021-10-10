const db = require('../knexfile.js');

const createApplicationDb = (data) => db('applications').insert(data);
const updateApplicationDb = (id, data) => db('applications').where('id', id).update(data);
const getAllDb = () => db('applications').select('*');
const getByIdDb = (id) => db('applications').where('id', id).select('*');
const getByStatusDb = (status) => db('applications').where('status', status).select('*');
const deleteAllDb = () => db('applications').select('*').del();

module.exports = {
     createApplicationDb, updateApplicationDb, getAllDb, getByStatusDb, getByIdDb, deleteAllDb
};
