const express= require('express');
const router =express('router');
const MenuItem= require('../models/menu');

router.post('/',async (req,res)=>{
    try{
        const menudata=req.body;
        console.log("recived menudata:",menudata);

        const newmenuItem=new MenuItem(menudata);
        console.log("data is fectched",newmenuItem);

        const response = await newmenuItem.save();
        console.log("Data is saved:", response);
        res.status(200).json(response);
    }
    catch (err) {
        console.error('Error in try block:', err);  // Log the actual error
        res.status(500).json({ error: "Internal server error" });
    }

    })
//commented code
    router.get('/',async (req,res)=>{
        try{
     console.log("fetching data");
     const data=await MenuItem.find();
     console.log("data is fetched",data);
     res.status(200).json(data);
        }
        catch(err){
        console.log("error");
        res.status(500).json({error:"this is the international error"});
        }
    })
    
    router.get('/:menuType', async (req, res) => {
        try {
            const menuType = req.params.menuType;
            console.log('received menuType:', menuType);
    
            if (menuType === 'sweet' || menuType === 'spicy' || menuType === 'sour') {
                const response = await MenuItem.find({ taste: menuType });
                console.log("data fetched");
                console.log(response);
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'invalid menu Type' });
            }
        } catch (err) {
            console.log("error:", err);
            res.status(500).json({ error: "this is an internal error" });
        }
    });
    

    router.put('/:id', async(req,res)=>{
        try{
         const menuid=req.params.id;
         const updatedmenu=req.body;

         const responce = await MenuItem.findByIdAndUpdate(menuid,updatedmenu,{
            new:true,
            runValidators:true
         })
         if(!responce){
            return res.status(404).json({error:'menu not found'})
        }
console.log("data updated");
 res.status(200).json(responce);
        }
        catch(err){
            console.log("error:", err);
            res.status(500).json({ error: "this is an internal error" });
        }
    })

router.delete('/:id',async(req,res)=>{
    try{
        const menuid=req.params.id;
        const responce= await MenuItem.findByIdAndDelete(menuid)
        if(!responce){
            return res.status(404).json({ error: 'person not found' });
        }
        console.log("data deleted");
        res.status(200).json({message:'menuitem is deleted'})
    }
    catch{
        console.log("error:", err);
    res.status(500).json({ error: "this is an internal error" });

    }
})

    module.exports=router;