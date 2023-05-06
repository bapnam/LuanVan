// const Class1 = require("../v1_model/classesModel");

// const Class1Controller = {
//   add: async (req, res) => {
//     try {
//       const newClass = new Class1(req.body);

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
//       const cla = await Class1.find().populate("arr", "class");
//       const a = cla.arr;
//       res.status(200).json([cla, a]);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error);
//     }
//   },
// };

// module.exports = Class1Controller;
