const express=require('express');
const path=require('path');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

let posts=[
 {id:1,caption:'New collection is here! ✨',platforms:['Instagram','Facebook'],status:'scheduled',scheduledAt:'2026-09-22T19:30:00'},
 {id:2,caption:'5 tips to grow your brand online',platforms:['LinkedIn'],status:'scheduled',scheduledAt:'2026-09-23T10:00:00'}
];

app.get('/api/health',(req,res)=>res.json({ok:true,service:'SocialFlow API'}));
app.get('/api/dashboard',(req,res)=>res.json({
 stats:{followers:84291,engagement:'8.64%',scheduled:posts.filter(p=>p.status==='scheduled').length,reach:'1.24M'},
 accounts:[
  {platform:'Instagram',handle:'@socialflow.agency',connected:true},
  {platform:'Facebook',handle:'SocialFlow Agency',connected:true},
  {platform:'LinkedIn',handle:'SocialFlow Agency',connected:true},
  {platform:'TikTok',handle:'@socialflow',connected:false}
 ],
 posts
}));
app.get('/api/posts',(req,res)=>res.json(posts));
app.post('/api/posts',(req,res)=>{
 const {caption,platforms,scheduledAt}=req.body;
 if(!caption)return res.status(400).json({error:'caption is required'});
 const post={id:Date.now(),caption,platforms:platforms||[],scheduledAt:scheduledAt||null,status:scheduledAt?'scheduled':'draft'};
 posts.unshift(post); res.status(201).json(post);
});
app.patch('/api/posts/:id',(req,res)=>{
 const p=posts.find(x=>x.id===Number(req.params.id));
 if(!p)return res.status(404).json({error:'Post not found'});
 Object.assign(p,req.body);res.json(p);
});
app.delete('/api/posts/:id',(req,res)=>{
 posts=posts.filter(x=>x.id!==Number(req.params.id));res.status(204).end();
});
app.get('*',(req,res)=>{ if(!req.path.startsWith('/api/')) res.sendFile(path.join(__dirname,'public','index.html')); });
const PORT=process.env.PORT||5000;
app.listen(PORT,'0.0.0.0',()=>console.log(`SocialFlow running on port ${PORT}`));
