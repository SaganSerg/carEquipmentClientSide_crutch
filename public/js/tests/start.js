// The fun argument must return an array with two elements. The first element must be an expression that evaluates to a boolean value, and the second element must be a comment for the expression to be false.


/* 
this is Response It is the get argument in a first "Then"
​
Response { type: "basic", url: "http://localhost:3000/api/getSMSCodeForRegistrationByTelephone", redirected: false, status: 200, ok: true, statusText: "OK", headers: Headers(7), body: ReadableStream, bodyUsed: false }
​
body: ReadableStream { locked: false }
 ​
locked: false
 ​
<prototype>: ReadableStreamPrototype { cancel: cancel(), getReader: getReader(), pipeThrough: pipeThrough(), … }
​
bodyUsed: false
​
headers: Headers(7) { connection → "keep-alive", "content-length" → "103", "content-type" → "application/json; charset=utf-8", … }
 ​
<entries> they are headers.
	​
connection: "keep-alive"
	​
"content-length": "103"
	​
"content-type": "application/json; charset=utf-8"
	​
date: "Wed, 30 Oct 2024 14:37:39 GMT"
	​
etag: 'W/"67-IB4Un/gL7Aizk0XY8/zCEGv9zTk"'
	​
"keep-alive": "timeout=5"
	​
"x-powered-by": "Express"
 ​
<prototype>: HeadersPrototype { append: append(), delete: delete(), get: get(), … }
​
ok: true
​
redirected: false
​
status: 200
​
statusText: "OK"
​
type: "basic"
​
url: "http://localhost:3000/api/getSMSCodeForRegistrationByTelephone"
*/

/* 
если мы извлекли его .json() в первом then
во втором then будет уже объект { result: "ERR", description: "the request JSON structure does not match URL", responseCode: "0001000" }
*/
function toDoPostJSONTest(uri, body, firstThenFun, secondThenFun, thirdThenFun, timeOver) {
	if (typeof body !== "object") return console.error('The body argument is not object')
	if (typeof uri !== 'string') return console.error('Uri is not string')
	if (typeof firstThenFun !== 'function') return console.error('firstThenFun is not function')
	if (typeof secondThenFun !== 'function') return console.error('secondThenFun is not function')
	if (typeof thirdThenFun !== 'function') return console.error('thirdThenFun is not function')
	body = JSON.stringify(body)
	// const url = `http://localhost:3000${uri}`
	const url = `https://localhost${uri}`

	fetch(url, {
		method: 'POST',
		headers: new Headers(
			{
				'Content-Type': 'application/json'
			}
		),
		body
	})
		.then(response => {
			console.assert(...firstThenFun(response))
			return response.json()
		})
		.then(commits => {
			// setTimeout(() => {
			//     if (!commits) {
			//         throw [false, 'Timeout expired. Server not responding.']
			//     }
			// }, timeOver)
			console.assert(...secondThenFun(commits))
			return commits
		})
		.catch(err => {
			console.error('sagan something went wrong', err)
		})
}
const fakeSituationAssert = [true, 'This is a comment on a fake situation. ']
const mockFunction = () => fakeSituationAssert
const startOfMessage = 'Неправильно обрабатывается ситуация, когда '
const smsCode = '41618' // это пока фейковый код, для теста нужно изменить срок ожидания кода и подставить сюда правильный 
const telephoneNumber = '79611835081'
const telephoneSerialNumber = '1234'
const globalObj = {}
const startOfComment = 'Это комментарий '
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImNvbm5lY3Rpb25JZCI6MywiaWF0IjoxNzMwOTEyMTcwLCJleHAiOjE3MzM1MDQxNzB9.BUeCE8ga1_dJPgUlpXobVzvn8yfXeFVdV4VJSfEcUu0'// 6 ноября 19-58
// "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImNvbm5lY3Rpb25JZCI6MywiaWF0IjoxNzMwOTEyMTcwLCJleHAiOjE3MzM1MDQxNzB9.BUeCE8ga1_dJPgUlpXobVzvn8yfXeFVdV4VJSfEcUu0",
// "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImNvbm5lY3Rpb25JZCI6MywiaWF0IjoxNzMwOTEyMTcwLCJleHAiOjE3Mzg2ODgxNzB9.KjLA1n2FTHx7GhdIEX-y8Vax4vsfxXbTZfNNlcmhK_A"