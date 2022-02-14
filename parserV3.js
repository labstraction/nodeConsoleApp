// 1) Ripulire la stringa da spazi e virgole -ok
// 2) Creare un array di linee (lines) spezzando la stringa per ogni linea -ok
// 3) Creare un array di proprietà (properties) spezzando la prima linea per punto e virgola -ok
// 4) Creare un array (users) vuoto per contenere gli oggetti che creeremo -ok
// 5) Ciclare sulle linee rimaneti
// Per ogni linea:
//      6) Creare un array di parole (words) spezzando la linea sul punto e virgola e parsando le parole
//      7) Creare un oggetto vuoto -ok
//      8) Ciclare sull'array delle proprietà -ok
//      Per ogni proprietà:
//              9) assegnare all'oggetto la proprietà attribuendogli il valore corrispondente all'indice -ok
//              della proprietà nell'array di parole -ok
//              10) aggiungere l'oggetto all'array Users -ok
// 11) ritornare l'array Users -ok 


class ParserV3{

    static parseCSV(csvString, separator = ","){


        // const regex = new RegExp(" ", 'g');
        // const csvWithNoSpaces = csvString.replace(regex, "");

        // const regex2 = new RegExp(",", 'g');
        // const csvWithNoComma = csvWithNoSpaces.replace(regex2, ".");

        const csvWithNoSpaces = this.removeSpaces(csvString);

        // const csvWithNoComma = this.removeComma(csvWithNoSpaces);

        const arrayOfLines = this.splitLines(csvWithNoSpaces);

        const firstLine = arrayOfLines[0]

        const arrayOfProperties = this.splitLineBySeparator(firstLine, separator);

        const users = [];

        for (let i = 1; i < arrayOfLines.length; i++) {
            const line = arrayOfLines[i];
            const arrayOfWords = this.parseValuesFromLine(line, separator);
            const user = {};
            for (let j = 0; j <arrayOfProperties.length; j++) {
                const property = arrayOfProperties[j];
                user[property] = arrayOfWords[j]
            }
            users.push(user);
        }

        return users;
    }
    
    static parseValuesFromLine(string, separator){
        const arrayOfWords = this.splitLineBySeparator(string, separator);
        const arrayOfValues = [];
        for (const word of arrayOfWords) {
            const value = this.parseWord(word);
            arrayOfValues.push(value);
        }
        return arrayOfValues;
    }

    static parseWord(string){
        if (isNaN(string) === false) {
            return parseFloat(string);
        }
        
        if (string.toLowerCase() === 'true'){
            return true;
        }

        if (string.toLowerCase() === 'false'){
            return false;
        }

        if ((new Date(string) !== "Invalid Date") && !isNaN(new Date(string))) {
            return new Date(string)
        }

        return string;
    }

    static splitLineBySeparator(string, separator){
        const arrayOfWords = string.split(separator);
        return arrayOfWords
    }

    static splitLines(string){
        const arrayOfLines = string.split(/\r?\n/);
        return arrayOfLines
    }

    static removeComma(string){
        const stringWithNoSpaces = this.replaceAll(string, ",", ".");
        return stringWithNoSpaces
    }

    static removeSpaces(string){
        const stringWithNoSpaces = this.replaceAll(string, " ", "");
        return stringWithNoSpaces
    }

    static replaceAll(originalString, stringToReplace, newString){
        const regex = new RegExp(stringToReplace, 'g');
        const replacedString = originalString.replace(regex, newString);
        return replacedString;
    }

}



module.exports = ParserV3;