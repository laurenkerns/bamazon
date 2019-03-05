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
    // console.log("connected as id" + connection.threadID + "\n");
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

function question(){
    inquirer
        .prompt([
            {
                name: "itemID",
                type: "input",
                message: "What product would you like to buy? Enter the Product ID",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?",
            }
        ])
        .then(function(anwser){
            var quantity = anwser.quantity;
        
            var query = 'select ID, product_name, department_name, price, stock_quantity from products where ?';
            connection.query(query ,anwser.itemID, function(err, res){
                var price = (res[0].price);
                var total = quantity * price;
                if(err) throw err;
                if (res[0].stock_quantity - quantity >= 0) {
                    console.log("We'll get right on that order! Your total is: " + total);
                }
                else{
                    console.log("Sorry not enough inventory!")
                }
                connection.end();
    
            });
        });           
};
    

    


    
