var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id" + connection.threadID + "\n");
    showProducts()
});

//display all items to the user
function showProducts() {
    connection.query('select * from products', function(err, results){
        if(err) throw err;

        for (var i = 0; i < results.length; i++){
            console.log("Product ID: " + results[i].ID + " || Product Name: " + results[i].product_name + "|| Department: " + results[i].department_name + "|| Price: " + results[i].price + "|| Stock Quantity: " + results[i].stock_quantity);
        }

        question(results.length);       
    });
}


//Prompt question

function question(res){inquirer
    .prompt([
        {
        name: "item ID",
        type: "input",
        message: "What product would you like to buy? Enter the Product ID"
        },
        {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
        }
    ]).then(function(anwser){
        if()
    })
}
    
