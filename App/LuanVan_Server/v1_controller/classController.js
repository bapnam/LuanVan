// const Class = require("../v1_model/classModel");

// const ClassController = {
//   add: async (req, res) => {
//     try {
//       const newClass = new Class(req.body);

//       // Save DB
//       const classa = await newClass.save();

//       res.status(200).json(classa);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error);
//     }
//   },

//   getall: async (req, res) => {
//     try {
//       res.status(200).json();
//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error);
//     }
//   },
// };

// module.exports = ClassController;
