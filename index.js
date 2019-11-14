const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 192.168.50.93:8080"
});

const compression = require("compression");
const db = require("./db");

const s3 = require("./s3");
const { s3Url } = require("./config");

const bcrypt = require("./bcrypt");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(
    express.urlencoded({
        extended: false
    })
);

const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.get("/welcome", function(req, res) {
    //if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    res.sendFile(__dirname + "/index.html");
    //}
});

// route for registering new members

app.post("/register", (req, res) => {
    let { first, last, email, password } = req.body;

    bcrypt
        .hash(password)
        .then(hash => {
            db.addUser(first, last, email, hash).then(newUser => {
                req.session.userId = newUser.rows[0].id;
                res.json({ success: true });
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

// login route for registered members

app.post("/login", (req, res) => {
    let { email, password } = req.body;
    let savedPswd, userId;

    db.getHashAndUserId(email)
        .then(result => {
            savedPswd = result.rows[0].password;
            userId = result.rows[0].id;
            return bcrypt.compare(password, savedPswd);
        })
        .then(isMatch => {
            if (isMatch) {
                req.session.userId = userId;
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

app.get("/user", function(req, res) {
    // do it for file
    // get user info from the DB
    db.getUser(req.session.userId)
        .then(({ rows }) => {
            // console.log("getUser rows: ", rows);
            res.json(rows[0]);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

app.post("/upload", uploader.single("image"), s3.upload, function(req, res) {
    //console.log("upload file: ", req.file);
    const url = `${s3Url}${req.file.filename}`;
    //console.log(url);
    // res.sendStatus(200);
    // it worked. insert into the db

    db.addImage(req.session.userId, url)
        .then(({ rows }) => {
            //console.log("add image rows: ", rows);
            res.json(rows);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
});

// app.post("/editbio", (req, res) => {
//     let bio = req.body.bio;
//     //console.log(bio);
//     db.editBio(req.session.userId, bio)
//         .then(({ rows }) => {
//             //console.log(rows[0]);
//             res.json(rows[0]);
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

// get details for files?
// app.get("/api/user/:id", (req, res) => {
//     //console.log("req.params.id: ", req.params.id);
//     let userId = req.params.id;
//
//     //if
//
//     db.getUser(userId)
//         .then(result => {
//             //console.log("user id rows: ", result.rows[0]);
//             if (result.rows[0].id == req.session.userId || !result.rows[0]) {
//                 //res.json({ loggedUser: true });
//                 res.sendStatus(204);
//             } else {
//                 //    console.log("api user else block: ", result.rows[0]);
//                 res.json(result.rows[0]);
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

app.get("/api/data", (req, res) => {
    console.log("data route");
    db.latestFiles()
        .then(result => {
            console.log("latest files: ", result.rows);
            res.json(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/data/:input", (req, res) => {
    db.findFiles(req.params.input)
        .then(result => {
            console.log("searched files: ", result);
            res.json(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

// app.get("/friendship-status/:id", (req, res) => {
//     console.log("sender: ", req.session.userId);
//     console.log("receiver: ", req.params.id);
//
//     db.getFriendship(req.session.userId, req.params.id)
//         .then(({ rows }) => {
//             //    console.log("relationship: ", rows[0]);
//             if (rows[0] == undefined) {
//                 res.json({ relationship: false });
//             } else if (rows[0].accepted == false) {
//                 console.log("accepted status: ", rows, rows[0].accepted);
//                 res.json({ rows, relationship: true, friendship: false });
//             } else {
//                 res.json({ relationship: true, friendship: true });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

//potential route - socket example
// app.post("/friend-request", function(req, res) {
//     io.sockets.sockets[socketIdOfRecipient].emit("newFriendRequest");
// });
//
// app.post("/request-friendship/:id", (req, res) => {
//     db.reqFriendship(req.session.userId, req.params.id)
//         .then(result => {
//             //    console.log("now what?", result);
//             res.json({ relationship: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

// app.post("/accept-friendship/:id", (req, res) => {
//     //console.log(typeof Number(req.params.id));
//     db.acceptFriendship(req.session.userId, Number(req.params.id))
//         .then(result => {
//             //    console.log("now, again, what?", result);
//             res.json({ friendship: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

// app.post("/unfriend/:id", (req, res) => {
//     db.unFriend(req.session.userId, req.params.id)
//         .then(result => {
//             res.json({ relationship: false });
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

// app.get("/friends-wannabes", (req, res) => {
//     db.getFriendsWannabes(req.session.userId)
//         .then(({ rows }) => {
//             //    console.log("friends & wannabes: ", rows);
//             res.json(rows);
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });
//
// app.get("/friendsofotherprofile/:id", (req, res) => {
//     db.getOtherProfileFriends(Number(req.params.id))
//         .then(({ rows }) => {
//             console.log("someone's friends: ", rows);
//             res.json(rows);
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

///////////////////////////// WORK IN PROGRESS /////////////////////////////

app.get("/logout", function(req, res) {
    req.session.userId = null;
    res.redirect("/welcome");
});

app.get("*", function(req, res) {
    // the star route matches all url's and needs to be the last route of all of our routes
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// DO NOT DELETE DO NOT DELETE DO NOT DELETE
// app.get("*", function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// });
// DO NOT DELETE DO NOT DELETE DO NOT DELETE

// const onlineUsers = {};
//
// io.on("connection", socket => {
//     // connection is a special event - it happens when any client connects
//     console.log(`A socket with the id ${socket.id} just connected`);
//
//     const { userId } = socket.request.session;
//     onlineUsers[socket.id] = userId; //when someone connects, the socket id becomes a property of this object
//
//     socket.on("iAmHere", data => {
//         console.log(data.message);
//         socket.emit("goodToSeeYou", {
//             message: "you look marvelous"
//         });
//
//         io.emit("somebodyNew"); //or io.socket.emit - they send it to everybody
//         //    socket.broadcast.emit("somebodyNew"); //this sends it to everyone but this socket - like omitting the somebody new
//     });
//     socket.on("disconnect", () => {
//         delete onlineUsers[socket.id]; //deleting a property from the object when they disconnect
//         console.log(`A socket with the id ${socket.id} just disconnected`);
//     });
// });

//app.listen(8080, function() {
server.listen(8080, function() {
    console.log("I'm listening. Tarantula");
});

io.on("connection", function(socket) {
    console.log(`socket with the id ${socket.id} is connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    // const userId = socket.request.session.userId;
    let userId = socket.request.session.userId;

    /* ... */

    //SERVER SIDE SOCKET code - we want to get the last 10 chat messages
    db.getLastTenChatMessages().then(data => {
        //console.log("last 10 messages: ", data.rows);
        io.sockets.emit("chatMessages", data.rows);
    });

    socket.on("My amazing chat message", function(msg) {
        //console.log("my amazing chat message", msg);
        io.sockets.emit("new chat message", msg);
        // });

        //socket.on("newMessage", function(newMessage) {
        //do stuff in here...
        // we want to find out info about user who sent the message
        // we want to emit this message OBJECT
        // we also want to store it in the DB
        db.addNewMessage(msg, userId).then(() => {
            //console.log("adding msg: ", data.rows);
            db.getMessageInfo(userId).then(data => {
                //    console.log("add", data.rows);
                io.sockets.emit("chatMessage", data.rows);
            });
        });
    });
});
