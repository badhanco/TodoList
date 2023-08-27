const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const url = 'mongodb+srv://animeslime9:pmalan%4020@cluster0.p0ksipd.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true});
 
const itemsSchema = {
    name: String
};

const Items = mongoose.model("Item", itemsSchema);
 
const allitems = [ ];
 

app.get("/" , function(req,res){

    Items.find({}).then(function(foundItems){
        
        if(foundItems.length === 0){
            res.render("list", {listTitle: "Today", newListItems: foundItems});
            
        }else{
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
   
 
    }); 

});
 

app.post("/", function(req,res){
    const itemName = req.body.newItem;
    const item = new Items({
        name: itemName
    });
    item.save();
    res.redirect("/");
})

app.post("/delete", function(req,res){

    const checkedItemId = req.body.checkbox;
    Items.findByIdAndRemove(checkedItemId).then(function(err){
        if(!err){
            console.log("Successfully deleted checked item.");
            res.redirect("/");
        }
    });

});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});