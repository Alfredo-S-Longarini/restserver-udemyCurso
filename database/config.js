import mongoose from "mongoose"

export const dbConnection = async()=>{

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false 
            //Ya no funcionan porque En mongoose 6 ya vienen predefinidas. https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
        })

        console.log('Base de datos lista!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos')
    }

}