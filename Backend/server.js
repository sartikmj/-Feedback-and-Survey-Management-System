const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importing the CORS middleware to handle cross-origin requests

const app = express();

app.use(cors()); //adds the CORS (Cross-Origin Resource Sharing) middleware to 
// your Express app. This allows your server to accept requests from web 
// applications hosted on different domains or ports, which is essential for 
// enabling communication between your backend and frontend if they are served 
// separately.

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/feedback-app',{
}).then(()=> console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

//Schema of the database for feedback
const feedbackSchema = new mongoose.Schema({
    studentName: {
        type:String,
        default: "Anonymous"
    },

    email: {
        type:String,
        default: ''
    },

    subject: {
        type:String,
        required: true
    },

    teacherName: {
        type:String,
        required: true
    },

    rating: {
        type:Number,
        required: true,
        min: 1,
        max: 5
    },

    comment:{
        type:String,
        default: ''
    },

    date:{
        type: Date,
        default: Date.now
    }
})

//Exporting the schema as a model
const Feedback = mongoose.model('Feedback', feedbackSchema);

//where to submit the data from backend
app.post('/submit-feedback' /*name of the api where data will be send */, async (req,res)=>{
    try{
        const data = req.body; //get the data from the request body

        if(!data.studentName || studentName.trim()===''){
            data.studentName = "Anonymous"; //if student name is not provided, "Anonymouse" will be set to the database
        }

        const feedback = new Feedback(data); //create a new instance of the Feedback model with the data
        await feedback.save(); //save the feedback to the database
        res.status(201).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong !" });
    }
})

//route that will hit to show data as graph to admin when authenticated gets true in react
app.get('/feedback-report', async (req,res)=>{
    try{
        const report = await Feedback.aggregate([ //Feedback is name of the model
            {
                $group:{
                    _id:"$teacherName",
                    averageRating: {$avg:"$rating"},
                    count:{$sum:1}
                }
            },
            {$sort:{averageRating:-1}} //in descending order
        ])
        res.json(report)
    }catch(err){
        res.status(500).json({err:'Something went wrong !'})
    }
})

//to get all feedback
app.get('/all-feedbacks', async (req,res)=>{
    try{
        const feedbacks = await Feedback.find().sort({date:-1})
        res.json(feedbacks);
    }catch(err){
        res.status(500).json({err:'Something went wrong !'})
    }
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})