import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors'
import apiRoutes from './routes/api'
import {MulterError} from  'multer'

dotenv.config();

const server = express();
server.use(cors())

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});
//utilizado no upload
const errorHandler:ErrorRequestHandler =(err,req,res,next)=>{
    res.status(404)//bad request erro na requisição por parte do cliente ex dados incorretos

    if(err instanceof MulterError){
        res.json({error:err.code})
    }else{
        console.log(err)
        res.json({error:`ocorreu algum erro`})
    }

}

server.use(errorHandler)

server.listen(process.env.PORT);