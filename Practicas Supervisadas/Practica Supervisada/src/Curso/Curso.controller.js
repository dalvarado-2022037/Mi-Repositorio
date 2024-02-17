
import Curso from './Curso.model.js'
import User from '../User/User.model.js'

export const testCuso = (req,res)=>{
    return res.send('Conecto con Cursos')
}

export const addCurso = async(req, res)=>{
    try{
        let data = req.body
        let {  role } = req.user
        if(role == 'STUDENT_ROLE') return res.status(403).send({message: 'You do not have authorization to add courses'})
        let curso = new Curso(data)
        await curso.save()
        return res.send({message: 'Course successfully added'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error course could not be added',err})
    }
}

export const lookForAllCursos = async(req, res)=>{
    try{
        let { uid } = req.user
        let all = await Curso.find({teacher:uid})
        return res.send({message: all})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error when searching'})
    }
}

export const updateCurso = async(req, res)=>{
    try{
       let { id } = req.params
       let cursoData = await Curso.findOne({_id:id})
       let { uid } = req.user
       if(cursoData.teacher != uid) return res.status(403).send({message: 'You do not have authorization to modify the course'})
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
        let cursoData = await Curso.findOne({_id:id})
        if(!cursoData) return res.status(404).send({message: 'Course not found'})
        if(cursoData.teacher != uid) return res.status(403).send({message: 'You do not have authorization to modify the course'})
        let deleteCur = await Curso.findOneAndDelete({_id: id})
        if(!deleteCur) return res.status(404).send({message: 'The course could not be deleted'})
        return res.send({message: `The course: ${deletedProduct.name} has been successfully removed`})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Unexpected error while deleting'})
    }
}
/*
export const unirseCurso = async(req,res)=>{
   
        if(cursos.length < 3){
            let cursoUnir = await Curso.find({_id:id})
            if (!cursoUnir) return res.status(404).send({ message: 'Curso not found' });
            if (cursoUnir.students.includes(uid)) return res.status(400).send({ message: 'Student is already enrolled in this course' });
            cursoUnir.students.push(uid)
            return res.send({message: 'Unido'})
        }
}*/

export const unirseCurso = async (req, res) => {
    try {
        let { id } = req.params;
        let { uid } = req.user;
        let cursos = await Curso.find({ students: uid });
        if (!cursos) {
            return res.status(404).send({ message: 'Course not found' });
        }
        if (cursos.students && cursos.students.includes(uid)) {
            return res.status(400).send({ message: 'You are already enrolled in this course' });
        }
        if (cursos.length < 3) {
            let updateCurs = await Curso.findOneAndUpdate(
                { _id: id },
                { students: uid }
            );
            if(!updateCurs) return res.status(400).send({message: 'Login error'})
            return res.send({ message: 'Unido' });
        }
        return res.send({ message: 'It is not possible to join more courses' });
    } catch (err) {
        console.error(err);
        return res.status(404).send({ message: 'Unexpected error when adding' });
    }
}