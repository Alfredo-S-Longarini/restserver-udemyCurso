import pkg from 'mongoose';
const {Schema, model} = pkg //Exportación default. 

const RoleSchema = Schema({
    rol:{
        type:String,
        required:[true, 'El rol es obligatorio']
    }
});


export default model('Role', RoleSchema);