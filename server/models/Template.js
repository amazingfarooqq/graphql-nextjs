const mongoose = require('mongoose')


const TemplateSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    stacks: {type: String},
    previewurl: {type: String},
    downloadurl: {type: String},
})

module.exports = mongoose.model("Template", TemplateSchema)