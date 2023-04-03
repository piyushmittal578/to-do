import express from 'express';
import Item from './Schema/Item.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { v4 } from 'uuid';
const app = express();

//ejs
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 9001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

//deploy

// app.get('/api', (req, res) => {
//     const path = `/api/item/${v4()}`;
//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//     res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

// app.get('/api/item/:slug', (req, res) => {
//     const { slug } = req.params;
//     res.end(`Item: ${slug}`);
// });

//deploy

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

export default app