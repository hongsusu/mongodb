const koa = require("koa")
const Router = require("koa-router")
const bodyParser =require('koa-bodyparser')

//连接本地数据库
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'koa';
const client = new MongoClient(url,{useUnifiedTopology:true});
client.connect(function(error,client){
    if(error){
        console.log(error);
        return;
    }else{
        console.log('MongoDB Connected')
       // const db=client.db(dbName)
      //  console.log('连接成功',db);
        // db.collection('order').insertOne({type:1,name:'矿泉水',price:2},function(err,res){
        //     if(err){
        //         console.log(err);
        //         return;
        //     }else{
        //         console.log(res);
        //         client.close();
        //     }
        // })
    }
})

//实例化
const app =new koa();
const router =new Router();

app.use(bodyParser())

router.get('/',ctx=>{
    ctx.body={msg:'Hello koa int'}
})
//路由GET
router.get('/test',ctx=>{
    ctx.body={msg:'Hello koa int'}
})
//POST
router.post('/api/users/register', ctx=>{
    const db=client.db(dbName)
    // const newUser={
    //     name:ctx.request.body.name,
    //     email:ctx.request.body.email,
    //     pwd:ctx.request.body.pwd
    // };
    // db.collection('user').insertOne(newUser,(err,res)=>{
    //     console.log(11111111111,res)
    //     if(err){
    //         console.log(222,err);
    //         ctx.body= newUser
    //         return;
    //     }else{
    //         ctx.body={
    //             code:200,
    //             msg:'成功'
    //         }
    //       //  client.close();
    //     }
    // })
    try {
    db.collection('user').insertOne({
        name:ctx.request.body.name,
        email:ctx.request.body.email,
        pwd:ctx.request.body.pwd
    })
        ctx.body={
            code:200,
            msg:'成功'
        }
    }
    catch (e) {
        ctx.body= {
            code:500,
            msg:e,
            newUser
        }
    }
})

//配置路由
app.use(router.routes()).use(router.allowedMethods())
const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`sever start on ${port}`)
})