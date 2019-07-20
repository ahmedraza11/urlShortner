const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

router.get('/:code', async (req, res) => {
    const { code } = req.params;
    try{    
        const url = await Url.findOne({urlCode: code});
        if(url){
           return res.redirect(url.longUrl);
        }else {
           return res.status(401).json('No Url Found')
        }
    }catch(err){
        console.error(err);
        res.status(500).json("Error in Server")
    }
})


module.exports = router;

