const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
const port=process.env.PORT || 4000;

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
hbs.registerHelper('year',()=>{
  return new Date().getFullYear();
});

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+'\n');
  console.log(log);
  next();
});
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pagetitle:'Home Page'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pagetitle:'About Page'
  });
});
app.listen(port);
