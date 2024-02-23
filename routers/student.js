var express = require('express');
const student = require('../models/student');
var router = express.Router();
const validateMW = require("../middlewares/validateMW");
const studentSchema = require("../validators/studentSchema");

/* GET listing. */
router.get('/', function(req, res, next) {
    res.json({message:"Test"});
});



router.post('/add', validateMW(studentSchema), async(req, res, next) => {
    const newStudent = new student({
        FullName: req.body.FullName,
        Grade: req.body.Grade
    });
    await newStudent.save();
     res.json(newStudent);
})

//update with validators

router.put('/update',validateMW(studentSchema),async(req,res,next)=>
{
    const studentup = await student.findOneAndUpdate(
        {
            FullName: req.body.FullName,
            Grade: req.body.Grade
        }
    )
    res.json("student updated succesfully");
})

//find by name

router.get('/findbyName/:name',validateMW(studentSchema),async(req,res,next)=>
{
    const studentup = await student.findOne().where('FullName').equals(req.params.name);
       
    
    res.json(studentup);
})



router.delete('/delete/:id',async(req,res,next)=>
{
        const st =  await student.findByIdAndDelete(req.params.id);
        if(next)
        {
              res.json("User deleted successfully");
        }

      

})

module.exports = router;