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
        $this->query("create table if NOT EXISTS product (product_id int AUTO_INCREMENT PRIMARY KEY, product_name varchar(100) UNIQUE, product_description varchar(250), product_price int, product_size varchar(50),product_quantity int,product_date varchar(20), product_image varchar(100),product_status int(1) default 1,user_id int,CONSTRAINT vendor_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id))");

        // if ($this->get("count") == 0) 
        // {
        //     $this->transaction();

        //     // Add an obligatory charger and two obligatory users
        //     $charger = $this->query("INSERT INTO `chargers`(`address`, `latitude`, `longitude`, `price`) VALUES(?, ?, ?, ?)", "5 The Cresent, Salford, M5 4WT", 53.483710, -2.270110, 0.25);
        //     $this->query("INSERT INTO `users`(`username`, `name`, `password_hash`, `charger`) VALUES(?, ?, ?, ?)", "lee@lee.com", "Lee Griffiths", sha1(123456), $charger);
        //     $this->query("INSERT INTO `users`(`username`, `name`, `password_hash`) VALUES(?, ?, ?)", "user@user.com", "User Lee Griffiths", sha1(123456));

        //     // Add mock chargers and mock users
        //     $charger_ids = [];
        //     foreach (json_decode(file_get_contents("mock_chargers.json")) as $charger)
        //         $charger_ids[] = $this->query("INSERT INTO `chargers`(`address`, `latitude`, `longitude`, `price`) VALUES(?, ?, ?, ?)", $charger->address, $charger->latitude, $charger->longitude, $charger->price);
        //     foreach (json_decode(file_get_contents("mock_users_clients.json")) as $user)
        //         $this->query("INSERT INTO `users`(`username`, `name`, `password_hash`) VALUES(?, ?, ?)", $user->username, $user->name, sha1($user->password));
        //     $i = 0;
        //     foreach (json_decode(file_get_contents("mock_users_providers.json")) as $user)
        //         $this->query("INSERT INTO `users`(`username`, `name`, `password_hash`, `charger`) VALUES(?, ?, ?, ?)", $user->username, $user->name, sha1($user->password), $charger_ids[$i++]);

        //     // Update All Users Status to (Owner , Rentel) => ( 1 , 0 )
        //     $this->query("update users set is_owner = 1 where charger is not null;"); //setting all charger holder as owner by assigning "is_owner" column '1'
            
        //     $this->commit();
        // }

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
    function next() {
        return $this->row = $this->result->fetch(PDO::FETCH_ASSOC);
    }

    // Get the `column` column of the row
    function get($column) {
        return $this->row[$column];
    }

}
