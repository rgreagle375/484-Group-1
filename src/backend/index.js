require('dotenv').config();
var express = require("express");
var app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-zg5f7.mongodb.net/test?retryWrites=true&w=majority`;
var bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const SALT_ROUNDS = 10;

function genKey(length=6){
    //this function returns a random string of length 6
    //and contains a mix of letters and numbers
    return Math.random.toString(20).substr(2, length);
}

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
});

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', async (req, res) =>{
    //When the non-TU professor user signs up, they will only give their username and passwords
    //The rest of the fields will be empty by default
    const userEmail = req.body.email;
    let userPassword = req.body.password;
    const newUsername = userEmail.substring(0, userEmail.indexOf("@"));
    try {
        const hashedPassword = await bcrypt.hash(userPassword, SALT_ROUNDS);        
        userPassword = hashedPassword;
    } catch (e) {
        console.log("Error occured while hashing password and storing the password ", e);
    }
    const user = {
        username: newUsername,
        role: 0,
        email: userEmail,
        password: userPassword,
        SignallingChannel: "",
        CurrentStreamDescription: "",
        CurrentStreamTitle: "",
        CurrentStreamKey: "",
        PrevWatchedKeys: "",
        refreshToken:""
    };
    MongoClient.connect(uri, (err, db) => {
        var dbo = db.db("COSC484Users");
        if(err) throw err;
        dbo.collection("Users").insertOne(user, (err, ans) => {
            if (err) {
                res.status("400").send(err);
                console.err("Error has occured when adding to database");
            } else {
                console.log("Successfully inserted into database")
            } 
        })
        db.close();
    });
    res.status(200).send(user);
});

app.post('/signup-prof', async (req, res) =>{
    //When the TU professor signs up, they will only give their username and passwords
    //The rest of the fields will be empty by default
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const newUsername = userEmail.substring(0, userEmail.indexOf("@"));
    try {
        const hashedPassword = await bcrypt.hash(userPassword, SALT_ROUNDS);        
        userPassword = hashedPassword;
    } catch (e) {
        console.log("Error occured while hashing password and storing the password ", e);
    }
    const user = {
        username: newUsername,
        role: 1,
        email: userEmail,
        password: userPassword,
        SignallingChannel: "",
        CurrentStreamDescription: "",
        CurrentStreamTitle: "",
        CurrentStreamKey: "",
        PrevWatchedKeys: "",
        refreshToken: ""
    };
    MongoClient.connect(uri, (err, db) => {
        if (err){
            res.status(500).send("Cannot connect to database");
            console.err("Cannot connect to database");
        };
        var dbo = db.db("COSC484Users");
        dbo.collection("Professors").insertOne(user, (err, ans) => {
            if (err) {
                res.status("400").send(err);
                console.err("Error has occured when adding to database");
            } else {
                console.log("Successfully inserted into database")
            } 
        })
        db.close();
    });
    //Send mail to professor
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'tuconnected@gmail.com',
            pass: 'TUConnect1!'
        }
    })
    let mailOptions = {
        from: 'TU Connect',
        to: userEmail,
        subject: 'Streamer capabilities notice',
        text: `Hello there ${newUsername}, you will be recieving another email regarding 
                your status for streaming.\n Please know that you can only have up to 10 members 
                in each stream.\n As a professor, no action is needed by you to become a streamer  
                as our team will update your profile in 24 hours at the most!`
    }
    transporter.sendMail(mailOptions)
    //Send mail to us so we can update them
    let selfTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'tuconnected@gmail.com',
            pass: 'TUConnect1!'
        }
    })
    let selfOptions = {
        from: 'TU Connect',
        to: 'tuconnected@gmail.com',
        subject: 'Update streamer profile',
        text: `${newUsername} has recentley signed up for our service, please create channel in AWS \n
               and then update their document in the database soon!`
    }
    selfTransporter.transporter(selfOptions);
    res.status(200).send(`Successfully added ${newUsername} to MongoDB and send an email them and TUConnect`);
});


app.post("/signin", async (req, res) => {
    //This function performs the necessary actions for 
    //signing in a user
   const { email, password } = req.body;
   const userEmail = email;
   const userPassword = password;
   const query = { email: userEmail };
   var foundUser;
   MongoClient.connect(uri, (err, db) => {
        if (err){
            res.status(500).send("Cannot connect to database");
            console.err("Cannot connect to database");
        };
        var dbo = db.db("COSC484Users");
        dbo.collection("Users").find(query).toArray((err, result) => {
            if (err){
                return err;
            }
            console.log(result);
            arraySize = result.length;
            db.close();
            if (arraySize != 0){
                try {
                   if (bcrypt.compare(userPassword, result[0].password)){
                        const user = { username: result[0].username}
                        const accessToken = generateAccessToken(user);
                        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN);
                        updateRefreshToken({email: result[0].email}, refreshToken);
                        return res.status(200).send({accessToken: accessToken, refreshToken: refreshToken})
                   } else {
                       res.status(404).send("Invalid credentials");
                   }
                }catch (e) {
                    console.log("An error occured while comparing password", e);
                }
            }else {
                res.status(404).send("Could not find user");
            }
        })
   })
})

app.delete('/signout', (req, res) => {
    MongoClient.connect(uri, (err, db) => {
        if(err){
            console.err("Cannot connect to the database");
            return res.status(500).send("Cannot connect to the database");
        }
        var dbo = db.db("COSC484Users");
        dbo.collection("Users").updateOne({refreshToken: req.body.token}, { $set: {refreshToken: ""}}, (err, result) => {
            if(err) throw err;
            console.log("deleted token")
            return res.status(200).send(result.username)
        })
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).send("No token");
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err){
            return res.status(403).send("Could not verify token")
        }
        req.user = user;
        next();
    })
}

app.post('/token', (req, res) => {
    //This function gets the refresh token that is stored in the database
    //This will allow us to create a new access token
    MongoClient.connect(uri, (err, db) => {
        if(err){
            return res.status(500).send("Could not connect to database")
        }
        var dbo = db.db("COSC484Users");
        dbo.collection("Users").findOne({email: req.body.email}, (err, result) => {
            if(!result.refreshToken) return res.status(403).send("No token available");
            if(err) return res.status(403).send("Could not find token");
            res.status(200).send({refreshToken: result.refreshToken})
            db.close();
        })
    })
})

app.get("/get-channel-name", (req, res) => {
    //This function will get the stream if the key is correct
    //If the credential is incorrect, then we return a 400 bad request
    const Streamkey = req.body.key;
    console.log(req.body.key);
    var arraySize = 0;
    MongoClient.connect(uri, (err, db) => {
        if (err){
            res.status(500).send("Cannot connect to database");
            console.err("Cannot connect to database");
        };
        var dbo = db.db("COSC484Users");
        dbo.collection("Users").find({ CurrentStreamKey: Streamkey }).toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            arraySize = result.length;
            db.close();

            if (arraySize != 0){
                res.status(200).send({ChannelName: result[0].ChannelName});
            }else {
                res.status(404).send("Could not find streamer");
            }
        })
    }); 
});

app.get('/testSignin', authenticateToken, (req, res) => {
    res.status(200).send(req.user)
})

app.post("/send-keys", (req, res) => {
    //This function will send keys to the the tutors viewers
    const randomKey = genKey();
    const {user, role, mailingList} = req.body;
    MongoClient.connect(uri, (err, db) => {
        if (err){
            res.status(500).send("Cannot connect to database");
            console.err("Cannot connect to database");
        };
        var collection = (role == 1) ? "Professors" : "Users";
        var dbo = db.db("COSC484Users");
        try {
            dbo.collection(collection).updateOne(
                {"username": user},
                {$set: {"CurrentStreamKey": randomKey}}
                )
        } catch (err) {
            console.log(err);
            res.status(400).send("Could not update with stream key");
        }
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'tuconnected@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        })
        for( let i = 0; i < mailingList.length; i++){
            transporter.sendMail({
                from: 'TU Connect',
                to: mailingList[i],
                subject: 'Streamer capabilities notice',
                text: `You have been invited to join ${user}'s tutoring session!\n
                       Here is your stream key to access the session: ${randomKey}\n
                       To join their stream, simply enter sign into the website, \n
                       click the join stream button and enter the key into the prompt.\n
                       After that, press enter and have a nice session!`
            })
        }
        res.status(200).send(`Successfully updated stream key and mailed this key to recipients: ${randomKey}`);
    })
})

app.get("/watched_streams", (req, res) => {
    //This function will gather all of the streams that have been
    //watched by the user in the past in array form
    const usersname = req.body.username;
    MongoClient.connect(uri, (err, db) => {
        if (err){
            res.status(500).send("Cannot connect to database");
            console.err("Cannot connect to database");
        };
        var dbo = db.db("COSC484Users");
        dbo.collection("Users").find({ username: usersname }).toArray((err, result) => {
            if(err) throw err;
            console.log(result);
            arraySize = result.length;
            db.close();

            if (arraySize != 0){
                const keyArray = result[0].PrevWatchedKeys.split(",");
                res.status(200).send(keyArray);
            }else {
                res.status(404).send("Could not find user");
            }
        })
    })
})

function updateRefreshToken(user, token){
    MongoClient.connect(uri, (err, db) => {
        if(err){
            console.err("Could not connect to database")
            return res.status(500).send("Cannot connect to database");
        };
        var dbo = db.db("COSC484Users");
        dbo.collection("Users").updateOne(user, { $set: {refreshToken: token}}, (err, result) => {
            if(err) throw err;
            console.log("Updated");
            db.close();
        })
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '30s'});
}


app.listen(3001, () => {
    console.log("Server running on port 3001");
})