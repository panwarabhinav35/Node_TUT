const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");

const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
const product =data.products;


const server = http.createServer((req, res) => {
  console.log(req.url);
  if(req.url.startsWith('/product')){
    const id=req.url.split('/')[2];
    const prd=product.find((item) =>{return(+id===item.id)})
    res.setHeader("Content-Type", "text/html");
    let modifiedIndex=index.replace('**image**',prd.thumbnail).replace('**disc**',prd.description).replace('**title**',prd.title);
    res.end(modifiedIndex)
    return;
  }
  switch(req.url){
    case '/':
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;
    case '/api':
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    case '/Allproducts':
      res.setHeader("Content-Type", "text/html");
      let modifiedIndex=index.replace('**image**',product[0].thumbnail).replace('**disc**',product[0].description).replace('**title**',product[0].title);
      res.end(modifiedIndex)
      break;
    default:
      res.writeHead(404, "Not FOUND");
      res.end();
    }
    console.log("server started");
    //res.setHeader("Dummy", "DummyValue");
});

server.listen(8080);
