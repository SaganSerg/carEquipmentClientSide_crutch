const oneHour = 60 * 60 // в секундах
const oneMinutesMMSecond = 60 * 1000 // в миллисекундах
const oneHourMMSecond = oneHour * 1000 // в миллисекундах
const oneDaySecond = oneHour * 24 // в секундах
const oneDayMMSecond = oneDaySecond * 1000 // в миллисекундах
const deleteSmsTime = oneMinutesMMSecond * 2 // данные по смс-ке удаляются через 3 минуты

module.exports = { 
    credentials: require(`./.credentials.${process.env.NODE_ENV || 'development'}`)
    // это БД с данными
    , host: '127.0.0.1'
    , user: 'adm_carEquipmentClientSideCrutch' // adm_carEquipmentClientSideCrutch
    , password: 'Vagon_3611' // Vagon_3611
    , database: 'carEquipmentClientSideCrutch' //carEquipmentClientSideCrutch
    // это БД с сессиями
    , sessionHost: '127.0.0.1'
    , sessionUser: 'admin_sessions' // admin_sessions
    , sessionPassword: 'Vagon_3611'
    , sessionDatabase: 'sessions' // sessions
    , longTokenExpire: oneDaySecond * 90 // 90 дней
    , tokenExpire: oneDaySecond * 30 // 30 дней
    , emailTokenExpire: oneDaySecond * 3 // 3 дня
    , domen: 'localhost'
    , yourEmail: 'sagan.sergei.mih@yandex.ru' // здесь должен быть реальный адрес с которого делается отправка, 
    , httpProtocol: 'http'
    , sessionCookiesExpirationMM: oneDayMMSecond * 1  // 1 день
    //, cleanConnectionsTime: oneDayMMSecond * 1 // 1 day
    , cleanConnectionsTime: oneMinutesMMSecond * 2 // 
    
    // отправка почты
    , smtpKey: 'wgsfizmubelvmdly' // это ключ для сервера отправки почты в данном случае на яндексе
    , smtpHost: 'smtp.yandex.ru'
    , smtpPort: 465
    , smtpUser: 'sagan.sergei.mih'

    // это строка, которая подставляется, если не известен user-agent
    , unknownUserAgent: 'unknown'

    // отправка СМС
    , loginForSMS: 'websagan@gmail.com'
    , keyForSMS : '69vHPQcZ3dIxagri0rkRsHDlMuB0RCaJ'
    , deleteSmsTime// данные по смс-ке удаляются через 3 минуты
    , smsCodeNumberOfCharacters: 5 // это количество символов в смс коде
    , telephoneNumberMax: 18 // это максимальное количество симоволов в телефоне (нужно для проверки номера телефона)
    , telephoneNumberMin: 11 // это минимальное количество символов в телефоне (нужно для проверки номера телефона)

    , maxLenghtOfUserName: 50
    , cleanSmsCodeTime: deleteSmsTime * 2 // данные в любом случае будут 
}
