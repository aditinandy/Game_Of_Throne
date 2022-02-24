const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listShema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    battle_type: {
        type: String,
        required: true
    },
    battle_number: {
        type: String,
        required: true
    },
    attacker_king: {
        type: String,
        required: true
    },
    defender_king: {
        type: String,
        required: true
    },
    attacker_1: {
        type: String,
        required: true
    },
    defender_1: {
        type: String,
        required: true
    },
    attacker_outcome: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('List', listShema);
