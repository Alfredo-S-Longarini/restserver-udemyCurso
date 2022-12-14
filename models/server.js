import express  from 'express'
import cors from 'cors'
import { routerUsuarios } from '../routes/usuarios.js';
import { routerAuth } from '../routes/auth.js';
import { dbConnection } from '../database/config.js';

export class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth/'
        //Conectar a base de datos.
        this.conectarDB()

        //Middlewares
        this.middlewares();

        //Rutas de la aplicación.
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
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
        
        this.app.use(this.usersPath, routerUsuarios)
        this.app.use(this.authPath, routerAuth)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor escuchando en puerto: ', this.port);
        })
    }

}