// On instancie express
const app = require("express")();

// On crée le serveur http
const http = require("http").createServer(app);

// On instancie socket.io
const io = require("socket.io")(http);

// On crée la route /
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// On écoute l'évènement de connection à socket.io
io.on("connection", (socket) => {
    console.log("une connexion s'active");

    // On écoute les déconnections
    socket.on("disconnect", () => {
        console.log("Un Utilisateur s'est déconnecté");
    });

    // On gère le chat
    socket.on("chat_message", (msg) => {
        // On relaie le message vers tous les utilisateurs connectés
        io.emit("received_message", msg);
    });
});

// On va demander au serveur http de répondre sur le port 3000
http.listen(3000, () => {
    console.log("j'écoute le port 3000");
});


