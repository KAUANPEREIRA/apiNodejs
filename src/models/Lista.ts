import {Model, DataTypes} from "sequelize"
import { sequelize } from "../instances/mysql";


//especificando os campos do meu banco
export interface ListaInstance extends Model{
    id:number;
    titulo:string;
    concluido:boolean;

}

export const Lista = sequelize.define<ListaInstance>('Lista',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER

    },
    titulo:{
        type:DataTypes.STRING
    },
    concluido:{
        type:DataTypes.BOOLEAN,
        defaultValue:false

    }
},//tultimo parametro abaixo o nome da tabela
{tableName:'lista',
timestamps:false

}

)
