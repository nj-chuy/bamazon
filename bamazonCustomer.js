var inquirer = require("inquirer");
var mysql = require("mysql");

//server connection
var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});


con.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + con.threadId);
  readProducts();
});

//Displays all the products for sale in a list.
function readProducts() {
  con.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log("Displaying products from " + res[0].department_name);
    
    //loop through the array to console.log all products
    for (var i = 0; i < res.length; i++) {
      
      console.log(" " + res[i].id + "    | " + res[i].product_name + " -- " + res[i].department_name + "--" + res[i].price + "--" + res[i].quantity);
    }

    startInquirer(res);
  });
}


// ask user question start the inquirer
function startInquirer(x) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'product',
      message: 'Which product would you like to buy?(Enter product ID)'
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Enter the amount you would like to buy?'
    }
  ]).then(function (inquirerRes) {
    let query = "UPDATE products SET quantity = quantity - ? WHERE id = ?";
    // connection query to check the result of the before mentioned let query to see if quantity and product exist
    con.query(query, [inquirerRes.quantity, x[inquirerRes.product - 1].id], function (err) {
      if (err) throw err;
      // if quantity is not available throw console.log of insufficent quantity
      if (x[inquirerRes.product - 1].quantity <= 0 || inquirerRes.quantity > x[inquirerRes.product - 1].quantity) {
        console.log('Insufficient quantity!');
      } else {
        let total = ((x[inquirerRes.product - 1].price) * inquirerRes.quantity).toFixed(2);
        console.log("The total of your purchase is $" + total +
          "\nSuccessfully purchased " + inquirerRes.quantity + ' of ' + x[inquirerRes.product - 1].product_name + '.');
      }
    });
    con.end();
  });
}
