/**
I removed the findProduct method and added the
findCompany method. The findProduct method is redundant
because I modified the transaction document to contain embedded
products. I added the findCompany method to be able to retrieve
a company's return policy. More details about these modifications
can be found in the readme.
 */

const db = require('./db.json');

function findTransaction(id) {
    return db.transactions.find(t => t.id == id);
}

function findCompany(id) {
    return db.companies.find(company => company.id == id);
}

exports.findTransaction = findTransaction;
exports.findCompany = findCompany;
