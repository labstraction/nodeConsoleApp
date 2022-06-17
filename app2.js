"use strict"

const fs = require('fs');

//const ParserV3 = require('./parserV3.js');

const fileToRead = "./assets/input/imperia.csv";
const fileToWrite = "./assets/output/imperiaNew.csv";

fs.readFile(fileToRead, 'utf8', fileReaderCallback)


function fileReaderCallback(err, data) {
    if(err){
        console.log(err);
    } else {
        // const arrayOfUsers = ParserV3.parseCSV(data);
        // const yUsers = arrayOfUsers.filter(user => filterCF(user));
        const csv = filterCSV(data);
        fs.writeFile(fileToWrite, csv, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}

function filterCF(user) {
    const cf = user.CFlavoratore;
    const yS = cf?.substring(6, 8)
    const y = parseInt(yS);
    if (y > 90 || y < 22) {
        return true;
    }
    return false;
}

function toCSV(users){
    let csv = "";
    Object.keys(users[0]).forEach(key => {
        csv += key + ",";
    });
    csv += "\n";
    users.forEach(user => {
        Object.keys(user).forEach(key => {
            csv += user[key] + ",";
        });
        csv += "\n";
    });
    return csv.replaceAll("NaN", "");
}


function filterCSV(csv){
    const lines = csv.split("\n");
    const filteredLines = lines.filter((l, i) => {
        if (i === 0) {
            return true;
        }
        const worlds = l.split(",");
        const cf = worlds[2];
        const yS = cf?.substring(6, 8)
        const y = parseInt(yS);
        if (y <= 91 && y > 22) {
            return true;
        }
        return false;
    });
    return filteredLines.join("\n");
}
