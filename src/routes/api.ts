import {Router} from 'express'
import {Request,Response} from 'express'
import {Lista} from '../models/Lista'//tabela banco de dados
import * as apiController from '../controllers/apiController'  //irei consumir as api dessa importação
//criação de enpoints da api

const router = Router()
router.get('/lista',apiController.all)//all é a função criada no meu arquivo apiController
router.post('/lista',apiController.add)
router.put('/lista/:id',apiController.update)
router.delete('/lista/:id',apiController.deletar)







export default router;