module.exports = { 
    getFunAddTextComment: (app) => {
        return (text) => {
            const env = app.get('env')
            if (env === 'test' && env === 'development') return ' -- ' + text
            return ''
        }
    }
}