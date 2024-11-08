globalObj.getSMSserviceSMSErrTest = [
	// Если в работе с сервисом отправки СМС, что-то пошло не так
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