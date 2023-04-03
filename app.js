import express from 'express';
import Item from './Schema/Item.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

//ejs
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(80, () => {
    console.log("Listening on port 80");
})

async function connectDB() {
    const uri = "mongodb+srv://admin578:test578@cluster0.ysqk1jk.mongodb.net/todo?retryWrites=true&w=majority";
    try {
        await mongoose.connect(uri);
    }
    catch
    {
        e => {
            console.log(e);
        }
    }
}

connectDB()

app.get("/", (req, res) => {
    async function run() {
        try {
            const items = await Item.find({});
            res.render("list", { Items: items });
        }
        catch
        {
            e => {
                console.log(e);
            }
        }
    }
    run();
})

app.post("/", (req, res) => {
    const name = req.body.name;
    const del = req.body.del;
    console.log(req.body)
    if (del != undefined) {
        async function run() {
            try { await Item.deleteOne({ _id: del }); }
            catch
            {
                e => {
                    console.log(e);
                }
            }
        }
        run();
        res.redirect("/");
    }

    if (name != undefined && name.length != 0) {
        async function run() {
            try {
                const item = new Item({ name: name });
                await item.save();
                console.log(item.name);
            }
            catch {
                e => {
                    console.log(e);
                }
            }
        }
        run();
        res.redirect("/");
    }
})