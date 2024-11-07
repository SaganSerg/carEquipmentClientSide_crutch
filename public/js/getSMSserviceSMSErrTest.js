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
			const { result, discription, responseCode } = commits
			const API = {
				"result": 'ERR',
				"discription": "SMS in not sent. Something went wrong",
				"responseCode": "0011000",
			}
            console.log((API.responseCode == responseCode), startOfComment, discription)
			return [(API.responseCode == responseCode), `${startOfMessage} неправильный формат ответа когда есть повторная отправка смс`]
		}
		, thirdThenFun: mockFunction
		, timeOver: 0
	}
]