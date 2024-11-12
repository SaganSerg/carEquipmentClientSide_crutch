function sendReq(arr) {
	arr.forEach(element => {
		const { uri, body, firstThenFun, secondThenFun, thirdThenFun, timeOver } = element
		toDoPostJSONTest(uri, body, firstThenFun, secondThenFun, thirdThenFun, timeOver)
	});
}
function buttonClick(id) {
	if (typeof (id) !== 'string') return console.error('id is not stirng')
	const DOMobject = document.getElementById(id)
	if (!DOMobject) return console.error('There is not the button')
	DOMobject.addEventListener('click', (evt) => {
		sendReq(globalObj[DOMobject.dataset.testset])
		
	})
}
window.addEventListener('load', () => {
	// buttonClick('TestsForGetSMSCodeForRegistrationByTelephoneOfRealErr')
    buttonClick('getSMSserviceSMSErrTest')
	buttonClick('getSMSRealErrTest')
	buttonClick('getSMSTest')
	buttonClick('ownerRegistrationOldSMSTest')
	buttonClick('ownerRegistrationTest')
	buttonClick('checkTokenTest')
	buttonClick('getTokensTest')
    
})

/* 
USE carEquipmentClientSideCrutch;
select * from users;
select * from telephones;
select * from smscodes;
delete from smscodes;
delete from telephones;
delete from emails;
delete from connections;
delete from owners;
delete from users;
*/

// пишу адрес странички чтобы удобней было копировать https://localhost/tests
