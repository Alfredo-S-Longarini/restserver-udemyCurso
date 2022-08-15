import express  from 'express'
import cors from 'cors'
import { router } from '../routes/usuarios.js';

export class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //Middlewares
        this.middlewares();

        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());


        //Lectura y parseo del body
        this.app.use(express.json());


        //Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        
        this.app.use(this.usersPath, router)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor escuchando en puerto: ', this.port);
        })
    }

}