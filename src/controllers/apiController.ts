import {Request, Response} from 'express'
import{Lista} from '../models/Lista'

export const all = async (req:Request,res:Response)=>{
  let listTodas = await Lista.findAll()
  res.json({listTodas})
}

export const add = async (req:Request,res:Response)=>{
    if(req.body.titulo){
    let {titulo}=req.body
    let newTarefa= await Lista.create({titulo})
    res.json({id:newTarefa.id,titulo})
    }else{
        res.json({error:'não foi possivel inserir tente novamente'})
    }

}

export const update = async(req:Request,res:Response)=>{

    let id= req.params.id
    let {titulo,concluido}=req.body
    let list = await Lista.findByPk(id)//pegar pelo id
    if(list){
       
        if(req.body.titulo){
            list.titulo = req.body.titulo
        }

        if(req.body.concluido){
            switch(req.body.concluido.toLowerCase()){
                case 'true':
                case '1':
                    list.concluido = true
                    break
                case 'false':
                case '1':
                    list.concluido= false
                    break
                
                
            }

        }
        await list.save()
        res.json({list})
    }else{
        res.json({error:'não foi possivel encontrar o item selecionado'})
    }

}

export const deletar = async(req:Request,res:Response)=>{
    let id = req.params.id
    let list = await Lista.findByPk(id)
     if(list){
         await list.destroy()
         res.json({message:'item deletado com sucesso'})
     }else{
         res.json({error:'não foi possivel localizar item'})
     }

}

export const uploadFile = async(req:Request, res:Response)=>{

    console.log('FILE', req.file)
    console.log('FILES', req.files)

   
    res.json({})

}