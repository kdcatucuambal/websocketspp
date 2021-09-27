import express from "express";
import path from "path";
import {Server} from "socket.io";

const app = express();
const PORT = 3000 || process.env.PORT;

//static files
app.use(express.static(path.join(__dirname, "public")));


//Server running (EXPRESS)
const server = app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});


//Socket global
const io = new Server(server);
//Events
io.on("connection", (socket)=>{
    //Recepta
    socket.on("chat:message", (data)=>{
        //Emite
       io.sockets.emit("chat:server", data);
    });

    //Recepta
    socket.on("chat:typing",(data)=>{
        //Emite
        console.log("is typing: ", data);
      socket.broadcast.emit("chat:typing", data);
    })
});

