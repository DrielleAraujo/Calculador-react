const express = require("express")
const app = express()
const {MongoClient} = require("mongodb")
//const url = "mongodb+srv://projetodb:projetodb@cluster0.b6a3oyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const url = "mongodb+srv://gabrielazbluevictor:pudimdelazuli@cluster0.oy8urih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const ObjectId =require("mongodb").ObjectId
const client = new MongoClient(url)
const db = client.db("d-pessoais");
const collection = db.collection('crud')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true})) 

app.get('/index', (req, res)=>{
    res.render('index.ejs')
})

app.listen(3000, function(){
    console.log("O nosso servidor está rodando na porta 3000")
})

app.get("/ver",(req,res) =>{
    res.send("Hello World !!!")
})

app.get('/', (req, res) =>{
    console.log("cursor")
    let cursor =db.collection('crud').find(ObjectId(id))
})

app.post('/show',(req,res) =>{
    collection.insertOne(req.body, (err, result) =>{
        if(err) return console.log(err)
        console.log("Salve Point")
        res.redirect("/show")
        collection.find().toArray((err, results) =>{
            console.log(results)
        })
    })
})

app.get('/show', (req, res) => {
    collection.find().toArray((err, results)=>{
        if(err) return console.log(err)
        res.render('show.ejs', {crud:results})
    })
})

app.route('/edit/:id')
.get((req,res)=> {
    var id = req.params.id
    db.collection('crud').find(ObjectId(id)).toArray((err,result)=>{
        if(err) return res.send(err)
        res.render('edit.ejs', {crud: result}) 
    })
})

.post((req,res)=> {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    db.collection('crud')
    .updateOne({_id: ObjectId(id)}, {
        $set:{
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if (err) return res.send(err)
            res.redirect('/show')
        console.log('db atualizado')
    })
})

app.route('/delete/:id')
.get((req,res) =>{
    var id = req.params.id

    db.collection('crud')
    .deleteOne({_id: ObjectId(id)},
    (err, result) =>{
        if(err) return res.send(500,err)
            console.log('deletou banco')
        res.redirect('/show')
    })

})