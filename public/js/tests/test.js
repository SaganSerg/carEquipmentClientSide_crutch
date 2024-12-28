"use strict"
function toDoPostJSONTest(uri, body, firstThenFun, secondThenFun, thirdThenFun, timeOver) {
    if (typeof body !== "object") return console.error('The body argument is not object')
    if (typeof uri !== 'string') return console.error('Uri is not string')
    if (typeof firstThenFun !== 'function') return console.error('firstThenFun is not function')
    if (typeof secondThenFun !== 'function') return console.error('secondThenFun is not function')
    if (typeof thirdThenFun !== 'function') return console.error('thirdThenFun is not function')
    body = JSON.stringify(body)
    // const url = `http://localhost:3000${uri}`
    const url = `https://localhost${uri}`

    fetch(url, {
        method: 'POST',
        headers: new Headers(
            {
                'Content-Type': 'application/json'
            }
        ),
        body
    })
        .then(response => {
            console.assert(...firstThenFun(response))
            return response.json()
        })
        .then(commits => {
            // setTimeout(() => {
            //     if (!commits) {
            //         throw [false, 'Timeout expired. Server not responding.']
            //     }
            // }, timeOver)
            console.assert(...secondThenFun(commits))
            return commits
        })
        .catch(err => {
            console.error('sagan something went wrong', err)
        })
}
const fakeSituationAssert = [true, 'This is a comment on a fake situation. ']
const mockFunction = () => fakeSituationAssert
const startOfMessage = 'Неправильно обрабатывается ситуация, когда '
let smsCode = '41618' // это пока фейковый код, для теста нужно изменить срок ожидания кода и подставить сюда правильный 
const telephoneNumber = '79611835081'
const telephoneSerialNumber = '1234'
const globalObj = {}
const startOfComment = 'Это комментарий '
let accessToken = ''


const getSMSCodeForRegistrationByTelephone = '/api/getSMSCodeForRegistrationByTelephone'

globalObj.getSMSserviceSMSErrTest = [
    // Если в работе с сервисом отправки СМС, что-то пошло не так. Данный тест работает только при NODE_ENV=test node app_cluster.js
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "telephoneNumber": telephoneNumber,
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'ERR',
                "description": "SMS in not sent. Something went wrong",
                "responseCode": "0011000",
            }
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат ответа когда есть повторная отправка смс`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }
]

globalObj.getSMSRealErrTest = [ // как-то не так работает код. Некогда разбираться --- пользоваться не буду.
    // Test for response code. If unhandled error!
    {
        uri: getSMSCodeForRegistrationByTelephone,
        body: {
            "telephoneNumber": telephoneNumber,
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: function (response) {
            const { status } = response
            console.log(status == 200, startOfComment, `The response is ${status}`)
            return [
                status == 200, `The response is ${status}. It is bad!`
            ]
        }
        , secondThenFun: mockFunction
        , thirdThenFun: mockFunction
        , timeOver: 0
    }

    // Если что-то пошло не так. 
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "telephoneNumber": telephoneNumber,
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'ERR',
                "description": "Something went wrong",
                "responseCode": "0001003",
            }
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage}Something went wrong`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }
]

globalObj.getSMSTest = [

    // Если в JSON отсутсвуют те параметры, которые сервер ожидает увидеть в запросе по данному урлу. Отсутсвует "telephoneNumber" и присутствует свойстов mistake.
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "mistake": '79611835081',
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'ERR',
                "description": "the request JSON structure does not match URL",
                "responseCode": "0001000"
            }
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage}в JSON отсутвуют нужные параметры`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    },

    // Если в JSON отсутсвуют те параметры, которые сервер ожидает увидеть в запросе по данному урлу. Отсутсвует "telephoneNumber".
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'ERR',
                "description": "the request JSON structure does not match URL",
                "responseCode": "0001000"
            }
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage}в JSON отсутвуют нужные параметры`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }

    // Если номре телеофна не соответвует формату. В номере телефона присутвует строковй символ
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "telephoneNumber": '79611835081Ф',
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'ERR',
                "description": "TelephoneNumber is not format",
                "responseCode": "0001002",
            }
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда присутсвует строка в номоре`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }

    // Если номре телеофна не соответвует формату --- слишком короткий
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "telephoneNumber": '7961111111',
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'ERR',
                "description": "TelephoneNumber is not format",
                "responseCode": "0001002",
            }
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае если он очень короткий`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }

    // Если номре телеофна не соответвует формату --- слишком длинный
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "telephoneNumber": '7961111111111111111',
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'ERR',
                "description": "TelephoneNumber is not format",
                "responseCode": "0001002",
            }
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае если он слишком длинный`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }

    // Если все хорошо для запроса СМС по верификации телофоана
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "telephoneNumber": telephoneNumber,
            "serialNumberOfPhone": telephoneSerialNumber
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'OK',
                "description": "SMS is sent",
                "responseCode": "0010000",
            }
            const alterAPI = {
                "result": 'ERR',
                "description": "This phone number is already registered in the process of registering other requests",
                "responseCode": "0011002",
            }
            const alterAPI2 = {
                "result": 'ERR',
                "description": "For this telephone number the SMS request has already been made",
                "responseCode": "0011001",
            }
            console.log((API.responseCode == responseCode || alterAPI.responseCode == responseCode || alterAPI2.responseCode == responseCode), startOfComment, description)
            if (alterAPI.responseCode == responseCode) console.warn('Данный телефонный номер уже был зарегестрирован "вклинивавшимся" запросом')
            if (alterAPI2.responseCode == responseCode) console.warn('Данный номер телефона УЖЕ БЫЛ зарегестрирован штатным образом')
            return [(API.responseCode == responseCode || alterAPI.responseCode == responseCode || alterAPI2.responseCode == responseCode), `${startOfMessage} неправильный формат возврата когда все хорошо`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }

    // Если для данного телефонного номера уже был сделан запрос смс-ки подтреждения. Данный тест должен идти после удачного теста когда все хорошо.
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "telephoneNumber": telephoneNumber,
            "serialNumberOfPhone": '9999'
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'OK',
                "description": "SMS is sent",
                "responseCode": "0010000",
            }
            const alterAPI = {
                "result": 'ERR',
                "description": "This phone number is already registered in the process of registering other requests",
                "responseCode": "0011002",
            }
            const alterAPI2 = {
                "result": 'ERR',
                "description": "For this telephone number the SMS request has already been made",
                "responseCode": "0011001",
            }
            console.log((API.responseCode == responseCode || alterAPI.responseCode == responseCode || alterAPI2.responseCode == responseCode), startOfComment, description)
            if (API.responseCode == responseCode) console.warn('Данный телефонный номер был зарегистрирован этим запросом')
            if (alterAPI.responseCode == responseCode) console.warn('Данный телефонный номер УЖЕ БЫЛ зарегестрирован "вклинивавшимся" запросом')
            return [(API.responseCode == responseCode || alterAPI.responseCode == responseCode || alterAPI2.responseCode == responseCode), `${startOfMessage} неправильный формат когда есть повторная отправка смс`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }

    // Если для данного телефонного номера уже был сделан запрос смс-ки подтреждения. Данный тест должен идти после удачного теста когда все хорошо.
    , {
        uri: getSMSCodeForRegistrationByTelephone
        , body: {
            "telephoneNumber": telephoneNumber,
            "serialNumberOfPhone": '8888'
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'OK',
                "description": "SMS is sent",
                "responseCode": "0010000",
            }
            const alterAPI = {
                "result": 'ERR',
                "description": "This phone number is already registered in the process of registering other requests",
                "responseCode": "0011002",
            }
            const alterAPI2 = {
                "result": 'ERR',
                "description": "For this telephone number the SMS request has already been made",
                "responseCode": "0011001",
            }
            console.log((API.responseCode == responseCode || alterAPI.responseCode == responseCode || alterAPI2.responseCode == responseCode), startOfComment, description)
            if (API.responseCode == responseCode) console.warn('Данный телефонный номер был зарегистрирован этим запросом')
            if (alterAPI.responseCode == responseCode) console.warn('Данный телефонный номер УЖЕ БЫЛ зарегестрирован "вклинивавшимся" запросом')
            return [(API.responseCode == responseCode || alterAPI.responseCode == responseCode || alterAPI2.responseCode == responseCode), `${startOfMessage} неправильный формат когда есть повторная отправка смс`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }
]

const checkTokenUri = `/api/checkToken`

globalObj.checkTokenTest = [
    // // если все хорошо
    // {
    //     uri: checkTokenUri,
    //     body: {
    //         'accessToken': accessToken
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'OK',
    //             "description": "Token is try",
    //             "responseCode": "0030000",
    //             'userName': 'some name'
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage} все хорошо`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // в запросе отсутствует параметер токен
    // {
    //     uri: checkTokenUri,
    //     body: {
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "the request JSON structure does not match URL",
    //             "responseCode": "0001000"
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage} все хорошо`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // в запросе параметер body идет со значением null
    // {
    //     uri: checkTokenUri,
    //     body: null
    //     , firstThenFun: function (response) {
    //         const { status } = response
    //         console.log(status == 500, startOfComment, `The response is ${status}`)
    //         return [
    //             status == 500, `The response is ${status}.`
    //         ]
    //     }
    //     , secondThenFun: mockFunction
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // в запросе параметере body вообще отсутвует
    // {
    //     uri: checkTokenUri
    //     , firstThenFun: function (response) {
    //         const { status } = response
    //         console.log(status == 500, startOfComment, `The response is ${status}`)
    //         return [
    //             status == 500, `The response is ${status}.`
    //         ]
    //     }
    //     , secondThenFun: mockFunction
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // в запросе присутсвует левый токен
    // {
    //     uri: checkTokenUri,
    //     body: {
    //         'accessToken': 'lkjlkjlkjlkjlkjlkjlkj' // это левый токен
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "Token is wrong",
    //             "responseCode": "0001001",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage} неверный токен`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

]

const getTokensUri = '/api/getTokens'
const userName = 'Вася Пупкин'

globalObj.getTokensTest = [
    // в запросе не хватает параметра с номером телефона
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "smsCode": smsCode,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "the request JSON structure does not match URL",
    //             "responseCode": "0001000"
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' в запросе не хватает параметра с номером телефона')
    //         return [(API.responseCode == responseCode), `${startOfMessage}в JSON отсутвует параметер с номером телефона`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // в запросе отсутвтует параметер с смс-кодом
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": telephoneNumber,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "the request JSON structure does not match URL",
    //             "responseCode": "0001000"
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' в запросе отсутвтует параметер с смс-кодом')
    //         return [(API.responseCode == responseCode), `${startOfMessage}в JSON отсутвует параметер SMScode `]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // в запросе вообще отсутсвуют ожидаемые параметры
    // {
    //     uri: getTokensUri,
    //     body: {

    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "the request JSON structure does not match URL",
    //             "responseCode": "0001000"
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' в запросе вообще отсутсвуют ожидаемые параметры')
    //         return [(API.responseCode == responseCode), `${startOfMessage}в JSON вообще отсутвуют какие-либо параметры`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // в запросе параметере body = null
    // {
    //     uri: getTokensUri,
    //     body: null,
    //     // firstThenFun: mockFunction,
    //     firstThenFun: function (response) {
    //         const { status } = response
    //         console.log(status == 500, startOfComment, `The response is ${status} a должен быть 500`, ' в запросе параметере body = null')
    //         return [
    //             status == 500, `The response is ${status}. It is bad!`
    //         ]
    //     },
    //     secondThenFun: mockFunction,
    //     thirdThenFun: mockFunction,
    //     timeOver: 0
    // },

    // // в запросе отсутсвует body
    // {
    //     uri: getTokensUri,
    //     // firstThenFun: mockFunction,
    //     firstThenFun: function (response) {
    //         const { status } = response
    //         console.log(status == 500, startOfComment, `The response is ${status} a должен быть 500`, ' в запросе отсутствует body')
    //         return [
    //             status == 500, `The response is ${status}. It is bad!`
    //         ]
    //     },
    //     secondThenFun: mockFunction,
    //     thirdThenFun: mockFunction,
    //     timeOver: 0
    // },




    // // неправильны формат номера телефона
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": '7961183508Ф',
    //         "smsCode": smsCode,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "TelephoneNumber is not format",
    //             "responseCode": "0001002",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат телефона, когда длина правильная но есть строка')
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина правильная, но  присутсвует строка в номоре`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // неправильны формат номера телефона
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": '7961183508',
    //         "smsCode": smsCode,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "TelephoneNumber is not format",
    //             "responseCode": "0001002",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат телефонного номера в случае когда длина номера короткая')
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина номера короткая`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // неправильны формат номера телефона
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": '7961183508112345678',
    //         "smsCode": smsCode,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "TelephoneNumber is not format",
    //             "responseCode": "0001002",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат телефонного номера в случае когда длина номера слишком большая')
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина номера слишком большая`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // неправильный размер смс-кода слишком длинный
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": telephoneNumber,
    //         "smsCode": "123456",
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "SMS code is wrong -- длина кода не равна должной",
    //             "responseCode": "0041001"
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат смс-кода -- слишком длинный')
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат смс-кода -- слишком длинный`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // неправильный размер смс-кода слишком короткий
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": telephoneNumber,
    //         "smsCode": "1234",
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "SMS code is wrong -- длина кода не равна должной",
    //             "responseCode": "0041001",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат смс-кода -- слишком короткий')
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат смс-кода -- слишком короткий`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // длина userName слишком большая
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": telephoneNumber,
    //         "smsCode": smsCode,
    //         "userName": "me hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "Username is too long",
    //             "responseCode": "0041002",
    //         }
    //         console.log(responseCode, ' this is responseCode')
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' длина userName слишком большая')
    //         return [(API.responseCode == responseCode), `${startOfMessage}  длина userName слишком большая`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // указан неправильный телефон, его нет в базе телефонов
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": '79611835082', // 
    //         "smsCode": smsCode,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "telephoneNumber is not registration",
    //             "responseCode": "0041000",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' такого телефона нет в базе')
    //         return [(API.responseCode == responseCode), `${startOfMessage}  такого телефона нет в базе`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // для данного номера телефона никакой смс-ки нет в базе. Скорее всего это произошло, потому что прострочена отправка
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": telephoneNumber, // 
    //         "smsCode": smsCode,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "SMS code is wrong",
    //             "responseCode": "0041001",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' в базе отсутствуе телефон для такой смс')
    //         return [(API.responseCode == responseCode), `${startOfMessage}  в базе отсутствуе телефон для такой смс`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // это левая смс-ка
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": telephoneNumber,
    //         "smsCode": '12345',
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'ERR',
    //             "description": "SMS code is wrong",
    //             "responseCode": "0041001",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description, ' в базе отсутствуе такой код смс')
    //         return [(API.responseCode == responseCode), `${startOfMessage}  в базе отсутствуе такой код смс`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // эпто правильное все
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": telephoneNumber,
    //         "smsCode": smsCode,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'OK',
    //             "description": "Tokens are get",
    //             "responseCode": "0040000",
    //         }
    //         console.log(API.responseCode, ' -- apt ', responseCode, ' -- ответ')
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage}  это все правильное`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // при повоторной попытке регистрации такого хозяина должно быть вот это сообщение
    // {
    //     uri: getTokensUri,
    //     body: {
    //         "telephoneNumber": telephoneNumber,
    //         "smsCode": smsCode,
    //         "userName": userName
    //     }
    //     , firstThenFun: mockFunction
    //     , secondThenFun: (commits) => {
    //         const { result, description, responseCode } = commits
    //         const API = {
    //             "result": 'OK',
    //             "description": "Tokens are get",
    //             "responseCode": "0040000",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage}  это все правильное`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // }

]

let getTestingUri = '/getTesting'
globalObj.getTesting = []

function sendReq(arr) {
    arr.forEach(element => {
        const { uri, body, firstThenFun, secondThenFun, thirdThenFun, timeOver } = element
        toDoPostJSONTest(uri, body, firstThenFun, secondThenFun, thirdThenFun, timeOver)
    });
}
function buttonClick(id, arr) { /* 
    */
    if (typeof (id) !== 'string') return console.error('id is not string')
    const DOMobject = document.getElementById(id)
    if (!DOMobject) return console.error('There is not the button')
    const isArr = x => typeof arr === 'object' && typeof arr?.length === 'number'
    
    DOMobject.addEventListener('click', (evt) => {
        if (arr) {
            if (!isArr(arr)) return console.error('buttonClick second argument is not array')
            for (let elem of arr) {
                if (typeof elem.fun !== 'function') return console.error('in the second element object the fun is not function')
                if (!isArr(elem.params)) return console.error('in the second element object the parameters array is not array')
            }
            arr.forEach(elem => {
                elem.fun()
            })
        }
        sendReq(globalObj[DOMobject.dataset.testset])
    })
}
window.addEventListener('load', () => {
    buttonClick('getSMSserviceSMSErrTest')
    buttonClick('getSMSRealErrTest')
    buttonClick('getSMSTest')
    buttonClick('ownerRegistrationOldSMSTest')
    buttonClick('ownerRegistrationTest')
    buttonClick('checkTokenTest', [{
        fun() {
            let accessToken = document.getElementById(this.inputId).value
            this.globalObj.checkTokenTest.push(
                // если все хорошо
                {
                    uri: checkTokenUri,
                    body: {
                        'accessToken': accessToken
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'OK',
                            "description": "Token is try",
                            "responseCode": "0030000",
                            'userName': 'some name'
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description)
                        return [(API.responseCode == responseCode), `${startOfMessage} все хорошо`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
                // в запросе отсутствует параметер токен
                {
                    uri: checkTokenUri,
                    body: {
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "the request JSON structure does not match URL",
                            "responseCode": "0001000"
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description)
                        return [(API.responseCode == responseCode), `${startOfMessage} все хорошо`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
                // в запросе параметер body идет со значением null
                {
                    uri: checkTokenUri,
                    body: null
                    , firstThenFun: function (response) {
                        const { status } = response
                        console.log(status == 500, startOfComment, `The response is ${status}`)
                        return [
                            status == 500, `The response is ${status}.`
                        ]
                    }
                    , secondThenFun: mockFunction
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
                // в запросе параметере body вообще отсутвует
                {
                    uri: checkTokenUri
                    , firstThenFun: function (response) {
                        const { status } = response
                        console.log(status == 500, startOfComment, `The response is ${status}`)
                        return [
                            status == 500, `The response is ${status}.`
                        ]
                    }
                    , secondThenFun: mockFunction
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // в запросе присутсвует левый токен
                {
                    uri: checkTokenUri,
                    body: {
                        'accessToken': 'lkjlkjlkjlkjlkjlkjlkj' // это левый токен
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "Token is wrong",
                            "responseCode": "0001001",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description)
                        return [(API.responseCode == responseCode), `${startOfMessage} неверный токен`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
            )
        },
        inputId: 'putOnToken',
        globalObj
    }
])
    buttonClick('getTokensTest', [{
        fun() {
            let smsCode = document.getElementById(this.inputId).value
            this.globalObj.getTokensTest.push(
                // в запросе не хватает параметра с номером телефона
                {
                    uri: getTokensUri,
                    body: {
                        "smsCode": smsCode,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "the request JSON structure does not match URL",
                            "responseCode": "0001000"
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' в запросе не хватает параметра с номером телефона')
                        return [(API.responseCode == responseCode), `${startOfMessage}в JSON отсутвует параметер с номером телефона`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
                // в запросе отсутвтует параметер с смс-кодом
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": telephoneNumber,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "the request JSON structure does not match URL",
                            "responseCode": "0001000"
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' в запросе отсутвтует параметер с смс-кодом')
                        return [(API.responseCode == responseCode), `${startOfMessage}в JSON отсутвует параметер SMScode `]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
                // в запросе вообще отсутсвуют ожидаемые параметры
                {
                    uri: getTokensUri,
                    body: {
            
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "the request JSON structure does not match URL",
                            "responseCode": "0001000"
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' в запросе вообще отсутсвуют ожидаемые параметры')
                        return [(API.responseCode == responseCode), `${startOfMessage}в JSON вообще отсутвуют какие-либо параметры`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
                // в запросе параметере body = null
                {
                    uri: getTokensUri,
                    body: null,
                    // firstThenFun: mockFunction,
                    firstThenFun: function (response) {
                        const { status } = response
                        console.log(status == 500, startOfComment, `The response is ${status} a должен быть 500`, ' в запросе параметере body = null')
                        return [
                            status == 500, `The response is ${status}. It is bad!`
                        ]
                    },
                    secondThenFun: mockFunction,
                    thirdThenFun: mockFunction,
                    timeOver: 0
                },
            
                // в запросе отсутсвует body
                {
                    uri: getTokensUri,
                    // firstThenFun: mockFunction,
                    firstThenFun: function (response) {
                        const { status } = response
                        console.log(status == 500, startOfComment, `The response is ${status} a должен быть 500`, ' в запросе отсутствует body')
                        return [
                            status == 500, `The response is ${status}. It is bad!`
                        ]
                    },
                    secondThenFun: mockFunction,
                    thirdThenFun: mockFunction,
                    timeOver: 0
                },
            
            
            
            
                // неправильны формат номера телефона
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": '7961183508Ф',
                        "smsCode": smsCode,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "TelephoneNumber is not format",
                            "responseCode": "0001002",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат телефона, когда длина правильная но есть строка')
                        return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина правильная, но  присутсвует строка в номоре`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
                // неправильны формат номера телефона
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": '7961183508',
                        "smsCode": smsCode,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "TelephoneNumber is not format",
                            "responseCode": "0001002",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат телефонного номера в случае когда длина номера короткая')
                        return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина номера короткая`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // неправильны формат номера телефона
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": '7961183508112345678',
                        "smsCode": smsCode,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "TelephoneNumber is not format",
                            "responseCode": "0001002",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат телефонного номера в случае когда длина номера слишком большая')
                        return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина номера слишком большая`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // неправильный размер смс-кода слишком длинный
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": telephoneNumber,
                        "smsCode": "123456",
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "SMS code is wrong -- длина кода не равна должной",
                            "responseCode": "0041001"
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат смс-кода -- слишком длинный')
                        return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат смс-кода -- слишком длинный`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // неправильный размер смс-кода слишком короткий
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": telephoneNumber,
                        "smsCode": "1234",
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "SMS code is wrong -- длина кода не равна должной",
                            "responseCode": "0041001",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' неправильный формат смс-кода -- слишком короткий')
                        return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат смс-кода -- слишком короткий`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // длина userName слишком большая
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": telephoneNumber,
                        "smsCode": smsCode,
                        "userName": "me hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "Username is too long",
                            "responseCode": "0041002",
                        }
                        console.log(responseCode, ' this is responseCode')
                        console.log((API.responseCode == responseCode), startOfComment, description, ' длина userName слишком большая')
                        return [(API.responseCode == responseCode), `${startOfMessage}  длина userName слишком большая`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // указан неправильный телефон, его нет в базе телефонов
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": '79611835082', // 
                        "smsCode": smsCode,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "telephoneNumber is not registration",
                            "responseCode": "0041000",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' такого телефона нет в базе')
                        return [(API.responseCode == responseCode), `${startOfMessage}  такого телефона нет в базе`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // для данного номера телефона никакой смс-ки нет в базе. Скорее всего это произошло, потому что прострочена отправка
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": telephoneNumber, // 
                        "smsCode": smsCode,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "SMS code is wrong",
                            "responseCode": "0041001",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' в базе отсутствуе телефон для такой смс')
                        return [(API.responseCode == responseCode), `${startOfMessage}  в базе отсутствуе телефон для такой смс`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // это левая смс-ка
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": telephoneNumber,
                        "smsCode": '12345',
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'ERR',
                            "description": "SMS code is wrong",
                            "responseCode": "0041001",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description, ' в базе отсутствуе такой код смс')
                        return [(API.responseCode == responseCode), `${startOfMessage}  в базе отсутствуе такой код смс`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
            
                // эпто правильное все
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": telephoneNumber,
                        "smsCode": smsCode,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'OK',
                            "description": "Tokens are get",
                            "responseCode": "0040000",
                        }
                        console.log(API.responseCode, ' -- apt ', responseCode, ' -- ответ')
                        console.log((API.responseCode == responseCode), startOfComment, description)
                        return [(API.responseCode == responseCode), `${startOfMessage}  это все правильное`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                },
                // при повоторной попытке регистрации такого хозяина должно быть вот это сообщение
                {
                    uri: getTokensUri,
                    body: {
                        "telephoneNumber": telephoneNumber,
                        "smsCode": smsCode,
                        "userName": userName
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { result, description, responseCode } = commits
                        const API = {
                            "result": 'OK',
                            "description": "Tokens are get",
                            "responseCode": "0040000",
                        }
                        console.log((API.responseCode == responseCode), startOfComment, description)
                        return [(API.responseCode == responseCode), `${startOfMessage}  это все правильное`]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                }
            
            )
        },
        inputId: 'gettokensmscode',
        globalObj
    }
        
    ])

    buttonClick("getTesting", [
        {
            fun(){
                let input = document.getElementById(this.inputId).value
                this.globalObj.getTesting.push({ // когда был push то все работало
                    uri: getTestingUri,
                    body: {
                        input
                    }
                    , firstThenFun: mockFunction
                    , secondThenFun: (commits) => {
                        const { input } = commits
                        
                        console.log(input, ' this is input')
                        return [1]
                    }
                    , thirdThenFun: mockFunction
                    , timeOver: 0
                })
            }, 
            inputId: 'putDataTesting',
            globalObj
        }
    ])



})

/*
USE carEquipmentClientSideCrutch;
select * from users;
select * from telephones;
select * from smscodes;
delete from smscodes;
delete from telephones;
delete from emails;
delete from connections;
delete from owners;
delete from users;
*/

// пишу адрес странички чтобы удобней было копировать https://localhost/tests
