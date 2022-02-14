"use strict"

const fs = require('fs');

const ParserV3 = require('./parserV3.js');

const fileToRead = "./assets/input/test4.csv";
const fileToWrite = "./assets/output/output4.json";

fs.readFile(fileToRead, 'utf8', fileReaderCallback)


function fileReaderCallback(err, data) {
    if(err){
        console.log(err);
    } else {
        const arrayOfUsers = ParserV3.parseCSV(data);
        fs.writeFile(fileToWrite, JSON.stringify(arrayOfUsers), (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}