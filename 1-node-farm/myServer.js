// MyServer
const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = (temp, product) => {
  let output = temp.replace("{%PRODUCTNAME%}", product.productName);
  output = output.replaceAll("{%FROM%}", product.from);
  output = output.replaceAll("{%IMAGE%}", product.image);
  output = output.replaceAll("{%PRICE%}", product.price);
  output = output.replaceAll("{%NUTRIENTS%}", product.nutrients);
  output = output.replaceAll("{%QUANTITY%}", product.quantity);
  output = output.replaceAll("{%DESCRIPTION%}", product.description);
  output = output.replaceAll("{%ID%}", product.id);
  output = output.replaceAll(
    "{%NOT_ORGANIC%}",
    product.organic ? "" : "not-organic",
  );
  return output;
};

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const tempOverView = fs.readFileSync(
  "./templates/template_overview.html",
  "utf-8",
);

const tempProduct = fs.readFileSync(
  "./templates/template_product.html",
  "utf-8",
);

const tempCard = fs.readFileSync("./templates/template_card.html", "utf-8");

const parsedData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = parsedData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverView.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    console.log(query);
    res.end("This is the product route");

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "localhost", () => {
  console.log("Listening to requests on port 8000");
});
