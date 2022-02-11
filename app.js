"use strict"

const fs = require('fs');
const { json } = require('stream/consumers');

const ParserV2 = require('./parserV2.js');

const argumets = process.argv.slice(2);

const fileToRead = argumets[0];

const fileToWrite = argumets[1];

// fs.readFile(fileToRead, 'utf8', (error, data) => {
//     if (error) {
//         console.log(error);
//     } else {
//         const array = ParserV2.parseCSVToArray(data);
//         console.log(array);
//     }
// })

fs.readFile(fileToRead, 'utf8', manageFileData)

function manageFileData(error, data) {
    if (error) {
        console.log(error);
    } else {
        const array = ParserV2.parseCSVToArray(data);
        const json = JSON.stringify(array);
        writeJSONFile(json);
    }
}

function writeJSONFile(json){
    fs.writeFile(fileToWrite, json, error => {
        if (error) {
            console.log(error);
        } else {
            console.log("Bella Storia!!!!");
        }
    });
}


console.log("ho già letto?");


// let data;
// try {
//     data = fs.readFileSync(fileToRead, 'utf8');
//     console.log(data);
// } catch (err) {
//     console.error(err);
// }

// let array = []

// try {
//     array = Parser.parseCSVLine(data);
//     console.log("array", array);
//     console.log("sum", array.reduce((p,c) => p+c))
// } catch (error) {
//     console.log(error.message);

//     if (error instanceof PartialInvalidStringError) {
//         array = error.partialResult;
//     }
// }


// try {
//     fs.writeFileSync(fileToWrite, JSON.stringify(array));
// } catch (error) {
//     console.log(error);
// }

// console.log("qui finisce il programma")