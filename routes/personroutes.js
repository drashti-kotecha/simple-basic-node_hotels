const express=require('express');
const router = express.Router();
const Person = require('../models/person');


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log('Received data:', data);

        const newPerson = new Person(data);
        console.log('New person instance:', newPerson);

        const response = await newPerson.save();
        console.log("Data is saved:", response);

        res.status(200).json(response);
    } catch (err) {
        console.error('Error in try block:', err);  // Log the actual error
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get('/', async (req, res) => {
    try {
        console.log('Fetching data...');
        const data = await Person.find();
        console.log('Data fetched:', data);

        res.status(200).json(data);  // Corrected response to send the fetched data
    } catch (err) {
        console.error('Error in try block:', err);  // Log the actual error
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Correctly using req.query to get the query parameter
        console.log("Received workType:", workType); // Logging the received workType
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType }); // Ensure the person model is correctly defined
            console.log("Data fetched");
            console.log(response);
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid work Type' }); // Typo fix: invaild -> invalid
        }
    } catch (error) { // Catch the error to access error details
        console.log("Error", error); // Log the error details for debugging
        res.status(500).json({ error: "this is an internal error" }); // Typo fix: international -> internal
    }
}); 

router.put('/:id', async(req,res)=>{
    try{
        const personId =req.params.id;
        const updatedperson = req.body;

        const responce = await Person.findByIdAndUpdate(personId,updatedperson ,{
        new:true,
        runValidators:true,
        })
     
        if(!responce){
            return res.status(404).json({error:'person not found'})
        }
console.log("data updated");
 res.status(200).json(responce);
    }

    catch{
        console.log("Error", error); // Log the error details for debugging
        res.status(500).json({ error: "this is an internal error" }); 
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        console.log("data deleted");
        res.status(200).json({ message: 'person deleted successfully' });
    } catch (err) {
        console.log("Error:", err); // Log the error details for debugging
        res.status(500).json({ error: "this is an internal error" });
    }
});


module.exports=router;