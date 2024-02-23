const yup = require ("yup")

const studentSchema = yup.object({
    FullName: yup.string().min(3).required(),
    Grade: yup.number().positive().required(),
});

module.exports = studentSchema;