const fs = require('node:fs');
const path = require('node:path');
const { responses } = require('./dataForAPI')

const writeFile = (pathFromDirname, fileContent) => {
    fs.writeFile(__dirname + pathFromDirname, fileContent, err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`file written successfully`)
        }
    });
}

let listOfDouble = []
for (let i = 0; i < responses.length; i++) {
    let responseCodeIsChecking = responses[i].responseCode
    for (let y = i + 1; y < responses.length; y++) {
        let responseCode = responses[y].responseCode
        if (responseCode == responseCodeIsChecking) {
            listOfDouble.push(responseCode)
        }
    }
}
if (listOfDouble.length) { 
    console.error(listOfDouble.toString(), ' --- это продублированный код!!! ОШИБКА!!! Файлы /public/js/getAPI/dataForAPIes6.js и /lib/dataForAPInode.js остались прежними') 
    // writeFile('/public/js/getAPI/dataForAPIes6.js', ``)
    // writeFile('/lib/dataForAPInode.js', '')

} else {
    fs.readFile(path.resolve('dataForAPI.js'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        writeFile('/public/js/getAPI/dataForAPIes6.js', `${data.replace('module.exports=', 'export ')}`) // в функции data.replace надо будет использовать регулярное выражение
        writeFile('/lib/dataForAPInode.js', data)
    });
}





