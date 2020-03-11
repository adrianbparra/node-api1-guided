const express = require("express");
const db = require("./data/hubs-model.js");
//server object
const server = express();

server.listen(4000, ()=>{
    console.log(`listining on port 4000...`)
})


// req = request
// res = response
server.get("/", (req, res) => {
    res.send("Hello World");
})

//dont include "/hubs" to apply to all request
// server.use("/hubs", (req,res)=>{

//})
server.use(express.json());


/////////// CRUD    /////////////////
//R- Read 
server.get("/hubs", (req,res)=>{
    db.find()
        .then(hubs=> {
            res.status(200).json({ hubs });
        })
        .catch(err => {
            res.status(500).json({success: false, err})
        })
})

//C - Create
server.post("/hubs", (req,res) =>{
    const hubInfo = req.body;
    console.log(hubInfo)
    db.add(hubInfo)
        .then(hub =>{
            res.status(201).json({ success: true, hub })
        })
        .catch(err => {
            res.status(501).json({ success: false, err})
        })
});

//D - Delete  
//      /hubs/number
server.delete("/hubs/:id", (req,res) =>{
    // const id = req.params.id
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted){
                res.status(204).end();
            } else {
                res.status(404).json({success:false, message: "Hub not found"})
            }
        })
        .catch(err =>{
            res.status(500).json({success: false, err})
        })


});

//U - Update
server.put("/hubs/:id", (req,res)=>{
    const {id} = req.params;
    const changes = req.body;

    db.update(id,changes)
        .then(updated =>{
            if(updated){
                res.status(200).json({success: true, updated})
            } else {
                res.status(404).json({success: true, message: "Not found"})
            }
        })
        .catch(err => {
            res.status(500).json({success: false, err})
        })

})

server.patch("/hubs/:id", (req,res)=>{

})