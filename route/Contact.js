const express = require('express');
const Contact = require('../model/Contact');
const router = express.Router();

router.post('/', async (req, res) => {
    const {
        firstName,
        lastName,
        businessEmail,
        phoneNumber,
        industry,
    } = req.body;

    try {
        const contact = await Contact.create({
            firstName,
            lastName,
            businessEmail,
            phoneNumber,
            industry,
        });

        return res.status(200).json({
            message : "Your response was saved",
        });
    } catch (error) {
        return res.status(500).json({
            message : "some error occured",
            error
        })
    }



});
module.exports = router;