// тестирование функции deleteDiscriptionRus
let messageTestPassed = '\ntest passed'
let messageTestFailed = '\ntest failed'
let deleteDiscriptionRusTest = (arr) => {
    let [arrOfResponses, deleteDiscriptionRus] = arr
    let elem = Object.create(arrOfResponses[0])
    deleteDiscriptionRus(elem)
    console.assert((!(elem.hasOwnProperty('discriptionRus'))), ' -- deleteDiscriptionRus')
}

// тестирование функции getResponseJSON
let getResponseJSONTest = (arr) => {
    let [arrOfResponses, getResponseJSON] = arr
    let addedText = ' added text1'
    for (let elem of arrOfResponses) {
        let jsonObj = getResponseJSON(elem.responseCode, addedText)
        // console.log(jsonObj.responseCode)
        // console.log(elem.responseCode)
        // console.log(jsonObj)
        // console.log(jsonObj.description.slice(-(addedText.length)))
        // console.log( // jsonObj,
        //     jsonObj.description.slice(-(addedText.length)) === addedText ? messageTestPassed : messageTestFailed, jsonObj.responseCode === elem.responseCode ? messageTestPassed : messageTestFailed)
        console.assert((jsonObj.description.slice(-(addedText.length)) === addedText && jsonObj.responseCode === elem.responseCode), ' -- getResponseJSON')
    }
}


// тестирование функции addTextInComment
let addTextInCommentTest = (arr) => {
    let [app, addTextInComment] = arr
    let someText = 'Some text'
    let env = app.get('env')
    // console.log(addTextInComment(someText))
    // console.log(' -- ' + someText)
    // console.log(`addTextInComment test`, addTextInComment(someText) === ' -- ' + someText ? messageTestPassed : messageTestFailed)
    console.assert((addTextInComment(someText) === ' -- ' + someText), ` -- addTextInComment test`)
    app.set('env', 'development')
    // console.log(`addTextInComment development`, addTextInComment(someText) === ' -- ' + someText ? messageTestPassed : messageTestFailed)
    console.assert((addTextInComment(someText) === ' -- ' + someText), ` -- addTextInComment development`)
    app.set('env', 'production')
    // console.log(`addTextInComment production`, addTextInComment(someText) === '' ? messageTestPassed : messageTestFailed)
    console.assert((addTextInComment(someText) === ''), ` -- addTextInComment production`)
    app.set('env', env)
}

// тестирование функции makeConnectionUpdateUsersReturnJSON
// req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId
let makeConnectionUpdateUsersReturnJSONtest = (arr) => {
    let [getResponseJSON, addTextInComment, getTokenFunction, credentials, tokenExpire, longTokenExpire, makeConnectionUpdateUsersReturnJSON] = arr

    let userNameFull = 'User name'
    let userNameEmpty = ''
    let objOwnerId1 = { id: 1, toDeleteOwner: true }
    let objOwnerId2 = { id: 2, toDeleteOwner: false }
    let responseCode = "0040000"
    let req = {}
    let next = {}
    let userId = 1
    // это такой кастыль для имитации работы отправки заголовка. Первый элемент массива и будет отправленным сообщением
    let counter = []
    let res = {
        status(n) {
            return {
                json(x) {
                    // let y = JSON.stringify(x)
                    counter.push(x)
                    return x
                }
            }
        }
    }


    // let db1 = {
    //     run(request, arr, fun) {
    //         switch (request) {

    //             case 'UPDATE users SET user_name = ? WHERE user_id = ?':
    //                 fun({})
    //                 break;

    //             case 'INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)':
    //                 let insertConnectionsRows = {}
    //                 insertConnectionsRows.insertId = 1
    //                 fun(null, insertConnectionsRows.insertId)
    //                 break;

    //             default:
    //                 break;
    //         }
    //     }
    // }
    let db2 = {
        run(request, arr, fun) {
            switch (request) {

                case 'INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)':
                    fun(true)
                    break;

                default:
                    break;
            }
        }
    }

    // let db3 = {
    //     run(request, arr, fun) {
    //         switch (request) {

    //             case 'INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)':
    //                 let insertConnectionsRows = {}
    //                 insertConnectionsRows.insertId = 1
    //                 fun(null, insertConnectionsRows.insertId)
    //                 break;

    //             default:
    //                 break;
    //         }
    //     }
    // }
    let db4 = {
        run(request, arr, fun) {
            switch (request) {

                case 'INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)':
                    let insertConnectionsRows = {}
                    insertConnectionsRows.insertId = 1
                    fun(null, insertConnectionsRows.insertId)
                    break;
                case 'SELECT connection_userAgent, connection_id FROM connections WHERE user_id = ?':
                    fun(true)
                    break;
                default:
                    break;
            }
        }
    }
    let db5 = { // для данного набора нужно еще и userName === true
        run(request, arr, fun) {
            switch (request) {
                case 'INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)':
                    let insertConnectionsRows = {}
                    insertConnectionsRows.insertId = 1
                    fun(null, insertConnectionsRows.insertId)
                    break;
                case 'SELECT connection_userAgent, connection_id FROM connections WHERE user_id = ?':
                    fun(null, [{ connection_userAgent: 'userAgent1', connection_id: 1 }, { connection_userAgent: 'userAgent2', connection_id: 2 }])
                    break;
                case 'UPDATE users SET user_name = ? WHERE user_id = ?':
                    fun(true)
                    break;
                default:
                    break;
            }
        }
    }
/* 
"connectedUserAgent": [
            {"connectedId": 0, "connectedUserAgentName": ""}
],
*/
let db6 = { // для данного набора нужно еще и userName === true
    run(request, arr, fun) {
        switch (request) {
            case 'INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)':
                let insertConnectionsRows = {}
                insertConnectionsRows.insertId = 1
                fun(null, insertConnectionsRows.insertId)
                break;
            case 'SELECT connection_userAgent, connection_id FROM connections WHERE user_id = ?':
                fun(null, [{"connection_id": 1, "connection_userAgent": 'userAgent1'}, {"connection_id": 2, "connection_userAgent": 'userAgent2'}])
                break;
            case 'UPDATE users SET user_name = ? WHERE user_id = ?':
                fun(null)
                break;
            default:
                break;
        }
    }
}

let db7 = {
    run(request, arr, fun) { // для данного набора нужно еще и userName === false
        switch (request) {
            case 'INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)':
                let insertConnectionsRows = {}
                insertConnectionsRows.insertId = 1
                fun(null, insertConnectionsRows.insertId)
                break;
            case 'SELECT connection_userAgent, connection_id FROM connections WHERE user_id = ?':
                fun(null, [{"connection_id": 1, "connection_userAgent": 'userAgent1'}, {"connection_id": 2, "connection_userAgent": 'userAgent2'}])
                break;
            default:
                break;
        }
    }
}
    /*
        getResponseJSON(`0001003`, 'ощибка БД UPDATE users SET user_name = ? WHERE user_id = ?')
        'UPDATE users SET user_name = ? WHERE user_id = ?' err
    */
        let db
        req.headers = {}
        req.headers['user-agent'] = 'some user agent' // не важно
        let userName
        let objOwnerId
        counter = [] // это мы обнуляем список вызовов, чтобы потом иметь возможность снова
        let result
        responseCode
        let check
        let checkJson
        let resultJson

    db = db5
    req.headers = {}
    req.headers['user-agent'] = 'some user agent' // не важно
    userName = userNameFull
    objOwnerId = objOwnerId1 // не важно
    counter = [] // это мы обнуляем список вызовов, чтобы потом иметь возможность снова
    result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    responseCode = `0001003`
    check = getResponseJSON(responseCode, 'ощибка БД UPDATE users SET user_name = ? WHERE user_id = ?')
    checkJson = JSON.stringify(check)
    resultJson = JSON.stringify(counter[0])
    console.assert(checkJson === resultJson, 'возврат ошибки при попытке обновить user_name при userName заполненном')


    /* 
    getResponseJSON("0001003", 'ощибка БД INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)')
    INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)' err
    */
    userName = userNameFull // не важно
    db = db2
    req.headers = {}
    req.headers['user-agent'] = 'some user agent' //не важно
    objOwnerId = objOwnerId1 // не важен
    counter = [] // это мы обнуляем список вызовов, чтобы потом иметь возможность снова
    result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    responseCode = `0001003`
    check = getResponseJSON(responseCode, 'ощибка БД INSERT INTO connections (connection_userAgent, user_id) VALUES (?, ?)')
    checkJson = JSON.stringify(check)
    resultJson = JSON.stringify(counter[0])
    console.assert(checkJson === resultJson, 'возврат ошибки при попытке ввести connections')

    db = db4
    req.headers = {}
    req.headers['user-agent'] = 'some user agent' // не важно
    userName = userNameFull // не важно
    objOwnerId = objOwnerId1 // не важно
    counter = [] // это мы обнуляем список вызовов, чтобы потом иметь возможность снова
    result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    responseCode = `0001003`
    check = getResponseJSON(responseCode, 'ошибка БД SELECT connection_userAgent, connection_id FROM connections WHERE user_id = ?')
    checkJson = JSON.stringify(check)
    resultJson = JSON.stringify(counter[0])
    console.assert(checkJson === resultJson, 'возврат ошибки при запросе перечня подключенных устройств')

    db = db6
    req.headers = {}
    req.headers['user-agent'] = 'some user agent' // не важно
    userName = userNameFull
    objOwnerId = objOwnerId1 // не важно
    counter = [] // это мы обнуляем список вызовов, чтобы потом иметь возможность снова
    result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    areTokens = (typeof result.accessToken === 'string' && typeof result.refreshToken === 'string' && result.refreshToken.length && result.accessToken.length)
    counter[0].accessToken = ''
    counter[0].refreshToken = ''
    responseCode = `0040000`
    check = getResponseJSON(responseCode)
    check.ownerId = objOwnerId.id
    check.userId = userId
    check.connectedUserAgent = [{"connectedId": 1, "connectedUserAgentName": 'userAgent1'}, {"connectedId": 2, "connectedUserAgentName": 'userAgent2'}]
    checkJson = JSON.stringify(check)
    resultJson = JSON.stringify(counter[0])
    console.assert(checkJson === resultJson && areTokens, 'возрат токено при userName заполненном')

    db = db7
    req.headers = {}
    req.headers['user-agent'] = 'some user agent'
    userName = userNameEmpty
    objOwnerId = objOwnerId1
    counter = [] // это мы обнуляем список вызовов, чтобы потом иметь возможность снова
    result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    areTokens = (typeof result.accessToken === 'string' && typeof result.refreshToken === 'string' && result.refreshToken.length && result.accessToken.length)
    counter[0].accessToken = ''
    counter[0].refreshToken = ''
    responseCode = `0040000`
    check = getResponseJSON(responseCode)
    check.ownerId = objOwnerId.id
    check.userId = userId
    check.connectedUserAgent = [{"connectedId": 1, "connectedUserAgentName": 'userAgent1'}, {"connectedId": 2, "connectedUserAgentName": 'userAgent2'}]
    checkJson = JSON.stringify(check)
    resultJson = JSON.stringify(counter[0])
    console.assert(checkJson === resultJson && areTokens, 'возрат токено при userName пустом')


    // db = db3
    // req.headers = {}
    // req.headers['user-agent'] = 'some user agent'
    // userName = userNameFull
    // objOwnerId = objOwnerId1
    // counter = [] // это мы обнуляем список вызовов, чтобы потом иметь возможность снова
    // result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    // areTokens = (typeof result.accessToken === 'string' && typeof result.refreshToken === 'string' && result.refreshToken.length && result.accessToken.length)
    // counter[0].accessToken = ''
    // counter[0].refreshToken = ''
    // responseCode = `0040000`
    // check = getResponseJSON(responseCode)
    // check.ownerId = objOwnerId.id
    // check.userId = userId
    // checkJson = JSON.stringify(check)
    // resultJson = JSON.stringify(counter[0])
    // console.assert(checkJson === resultJson && areTokens, 'возрат токено при userName заполненном')

    // db = db3
    // req.headers = {}
    // req.headers['user-agent'] = 'some user agent'
    // userName = userNameEmpty
    // objOwnerId = objOwnerId1
    // counter = [] // это мы обнуляем список вызовов, чтобы потом иметь возможность снова
    // result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    // areTokens = (typeof result.accessToken === 'string' && typeof result.refreshToken === 'string' && result.refreshToken.length && result.accessToken.length)
    // counter[0].accessToken = ''
    // counter[0].refreshToken = ''
    // responseCode = `0040000`
    // check = getResponseJSON(responseCode)
    // check.ownerId = objOwnerId.id
    // check.userId = userId
    // checkJson = JSON.stringify(check)
    // resultJson = JSON.stringify(counter[0])
    // console.assert(checkJson === resultJson && areTokens, 'возрат токено при userName пустом')


    // db = db2
    // userName = userNameEmpty
    // objOwnerId = objOwnerId2
    // result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    // areTokens = (typeof result.accessToken === 'string' && typeof result.refreshToken === 'string')
    // result.accessToken = ''
    // result.refreshToken = ''

    // console.assert(result === getResponseJSON(responseCode))

    // objOwnerId = objOwnerId1
    // result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    // console.assert(result === getResponseJSON(responseCode))

    // objOwnerId = objOwnerId2
    // result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    // console.assert(result === getResponseJSON(responseCode))

    // delete req.headers['user-agent']
    // objOwnerId = objOwnerId1
    // result = makeConnectionUpdateUsersReturnJSON(req, res, next, db, getResponseJSON, addTextInComment, getTokenFunction, userId, credentials, tokenExpire, longTokenExpire, userName, objOwnerId)
    // console.assert(result === getResponseJSON(responseCode))

}

module.exports = { deleteDiscriptionRusTest, getResponseJSONTest, addTextInCommentTest, makeConnectionUpdateUsersReturnJSONtest }