import {unlink} from 'fs/promises'//para deletar imagens temporarias
import {Request, Response} from 'express'
import{Lista} from '../models/Lista'
import sharp from 'sharp'//manipular imagens
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

    if(req.file){
        const filename = `${req.file.filename}.jpg`
        await sharp(req.file.path).resize(300,300 ,{fit:sharp.fit.cover}).toFormat('jpeg')
        .toFile(`./public/media/${filename}`)
        //pegar a imagem, este resize esta definindo a largura de 500,e toFormat transformando em jpeg
        //toFile para indicar o caminho para salvar img
        //fit funciona como o background-image do css cover para pegar o meio

        await unlink(req.file.path)//apagando arquivo da pasta temporaria
        res.json({image:`${filename}`})

    }else{
        res.status(400)
        res.json({error:'Arquivo invalido'})
    }

   
    

}