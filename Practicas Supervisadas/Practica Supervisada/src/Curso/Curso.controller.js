
import Curso from './Curso.model.js'

export const testCuso = (req,res)=>{
    return res.send('Conecto con Cursos')
}

export const addCurso = async(req, res)=>{
    try{
        let data = req.body
        let curso = new Curso(data)
        await curso.save()
        return res.send({message: 'Course successfully added'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error course could not be added',err})
    }
}

export const viewCurso = async(req, res)=>{
    try{
        let { name } = req.body
        let curso = await Curso.findOne({name})
        if (curso){
            let loggedCurso = {
                name: curso.name,
                grade: curso.grade,
                description: curso.description
            }
            return res.send({message: `The ${product.name} found`, loggedProduct})
        }
        return res.status(404).send({message: 'Invalid Name'})
    }catch(error){
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

export const lookForAllCursos = async(req, res)=>{
    try{
        let all = await Curso.find({})
        return res.send({message: all})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

export const updateCurso = async(req, res)=>{
    try{
       let { id } = req.params
       let data = req.body
       let updatedCurso = await Curso.findOneAndUpdate(
        {_id: id},
        data,
        {new: true})
        if(!updateCurso) return res.status(401).send({message: 'The course could not be updated'}) 
        return res.send({message: 'Updated course', updatedCurso})
    }catch(error){
        console.error(err)
        return res.status(404).send({message: 'Unexpected error while updating'})
    }
}

export const deleteCurso = async(req,res)=>{
    try{
        let { id } = req.params
        let deleteCur = await Curso.findOneAndDelete({_id: id})
        if(!deleteCur) return res.status(404).send({message: 'The course could not be deleted'})
        return res.send({message: `The course: ${deletedProduct.name} has been successfully removed`})
    }catch(error){
        console.error(err)
        return res.status(404).send({message: 'Unexpected error while deleting'})
    }
}