const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const Url = require('../models/Url');

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseURl = config.get('baseURL');

    if (!validUrl.isUri(baseURl)) {
        return res.status(401).json('Invalid Base Url');
    }

    // Create Url Code
    const urlCode = shortId.generate();
    console.log("URLCode::::::::::",urlCode);

    // Check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl })
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseURl+'/'+urlCode;
                console.log("URL::::::::::",shortUrl);
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                console.log("URL.Save:::::::::::::",url);
                await url.save();
                res.json(url)
            }
        } catch (err) {
            console.error("Error in creating Url");
            res.status(500).json("Error in Creating Url")
        }
    } else {
        console.error("Invalid URl");

    }
})

module.exports = router;