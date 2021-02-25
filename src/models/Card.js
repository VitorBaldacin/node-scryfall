const mongoose = require('mongoose');
const slug = require('slug');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:"Precisa de um nome"
    },
    slug:String,
    cmc:{
        type:String,
        trim:true,
        required:"Precisa de um custo de mana convertido(cmc)"
    },
    cost:{
        type:String,
        trim:true,
        required:"Precisa de um custo de mana" 
    },
    text:{
        type:String,
        trim:true
    }
});

const modelName = "Card";

modelSchema.pre('save', function(next){
    if(this.isModified('name')){
        this.slug = slug(this.name, {lower:true});
    }
    next();
});

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}
