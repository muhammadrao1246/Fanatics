<?php


include "../../Models/Database.php";

session_start();

$database = new Database();

try
{
    if(isset($_GET['signup']))
    {
        $email_id = $_GET['email'];
        $username = $_GET['fullname'];
        $address = $_GET['address'];
        $code = $_GET['country_code'];
        $contactNo = $_GET['contactNo'];
        $new_password = $_GET['password'];
        $confirm_password = $_GET['rpassword'];

        $database->query("SELECT * FROM USERS WHERE email_id = '$email_id';");
        
        if ( !$database->next() ) 
        {
            
            if ( $new_password === $confirm_password ) 
            {
                $database->query("INSERT INTO USERS VALUES (null,'$email_id','$username','$address','".$code.$contactNo."','".password_hash($new_password,PASSWORD_DEFAULT)."')");
                $_SESSION =  ["emailid"=> $email_id, "username"=> $username, "address"=> $address, "contactno"=> $contactNo] ;
                echo "true";
            }
            else
            {
               echo "password_check_failed"; 
            }
        }
        else
        {
            echo "User_exists_already";
        }

    }
}

catch(Exception $e)
{
    echo $e->getMessage();
}