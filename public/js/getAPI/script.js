import { responses, commonTroubles, requests } from './dataForAPIes6.js'

let listOfDouble = []
for (let i = 0; i < responses.length; i++) {
    let responseCodeIsChecking = responses[i].responseCode
    for (let y = i + 1; y < responses.length; y++) {
        let responseCode = responses[y].responseCode
        if (responseCode == responseCodeIsChecking) {
            listOfDouble.push(responseCode)
        }
    }
}
if (listOfDouble.length) console.log(dubleRaw.toString())
if (!listOfDouble.length) {
    function createClass(classValue) {
        let classAttr = document.createAttribute('class')
        classAttr.value = classValue
        return classAttr
    }
    function getResponseHTMLList(elem, ulElement) {
        let stepResponse = document.createElement('li')
        // let classAttr = document.createAttribute('class')
        // classAttr.value = 'listBlock__listElem oneRequest'
        stepResponse.setAttributeNode(createClass('listBlock__listElem oneResponse'))
        let htmlContent = `<p class="oneResponse__description description">Описание: <span class="description__value">${elem.discriptionRus}</span></p>`
        delete elem.discriptionRus
        let requestJSONtoHTML = `<div class="oneResponse__code code"><div class='code__brace'>{</div>`
        for (let e in elem) {
            if (typeof elem[e] === 'string') {
                requestJSONtoHTML += `<div class='code_property'>"${e}" : "${elem[e]}"</div>`
            } else if (typeof elem[e] === 'object') {
                requestJSONtoHTML += `<div class='code_property'>"${e}" : "${JSON.stringify(elem[e])}"</div>`
            }
        }
        requestJSONtoHTML += `<div class='code__brace'>}</div></div>`
        stepResponse.innerHTML = htmlContent + requestJSONtoHTML
        ulElement.appendChild(stepResponse)
    }
    commonTroubles.forEach(element => {
        let li = document.createElement('li')
        // let classAttr = document.createAttribute('class')
        // classAttr.value = 'listBlock__listElem onePoint'
        li.setAttributeNode(createClass('listBlock__listElem onePoint'))
        li.textContent = element
        document.getElementById('commonTroubles').appendChild(li)
    })
    let commonResponsesList = document.getElementById('commonRequest')
    responses.forEach(elem => {
        if (elem.responseCode.slice(0, 3) === '000') {
            getResponseHTMLList(elem, commonResponsesList)
        }
    })
    requests.forEach(element => {
        let oneResponse = document.createElement('li')
        oneResponse.setAttributeNode(createClass('listBlock__listElem oneResponse'))

        let title = document.createElement('h3')
        title.textContent = element.title
        title.setAttributeNode(createClass('oneResponse__title smallTitle'))


        let method = document.createElement('div')
        method.setAttributeNode(createClass('oneResponse__method method'))
        method.innerHTML = `Метод: <span class="method__value">${element.method}</span>`

        let uri = document.createElement('div')
        uri.setAttributeNode(createClass('oneResponse__uri uri'))
        uri.innerHTML = `URI: <span class='uri__value'>${element.uri}</span>`
        let requestListTitle = document.createElement('h4')
        requestListTitle.setAttributeNode(createClass('oneResponse__requestListTitle smallestTitle'))
        let getRequestList = document.createElement('ul')
        getRequestList.setAttributeNode(createClass('oneResponse__requestList requestList'))
        if (element.getParameters.length) {
            requestListTitle.textContent = 'Список get-параметров'
            element.getParameters.forEach(element => {
                let oneParameter = document.createElement('li')
                oneParameter.setAttributeNode(createClass('requestList__oneRarameter oneParameter'))
                oneParameter.innerHTML = `Параметер: <span class="oneParameter__parameterName">${element.name};</span> описание значения: <span class="oneParameter__parameterDescription">${element.valueDescription}</span>`
                getRequestList.appendChild(oneParameter)
            })
        } else {
            requestListTitle.textContent = 'Get-параметры не используются'
        }
        let requestJSONTitle = document.createElement('h4')
        requestJSONTitle.setAttributeNode(createClass('oneResponse__requestJSONTitle smallestTitle'))
        const requestJSON = element.body.requestJSON
        let requestJSONContent = document.createElement('div')
        requestJSONContent.setAttributeNode(createClass('oneResponse__code code'))
        if (requestJSON.length) {
            requestJSONTitle.textContent = 'JSON:'

            let requestJSONString = '<div class="code__brace">{</div>'
            requestJSON.forEach(element => {
                requestJSONString += (`<div class='code_property'>"${element.name}" : "${element.valueDescription}" // ${element.ofObligation ? "обязательный" : "необязательный"}`) + '</div>'
            })
            requestJSONString += '<div class="code__brace">}</div>'
            requestJSONContent.innerHTML = requestJSONString

        } else {
            requestJSONTitle.textContent = 'JSON в теле запроса не используется'
        }
        let headersTitle = document.createElement('h4')
        headersTitle.setAttributeNode(createClass('oneResponse__requestJSONTitle smallestTitle'))
        let headers = document.createElement('ul')
        headers.setAttributeNode(createClass('oneResponse__headersList headersList'))
        if (element.headers) {
            headersTitle.textContent = 'Заголовки'

            element.headers.forEach(element => {
                let headersContent = document.createElement('li')
                headersContent.setAttributeNode(createClass('headersList__oneheader'))
                headersContent.textContent = `Имя заголовка: ${element.name}, описание заголовка: ${element.valueDescription}, // ${element.ofObligation ? " обазательный" : 'не обязательный'}`
                headers.appendChild(headersContent)
            })
        } else {
            headersTitle.textContent = 'Специальные заголовки не используются'
        }
        let responseTitle = document.createElement('h4')
        responseTitle.setAttributeNode(createClass('oneResponse__requestsList requestsList'))
        responseTitle.textContent = "Возможные ответы для этого шага"
        let responseComment = document.createElement('p')
        responseComment.setAttributeNode(createClass('requestsList__comment'))
        responseComment.textContent = 'В ответах могут присутствовать значеня "0" или "" (пустая строка). Данные значения будут заполняться реальными значениями.'
        let stepsResponsesList = document.createElement('ul')
        stepsResponsesList.setAttributeNode(createClass('page__listBlock listBlock'))
        responses.forEach(elem => {
            if (elem.responseCode.slice(0, 3) === element.stepNumber) {
                // let stepResponse = document.createElement('li')
                // let htmlContent = `<p>Описание: ${elem.discriptionRus}</p>`
                // delete elem.discriptionRus
                // let requestJSONtoHTML = `<div class=""><div class=''>{</div>`
                // for (let e in elem) {
                //     if (typeof elem[e] === 'string') {
                //         requestJSONtoHTML += `<div class=''>"${e}" : "${elem[e]}"</div>`
                //     } else if (typeof elem[e] === 'object') {
                //         requestJSONtoHTML += `<div class=''>"${e}" : "${JSON.stringify(elem[e])}"</div>`
                //     }
                // }
                // requestJSONtoHTML += `<div class=''>}</div></div>`
                // stepResponse.innerHTML = htmlContent + requestJSONtoHTML
                // stepsResponsesList.appendChild(stepResponse)
                getResponseHTMLList(elem, stepsResponsesList)
            }
        })


        let pieceOfContentArr = [title, method, uri, requestListTitle, getRequestList, requestJSONTitle, requestJSONContent, headersTitle, headers, responseTitle, responseComment, stepsResponsesList
        ]
        pieceOfContentArr.forEach(elem => {
            oneResponse.appendChild(elem)
        })

        document.getElementById('requests').appendChild(oneResponse)
    })
}

