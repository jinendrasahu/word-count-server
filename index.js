const express = require("express");
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const url='https://raw.githubusercontent.com/invictustech/test/main/README.md';

app.get('/:id', async (req, res) => {
    var ids=req.params.id;
    if(!ids.match(/^[0-9]+$/)){
        return res.json([{error:"only numeric value required"}]);
    }

    fetch(url).then(response => response.text()).
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
                    if (map.get(word) === undefined) {
                        map.set(word, 1);
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
            if(n>map.size){
                                n=map.size;
                            }
            while (n--) {
                map.forEach((num, text) => {

                    if (mxTime < num) {
                        mxWord = text;
                        mxTime = num;
                    }
                });

                map.set(mxWord, -1);
                item={};
                item['word']=mxWord;
                item['count']=mxTime;
                topWords.push(item);
                mxTime = -1; mxWord = "";
            }
            return res.status(200).json(topWords);
            
        })
        .catch(err=>{return res.status(500).json([{error:"Unable to fetch api"}])});

})

app.listen(process.env.PORT || 3000, () => {
    console.log("Your App Running on port    http://localhost:3000",);
});