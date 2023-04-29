module.exports.typeSpacer = (types) => {
    res = []
    for (let i = 0; i < types.length; i++) {
        if (types[i] == "_id"){
            aux = "ID"
        }
        else {
            //SOURCE: https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
            aux = types[i].replace(/([A-Z])/g, ' $1').trim()
        }
        res[i] = aux
    }
    return res
}