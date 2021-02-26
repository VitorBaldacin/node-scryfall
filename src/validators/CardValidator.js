const {checkSchema} = require('express-validator');

exports.add = checkSchema({
    name:{
        trim:true,
        isLength:{
            options: {min:2}
        },
        errorMessage: "O nome precisa de pelo menos 2 caracteres"
    },
    cmc:{
        notEmpty:true,
        errorMessage: "Cmc não pode estar vazio"
    },
    cost:{
        notEmpty:true,
        errorMessage: "O custo não pode estar vazio"
    },
    text:{
        notEmpty:false
    }
});

exports.update = checkSchema({
    name:{
        trim:true,
        isLength:{
            options: {min:2}
        },
        errorMessage: "O nome precisa de pelo menos 2 caracteres"
    },
    cmc:{
        notEmpty:true,
        errorMessage: "Cmc não pode estar vazio"
    },
    cost:{
        notEmpty:true,
        errorMessage: "O custo não pode estar vazio"
    },
    text:{
        notEmpty:false
    }
})
