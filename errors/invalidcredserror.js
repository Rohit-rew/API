class invalidcreds extends Error{
    constructor(message){
        super(message)
    }
}

module.exports = invalidcreds