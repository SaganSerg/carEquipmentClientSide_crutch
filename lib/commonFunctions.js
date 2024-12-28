module.exports = {
    getFunAddTextComment: (app) => {
        return (text) => {
            const env = app.get('env')
            if (env === 'test' || env === 'development') {
                let ret = ` -- ${text}`
                return ret
            }
            return ''
        }
    },
    runTests: (app, ...testFuns) => {
        if (app.get('env') === 'test') {
            for (let elem of testFuns) {
                elem.fun(elem.paramArr)
            }
        }
    },
    addTextCommentNew: (app, text) => {

        const env = app.get('env')
        // console.log('text --- ', text)
        if (env === 'test' || env === 'development') {
            let ret = ` --  ${text}`
            // console.log('ret --- ', ret)
            return ret
        }
        return ''
    }
}