// в таблице с смс-ками отсутсвует такой номер телефона
globalObj.ownerRegistrationOldSMSTest = [{
    uri: telephonOwnerRegistrationUri,
    body: {
        "telephoneNumber": telephoneNumber, 
        "SMSСode": '12345',  // надо будет подставить ПРАВИЛЬНУЮ НО ПРОСРОЧЕННУУЮ СМС
        "userName": userName
    }, 
    firstThenFun: mockFunction, 
    secondThenFun: (commits) => {
        const { result, discription, responseCode } = commits
        const API = {
            "result": 'ERR',
            "discription": "SMS code is wrong",
            "responseCode": "0021001",
        }
        console.log((API.responseCode == responseCode), startOfComment, discription)
        return [(API.responseCode == responseCode), `${startOfMessage}  в базе отсутствуе телефон для такой смс`]
    }, 
    thirdThenFun: mockFunction, 
    timeOver: 0
}]