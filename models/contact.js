const mongoose = require("mongoose"); // library mangwayi 


// ek schema banaya ki aise saave hoga 
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const Contact = mongoose.model("contact", contactSchema);
// schema ko ek variable mein save kia

// export kar dia
module.exports = Contact;
