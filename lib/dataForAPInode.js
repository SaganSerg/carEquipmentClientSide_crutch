const universalResponses = {
    "result": 'ERR',
    "description": "Something went wrong",
    "responseCode": "0001003",
    "discriptionRus": "Что-то пошло не так"
}
const responses = [
    {
        "result": 'ERR',
        "description": "the request requestJSON structure does not match URL",
        "responseCode": "0001000",
        "discriptionRus": "Структура requestJSON ответа не соответсвует url-у. Т.е. по данному url-у сервер ждет определенный данные в requestJSON, но этих данных в данном requestJSON нет!"
    },
    {
        "result": 'ERR',
        "description": "Token is wrong",
        "responseCode": "0001001",
        "discriptionRus": "Токен ошибочный, либо просроченный."
    },
    {
        "result": 'ERR',
        "description": "TelephoneNumber is not format",
        "responseCode": "0001002",
        "discriptionRus": "Номер телефона не соответсует формату: или слошком длинный, или слишком короткий, или содержит не только цифры"
    },
    universalResponses,
    {
        "result": 'OK',
        "description": "SMS is sent",
        "responseCode": "0010000",
        "discriptionRus": "СМС-ка отправлена"
    },
    {
        "result": 'ERR',
        "description": "SMS in not sent. Something went wrong",
        "responseCode": "0011000",
        "discriptionRus": "СМС-ка не отправлена. Что-то пошло не так. Скорее всего проблема у сервиса отправки СМС"
    },
    {
        "result": 'ERR',
        "description": "For this telephone number the SMS request has already been made",
        "responseCode": "0011001",
        "discriptionRus": "Для данного телефона смс-ка уже отправлена. Скорее всего --- это означает, что не прошел еще временной период в течении которого смс-ку отправлять нельзя"
    },
    {
        "result": 'ERR',
        "description": "This phone number is already registered in the process of registering other requests",
        "responseCode": "0011002",
        "discriptionRus": "Такой номер телефона уже зарегистрирован в рамках другого процесса регистрации. Такое возможно из-за многопоточности"
    },
    {
        "result": 'OK',
        "description": "Owner is registered by telephone",
        "responseCode": "0020000",
        "accessToken": "",
        "refreshToken": "",
        "ownerId": 0,
        "userId": 0,
        "connectedUserAgent": [
            {
                "connectedId": 0,
                "connectedUserAgentName": ""
            }
        ],
        "discriptionRus": "Хозяин зарегестрирован по номеру телефона"
    },
    {
        "result": 'ERR',
        "description": "telephoneNumber is not registration",
        "responseCode": "0021000",
        "discriptionRus": "Если номер телефона не был зарегестрирован в базе. Это значит, что в данном запросе был указан невереный телефон"
    },
    {
        "result": 'ERR',
        "description": "SMS code is wrong",
        "responseCode": "0021001",
        "discriptionRus": "Это значит код не соответсует коду, который был напрален",
    },
    {
        "result": 'ERR',
        "description": "Username is too long",
        "responseCode": "0021002",
        "discriptionRus": "Пришло слишком длинное имя пользователя"
    },
    {
        "result": 'ERR',
        "description": "the owner was already registered",
        "responseCode": "0021003",
        "discriptionRus": "Для данного номера телефона уже был зарегестрировать хозяин"
    },
    {
        "result": "OK",
        "description": "Token is try",
        "responseCode": "0030000",
        "userName": "",
        "discriptionRus": "Токен верный"
    },
    {
        "result": 'OK',
        "description": "Tokens are get",
        "responseCode": "0040000",
        "accessToken": "",
        "refreshToken": "",
        "ownerId": 0,
        "userId": 0,
        "connectedUserAgent": [
            {
                "connectedId": 0,
                "connectedUserAgentName": ""
            }
        ],
        "discriptionRus": "Токен передан"
    },
    {
        "result": 'ERR',
        "description": "telephoneNumber is not registration",
        "responseCode": "0041000",
        "discriptionRus": "Телефонный номер не зарегистрирован. Это значит, что в данном запросе был указан невереный телефон"
    },
    {
        "result": 'ERR',
        "description": "SMS code is wrong",
        "responseCode": "0041001",
        "discriptionRus": "СМС-код неправильный"
    },
    {
        "result": 'ERR',
        "description": "Username is too long",
        "responseCode": "0041002",
        "discriptionRus": "Имя пользователя слишком длинное"
    },
    {
        "result": 'ERR',
        "description": "the owner was already registered",
        "responseCode": "0041003",
        "discriptionRus": "Пользователь был уже зарегестрирован. Такое может быть из-за многопоточности"
    },
];

const commonTroubles = [

    `Если server не работает совсем, то не будет отправлено ничего и нужно будет поставить срок ожидания после которого что-то показать пользователю`,


    `Если server возвратить код ответа начинающийся на 5. Это значит проблемы на сервере. Нужно что-то показать пользователю`,


    `Если server возвратит код ответа 400. Это значит что что в запросе не так. Нужно что-то показать пользователю.`,


    `Если server возвратит код ответа 401. Это значит что пользователь в системе не зарегестрирован. Нужно что-то показать пользователю.`,


    `Если server возвратит код ответа 403. Это значит пользователь системе известен, но не аутентифицирован. Нужно что-то показть пользователю.`,


    `Если server возращает код ответа 404. Это значит что под данному url-у ничего нет. Нужно что-то показать пользователю.`,


    `Если server возвращее код начинающийся с 4. Это значит, что что-то в запросе не так. Нужно что-то показать пользователю.`

];

const userAgentHeader = { name: 'User-Agent', valueDescription: `Название клиента, длиной до 100 символов`, ofObligation: false };

const requests = [
    {
        title: 'Запрос СМС для верификации по телефону',
        method: 'POST',
        uri: '/api/getSMSСodeForRegistrationByTelephone',
        getParameters: [
            { name: 'someParameter', valueDescription: 'какое-то описание'}, // потом удалить
            { name: 'otherSomeParameter', valueDescription: 'какое-то описание'} // потом удалить
        ],
        body: {
            requestJSON: [
                { name: `telephoneNumber`, valueDescription: 'символы цифр в количестве от 11 до 18 включительно', ofObligation: true },
                { name: `serialNumberOfPhone`, valueDescription: 'строка длинной не более 25 символов', ofObligation: false }
            ]
        },
        headers: [
            userAgentHeader
        ],
        stepNumber: '001'
    },
    {
        title: 'Регистрация хозяина (делает хозяин) по телефону. ИСПОЛЬЗОВАТЬСЯ НЕ БУДЕТ',
        method: 'POST',
        uri: '/api/telephoneOwnerRegistration',
        getParameters: [],
        body: {
            requestJSON: [
                { name: `telephoneNumber`, valueDescription: 'символы цифр в количестве от 11 до 18 включительно', ofObligation: true },
                { name: `smsCode`, valueDescription: 'символы цифр в количестве 5', ofObligation: true },
                { name: `userName`, valueDescription: 'символы в количестве не более 50', ofObligation: false }
            ]
        },
        headers: [
            userAgentHeader
        ],
        stepNumber: '002'
    },
    {
        title: 'Проверка токена (тестовый запрос)',
        method: 'POST',
        uri: '/api/checkToken',
        getParameters: [],
        body: {
            requestJSON: [
                { name: `accessToken`, valueDescription: 'token --- символы', ofObligation: true }
            ]
        },
        headers: [
            userAgentHeader
        ],
        stepNumber: '003'
    },
    {
        title: 'Получение  токенов (refreshToken и accessToken)',
        method: 'POST',
        uri: '/api/getTokens',
        getParameters: [],
        body: {
            requestJSON: [
                { name: `telephoneNumber`, valueDescription: 'символы цифр в количестве от 11 до 18 включительно', ofObligation: true },
                { name: `smsCode`, valueDescription: 'символы цифр в количестве 5', ofObligation: true },
                { name: `userName`, valueDescription: 'символы в количестве не более 50', ofObligation: false }
            ]
        },
        headers: [
            userAgentHeader
        ],
        stepNumber: '004'
    },
];
module.exports= {responses,commonTroubles,requests,universalResponses};

