globalObj.getSMSRealErrTest = [
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
			const { result, discription, responseCode } = commits
			const API = {
				"result": 'ERR',
				"discription": "Something went wrong",
				"responseCode": "0001003",
			}
            console.log((API.responseCode == responseCode), startOfComment, discription)
			return [(API.responseCode == responseCode), `${startOfMessage}Something went wrong`]
		}
		, thirdThenFun: mockFunction
		, timeOver: 0
	}
]