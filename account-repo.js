const connectedKnex = require('./knex-connector');

function getAllAccounts() {
    return connectedKnex('accounts').select('*');
};

function getSingleAccounts(_id) {
    return connectedKnex('accounts').select('*').where("id", _id);
};

function deleteSingleAccounts(_id) {
    return connectedKnex("accounts").where("id", _id).del()
};
function updateRecord(_id, _data) {
    return connectedKnex("accounts").where("id", _id).update(_data);
};
function addRecord(_data) {
    return connectedKnex("accounts").insert(_data).returning('id');
};

module.exports = {
    getAllAccounts,
    getSingleAccounts,
    deleteSingleAccounts,
    updateRecord,
    addRecord
}