// server.js
const express=require("express")
const cors=require("cors")
const connection=require("./models/connectionModel")
const userRoutes=require("./routes/userRoutes")
/**
 * 
 * @param {express.Application} app 
 */
const mount = async (app) => {
    app.use(express.json());

    app.use(cors()); // Enable CORS for all routes

    // Routes base path
    connection.connect((err)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('====================================');
            console.log("Database Connection Ready");
            console.log('====================================');
        }
    })

    app.use('/', userRoutes);

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT);

    server.on("listening",()=>{
        console.log("Server Running")
    })

    server.on("error",(err)=>{
        process.stderr.write(err)
        console.log(err.message);
    })
}

mount(express())
