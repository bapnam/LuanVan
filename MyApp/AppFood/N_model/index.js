const mongoose = require("mongoose");


mongoose = mongoose.connect("mongodb+srv://ndnam1411:ndnam1411$mongo@cluster0-nts-namb180948.f0dsoq0.mongodb.net/?retryWrites=true&w=majority", 
    () => {
        console.log("Connected")
})


const bookSchema = new connmongoose.Schema({
    name: {
        type: String
    },
    pwd: {
        type: String
    }
});

let BookModel = mongoose.model("Book", bookSchema);

module.exports = {BookModel};