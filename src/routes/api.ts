import {Router} from 'express'
import multer from 'multer'
import {Request,Response} from 'express'
import {Lista} from '../models/Lista'//tabela banco de dados
import * as apiController from '../controllers/apiController'  //irei consumir as api dessa importação
//criação de enpoints da api
//upload de imagens nodejs criando uma pasta temporária
// disk storage armazenar no hd.
/*
const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./tmp')
    },
    filename:(req,file,cb)=>{
        let randomName=Math.floor(Math.random()* 999999)
        cb(null, `${randomName+Date.now()}.jpg`)

    }
})
*/
//especificando para receber imagens e validando
const upload = multer({
    dest:'./tmp',
    fileFilter:(req,file,cb)=>{
        const allowed: string[]=['image/jpg','image/jpeg','image/png']
        //validação para ver se libera o arquivo atraves do mimetype
        if(allowed.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(null,false)
        }


        console.log('INFORMAÇÕES',file)
    }
    
})

const router = Router()
router.get('/lista',apiController.all)//all é a função criada no meu arquivo apiController
router.post('/lista',apiController.add)
router.put('/lista/:id',apiController.update)
router.delete('/lista/:id',apiController.deletar)

router.post('/upload', upload.single('avatar'),apiController.uploadFile)







export default router;