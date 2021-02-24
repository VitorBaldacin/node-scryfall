const axios = require('axios');

exports.getFuzzyCard = async (req, res) => {
    let name = req.params.name;
    
    await axios.get('https://api.scryfall.com/cards/named?fuzzy='+name)
    .then(function (response) {
        // handle success
        if(response.status == 200){
            res.json(response.data);
        }
    })
    .catch(function (error) {
        // handle error
        res.json({
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data
        });
    })
}

exports.getTextCard = async (req, res) => {
    let text = req.params.text;
    
    await axios.get('https://api.scryfall.com/cards/search?q=o:'+text)
    .then(function (response) {
        // handle success
        if(response.status == 200){
            res.json(response.data);
        }
    })
    .catch(function (error) {
        // handle error
        res.json({
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data
        });
    })
}