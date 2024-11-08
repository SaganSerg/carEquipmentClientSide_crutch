
globalObj.ownerRegistrationTest = [
    //     // в запросе не хватает параметра с номером телефона
    //     {
    //         uri: telephonOwnerRegistrationUri,
    //         body: {
    //             "smsCode": smsCode,
    //             "userName": userName
    //         }
    //         , firstThenFun: mockFunction
    //         , secondThenFun: (commits) => {
    //             const { result, description, responseCode } = commits
    //             const API = {
    //                 "result": 'ERR',
    //                 "description": "the request JSON structure does not match URL",
    //                 "responseCode": "0001000"
    //             }
    //             console.log((API.responseCode == responseCode), startOfComment, description)
    //             return [(API.responseCode == responseCode), `${startOfMessage}в JSON отсутвует параметер с номером телефона`]
    //         }
    //         , thirdThenFun: mockFunction
    //         , timeOver: 0
    //     },
    //     // в запросе отсутвтует параметер с смс-кодом
    //     {
    //         uri: telephonOwnerRegistrationUri,
    //         body: {
    //             "telephoneNumber": telephoneNumber,
    //             "userName": userName
    //         }
    //         , firstThenFun: mockFunction
    //         , secondThenFun: (commits) => {
    //             const { result, description, responseCode } = commits
    //             const API = {
    //                 "result": 'ERR',
    //                 "description": "the request JSON structure does not match URL",
    //                 "responseCode": "0001000"
    //             }
    //             console.log((API.responseCode == responseCode), startOfComment, description)
    //             return [(API.responseCode == responseCode), `${startOfMessage}в JSON отсутвует параметер SMScode `]
    //         }
    //         , thirdThenFun: mockFunction
    //         , timeOver: 0
    //     },
    //     // в запросе вообще отсутсвуют ожидаемые параметры
    //     {
    //         uri: telephonOwnerRegistrationUri,
    //         body: {

    //         }
    //         , firstThenFun: mockFunction
    //         , secondThenFun: (commits) => {
    //             const { result, description, responseCode } = commits
    //             const API = {
    //                 "result": 'ERR',
    //                 "description": "the request JSON structure does not match URL",
    //                 "responseCode": "0001000"
    //             }
    //             console.log((API.responseCode == responseCode), startOfComment, description)
    //             return [(API.responseCode == responseCode), `${startOfMessage}в JSON вообще отсутвуют какие-либо параметры`]
    //         }
    //         , thirdThenFun: mockFunction
    //         , timeOver: 0
    //     },
    //     // в запросе параметере body = null
    //     {
    //         uri: telephonOwnerRegistrationUri,
    //         body: null,
    //         // firstThenFun: mockFunction,
    //         firstThenFun: function (response) {
    // 			const { status } = response
    //             console.log(status == 500, startOfComment, `The response is ${status}`)
    // 			return [
    // 				status == 500, `The response is ${status}. It is bad!`
    // 			]
    // 		},
    //         secondThenFun: mockFunction,
    //         thirdThenFun: mockFunction,
    //         timeOver: 0
    //     },




    // // неправильны формат номера телефона
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина правильная, но  присутсвует строка в номоре`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },
    // // неправильны формат номера телефона
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина номера короткая`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // неправильны формат номера телефона
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат телефонного номера в случае когда длина номера слишком большая`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // неправильный размер смс-кода слишком длинный
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //     "description": "SMS code is wrong -- длина кода не равна должной",
    //     "responseCode": "0021001"
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат смс-кода -- слишком длинный`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // неправильный размер смс-кода слишком короткий
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //     "description": "SMS code is wrong -- длина кода не равна должной",
    //     "responseCode": "0021001",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат смс-кода -- слишком короткий`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // длина userName слишком большая
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //             "responseCode": "0021002",
    //         }
    //         console.log(responseCode, ' this is responseCode')
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage}  длина userName слишком большая`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // указан неправильный телефон, его нет в базе телефонов
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //         "description": "telephoneNumber is not registration",
    //         "responseCode": "0021000",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage}  такого телефона нет в базе`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // для данного номера телефона никакой смс-ки нет в базе. Скорее всего это произошло, потому что прострочена отправка
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //             "responseCode": "0021001",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage}  в базе отсутствуе телефон для такой смс`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // // это левая смс-ка
    // {
    //     uri: telephonOwnerRegistrationUri,
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
    //             "responseCode": "0021001",
    //         }
    //         console.log((API.responseCode == responseCode), startOfComment, description)
    //         return [(API.responseCode == responseCode), `${startOfMessage}  в базе отсутствуе такой код смс`]
    //     }
    //     , thirdThenFun: mockFunction
    //     , timeOver: 0
    // },

    // эпто правильное все
    {
        uri: telephonOwnerRegistrationUri,
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
                "description": "Owner is registered by telephone",
                "responseCode": "0020000",
            }
            console.log(API.responseCode, ' -- apt ', responseCode, ' -- ответ' )
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage}  это все правильное`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    },
    // при повоторной попытке регистрации такого хозяина должно быть вот это сообщение
    {
        uri: telephonOwnerRegistrationUri,
        body: {
            "telephoneNumber": telephoneNumber,
            "smsCode": smsCode, // это левая смс-ка, в базе ее быть не должно
            "userName": userName
        }
        , firstThenFun: mockFunction
        , secondThenFun: (commits) => {
            const { result, description, responseCode } = commits
            const API = {
                "result": 'ERR',
                "description": "the owner was already registered",
                "responseCode": "0021002",
            }
            console.log((API.responseCode == responseCode), startOfComment, description)
            return [(API.responseCode == responseCode), `${startOfMessage}  это все правильное`]
        }
        , thirdThenFun: mockFunction
        , timeOver: 0
    }
    
]