const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('Accounts');
        const account = await collection.find({}).toArray();
        res.status(200).json(account);
    } catch (err) {
        console.error('Error in getAll:', err.message);
        res.status(500).json({ message: 'Error retrieving Account', error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('Account');
        const account = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving account' });
    }
};


const createAccount = async (req, res) => {
    console.log(req.body);
    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;

        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const account = { firstName, lastName, email, phoneNumber, password };
        const db = getDb();
        const collection = db.collection('Account');
        const result = await collection.insertOne(account);

        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating account', error: err.message });
    }
};

const updateAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const updateData = req.body;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }

        const db = getDb();
        const collection = db.collection('Accounts');

        const result = await collection.updateOne(
            { _id: new ObjectId(accountId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ message: 'Account updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating account', error: err.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const db = getDb();
        const collection = db.collection('Account');

        const result = await collection.deleteOne({ _id: new ObjectId(accountId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting account', error: err.message });
    }
};


module.exports = {
    getAll,
    getSingle,
    createAccount,
    updateAccount,
    deleteAccount
};