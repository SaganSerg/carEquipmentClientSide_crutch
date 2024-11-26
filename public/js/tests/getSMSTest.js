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
