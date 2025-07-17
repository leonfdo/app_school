class notUnique extends Error{
    constructor(message){
        super(message)
        this.name = "notUnique"
    }
}

class invalidId extends Error{
    constructor(message){
        super(message)
        this.name = "invalidId"
    }
}

module.exports = {
    notUnique,
    invalidId
}
