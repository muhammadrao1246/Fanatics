<?php
// Database connection
class Database 
{
    private $pdo; // PDO
    private $result; // PDO statement
    private $row; // Associative array of fields

    function __construct() 
    {
        $this->pdo = new PDO("mysql:host=localhost;dbname=fanatics","root","");
        
        $this->query("create table if not exists users (user_id int AUTO_INCREMENT, email_id varchar(100), username varchar(50), address varchar(200), contactNo varchar(20), user_password varchar(100), user_image varchar(100), CONSTRAINT user_id_primary_chk PRIMARY KEY (user_id), CONSTRAINT email_id_unique_chk UNIQUE (email_id));");
        $this->query("create table if not exists product (product_id int AUTO_INCREMENT PRIMARY KEY, product_name varchar(100), product_description varchar(250), product_price int, product_size varchar(50),product_quantity int,product_date datetime default current_timestamp, product_image varchar(100),product_status int(1) default 1,user_id int);");
        $this->query("CREATE TABLE if not exists audit 
        (
            audit_id int AUTO_INCREMENT PRIMARY KEY,
            product_id int,
            modify_date datetime DEFAULT current_timestamp,
            modify_status varchar(30),
            product_quantity int,
            `user_id` int
        );");
        $this->query("CREATE table if not exists orders 
        (
            order_id int AUTO_INCREMENT primary key,
            order_date datetime default CURRENT_TIMESTAMP,
            customer_id int
        )");
        $this->query("CREATE table if not exists products_per_order 
        (
            order_id int,
            product_id int,
            product_quantity int,
            product_price int,
            constraint order_id_fk foreign key (order_id) references orders(order_id)
        )");
        
        $this->query("create view IF NOT EXISTS fullaudit as select audit.audit_id as id, audit.user_id as user_id, product.product_id as product_id, product.product_name as name, product.product_description as description, product.product_price as price, product.product_size as size, audit.product_quantity as quantity, product.product_image as image, audit.modify_date as perdate, audit.modify_status as status from audit,product where audit.product_id = product.product_id;");

        $this->query("CREATE VIEW IF NOT EXISTS sales_detail as select product.user_id as user_id, orders.order_id as order_id, products_per_order.product_id as product_id, product.product_name as product_name, product.product_image as product_image, product.product_price as per_unit_price, products_per_order.product_quantity as product_quantity, (product.product_price * products_per_order.product_quantity) as total_amount, orders.order_date as order_date from products_per_order,orders,product where orders.order_id = products_per_order.order_id and products_per_order.product_id = product.product_id;");
        
        sleep(1);
        $this->query("SELECT COUNT(*) AS `count` FROM `orders`");
        $this->next();
        if ($this->get("count") == 0) 
        {
            $this->transaction();

            // Add mock chargers and mock users
            foreach (json_decode(file_get_contents("../../Models/ordersjson.json")) as $order)
                $this->query("INSERT INTO `orders` (`order_id`, `order_date`, `customer_id`) VALUES($order->order_id, \"".date("Y-m-d H:i:s", strtotime($order->order_date))."\", $order->customer_id)");
            foreach (json_decode(file_get_contents("../../Models/products_per_orderjson.json")) as $ordered)
                $this->query("INSERT INTO `products_per_order`(`order_id`, `product_id`, `product_quantity`, `product_price`) VALUES(?, ?, ?, ?)", $ordered->order_id, $ordered->product_id, $ordered->product_quantity, $ordered->product_price);
            
            
            $this->commit();
        }
    }

    // Begin a transaction
    function transaction() {
        $this->pdo->beginTransaction();
    }

    // Commit a transaction
    function commit() {
        $this->pdo->commit();
    }

    // Execute query `sql` substituting `values` for ? symbols
    function query($sql, ...$values) 
    {
        if ($values) 
        {
            $sql_ = $sql;
            $sql = "";
            for ($i = 0, $v = 0; $i < strlen($sql_); $i++)
                if ($sql_[$i] == "?") 
                {
                    if (is_null($values[$v]))
                        $values[$v] = "NULL";
                    elseif (is_string($values[$v]))
                        $values[$v] = $this->pdo->quote($values[$v]); // perform quotation
                    elseif (is_bool($values[$v]))
                        $values[$v] = $values[$v]? "TRUE" : "FALSE";
                    $sql .= $values[$v++];
                } 
                else
                    $sql .= $sql_[$i];
        }
        $this->result = $this->pdo->query($sql);
        return $this->pdo->lastInsertId();
    }

    // Go to the next row (return true if exists)
    function next() 
    {
        // if( $this->result )
        // return ($this->row = $this->result->fetch(PDO::FETCH_ASSOC));
        // else return false;
        return $this->row = $this->result->fetch(PDO::FETCH_ASSOC);
    }

    // Get the `column` column of the row
    function get($column) {
        return $this->row[$column];
    }

}
