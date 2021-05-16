const express = require("express");
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();
const url='https://raw.githubusercontent.com/invictustech/test/main/README.md';
app.get('/:id', (req, res) => {

    fetch(url, { method: "GET" }).then(response => response.text()).
        then(data => {
            var txtdata = "" + data;
            var word = "";
            var map = new Map();
            var letterNum = /^[0-9a-zA-Z]+$/;

            for (let i = 0; i < txtdata.length; i++) {

                if (txtdata[i].match(letterNum)) {
                    word += txtdata[i];
                }
                else if (i > 0 && txtdata[i - 1].match(letterNum)) {
                    if (map.get(t) === undefined) {
                        map.set(t, 1);
                    } else {
                        map.set(word, map.get(word) + 1);
                    }
                    word = "";
                }
            }
            var topWords = [];
            var n = parseInt(req.params.id);
            var mxTime = -1;
            var mxWord = "";

            while (n--) {
                map.forEach((num, text) => {

                    if (mxTime < num) {
                        mxWord = text;
                        mxTime = num;
                    }
                });

                map.set(mxWord, -1);
                topWords.push([mxWord, mxTime])
                mxTime = -1; mxWord = "";
            }
            res.send(JSON.stringify(topWords));
        });


})

app.listen(process.env.PORT || 3000, () => {
    console.log("Your App Running on port    http://localhost:3000",);
});