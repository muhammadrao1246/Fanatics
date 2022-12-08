<?php

include "../Models/Database.php";

$database = new Database();

session_start();

if(isset($_GET['login']))
{
    $email_id = $_GET['email'];
    $password = $_GET['password'];

    $database->query("SELECT * FROM USERS WHERE email_id = '$email_id';");
    
    if ( $database->next() ) 
    {
        if ( password_verify($password, $database->get('user_password')) ) 
        {
            $_SESSION = ["emailid"=> $email_id, "address"=> $database->get("address"), "contactno"=> $database->get("contactNo")];
            echo "true";
        }
        else
        {
            echo "password_check_failed";
        }
    }
    else
    {
        echo 'user_does_not_exists';
    }

}
else if(isset($_GET['logout']))
{
    unset($_SESSION);
    session_destroy();
}
    