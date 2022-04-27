import {Router} from 'express'
import multer from 'multer'
import {Request,Response} from 'express'
import {Lista} from '../models/Lista'//tabela banco de dados
import * as apiController from '../controllers/apiController'  //irei consumir as api dessa importação
//criação de enpoints da api
//upload de imagens nodejs criando uma pasta temporária
const upload = multer({
    dest:'./tmp'
})

const router = Router()
router.get('/lista',apiController.all)//all é a função criada no meu arquivo apiController
router.post('/lista',apiController.add)
router.put('/lista/:id',apiController.update)
router.delete('/lista/:id',apiController.deletar)

router.post('/upload', upload.single(''),apiController.uploadFile)







export default router;