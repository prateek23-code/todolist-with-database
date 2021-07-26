const express = require('express');
const bodyParser= require("body-parser");
const _=require("lodash");
const mongoose=require("mongoose");
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const date = require(__dirname + "/date.js");
mongoose.connect("mongodb+srv://Andcap123:Andcap123@cluster0.ulusj.mongodb.net/todolistdb?retryWrites=true&w=majority",{useNewUrlParser:true});

const itemsSchema= {
  name:String
}
const Item= mongoose.model("Item",itemsSchema);
const item1 = new Item({
  name: "welcome "

});
const item2 = new Item({
  name: "hit the + button to add item "

});
const item3 = new Item({
  name: "check the check box to delete an item "

});
const defaultItems =[item1,item2,item3];
const listSchema={
  name:String,
  items:[itemsSchema]
};
const List=mongoose.model("list",listSchema);


app.get('/', (req, res) => {
  Item.find({},function(err ,founditems){
    if(founditems.length===0){ 
    
    Item.insertMany(defaultItems,function(err){
        if(err){
            console.log(err);
         }
        else{
            console.log("success")
        }
     })
     res.redirect("/");
   }
   else{
    res.render("list",{dayis :"Today",well:founditems });

   }
    
  res.render("list",{dayis :"Today",well:founditems });
  });
});
app.get("/:topic",(req,res)=>{
  const listname=_.capitalize(req.params.topic);
  List.findOne({name:listname},function(err,foundlist){
    if(!err){
      if(!foundlist){
        const list =new List({
          name:listname,
          items:defaultItems
        })
        list.save();
        res.redirect("/"+listname);
        

      }
      else{
        res.render("list",{dayis :foundlist.name,well:foundlist.items });
      }
    }
  })

  


})
app.post("/" ,(req,res)=>{
  const toy = req.body.itemsq;
  const listName=req.body.list;
  const item = new Item({
    name :toy

  });
  if(listName==="Today"){
    item.save();
    res.redirect("/");

  }
  else{
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })
  }
  

});
app.post("/delete",(req,res)=>{
  const checkedItemid= req.body.checkbox1;
  const listName=req.body.listName;
  if(listName==="Today"){
    Item.findByIdAndRemove(checkedItemid,function(err){
      if(!err){
        console.log("successfully deleted checked item");
      }
    })

  }
  else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemid}}},function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    })
  }
 
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("server started")
});