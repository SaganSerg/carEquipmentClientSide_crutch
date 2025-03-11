const db = require('./../db')
const { SmsAero, SmsAeroError, SmsAeroHTTPError } = require('smsaero')
const getFunAddTextComment = require('./commonFunctions').getFunAddTextComment

const {
    loginForSMS,
    keyForSMS,
    deleteSmsTime,
    smsCodeNumberOfCharacters
} = require('./../config')

module.exports = {
    generator: (req, res, next, telephoneId, telephoneNumber, app) => {
        const addTextComment = getFunAddTextComment(app)
        const telephoneSerialNumber = req.body?.serialNumberOfPhone ?? 'unknown'
        // const smsCode = Number(String(Math.floor(Math.random() * 9)) + String(Math.floor(Math.random() * 9999)))
        const smsCode = ((x) => {
            let smsCode = ''
            for (let i = 1; i <= x; i++) {
                smsCode += String(Math.floor(Math.random() * 9))
            }
            return smsCode
        })(smsCodeNumberOfCharacters)
        db.run('INSERT INTO smscodes (smscode_value, smscode_telephoneSerialNumber, telephone_id) VALUE (?, ?, ?)', [smsCode, telephoneSerialNumber, telephoneId], (err, insertSmscodesRows) => {
            /* проверка err?.code === "ER_DUP_ENTRY" нужна для того, чтобы исключить создание мусорных user-ов, в случае, когда во время одного запроса к БД, другой запрос успел создать учетную записи. Такое возможно в асинхронном коде  */
            if (err?.code === "ER_DUP_ENTRY") {
                return res.status(200).json({
                    "result": 'ERR',
                    "description": `For this telephone number the SMS request has already been made -- ${addTextComment('ошибка БД where ER_DUP_ENTRY INSERT INTO smscodes (smscode_value, smscode_telephoneSerialNumber, telephone_id) VALUE (?, ?, ?)')}`,
                    "responseCode": "0011001",
                })
            }
            if (err) return res.status(200).json({
                "result": 'ERR',
                "description": `Something went wrong${addTextComment('ошибка БД INSERT INTO smscodes (smscode_value, smscode_telephoneSerialNumber, telephone_id) VALUE (?, ?, ?)')}`,
                "responseCode": "0001003",
            })
            setTimeout((telephoneId) => {
                db.run("DELETE FROM smscodes WHERE telephone_id = ?", [telephoneId])
            }, deleteSmsTime, telephoneId)
            const client = new SmsAero(loginForSMS, keyForSMS)
            client.send(telephoneNumber, `Код подтверждения --- ${smsCode}`)
                .then(response => {
                    if (app.get('env') === 'test') throw Error('Testing! That`s how it should be.') // это нужно только тестирования
                    res.status(200).json({
                        "result": 'OK',
                        "description": "SMS is sent",
                        "responseCode": "0010000",
                    })
                })
                .catch(error => {
                    console.error(error)
                    res.status(200).json({
                        "result": 'ERR',
                        "description": "SMS in not sent. Something went wrong",
                        "responseCode": "0011000",
                    })
                })
        })

    }

}