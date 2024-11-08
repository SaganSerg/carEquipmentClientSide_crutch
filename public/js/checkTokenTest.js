globalObj.checkTokenTest = [
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

]