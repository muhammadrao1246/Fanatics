<?php


include "../Models/Database.php";

$database = new Database();

try
{
    if(isset($_GET['signup']))
    {
        $email_id = $_GET['email'];
        $username = $_GET['name'];
        $address = $_GET['address'];
        $contactNo = $_GET['contactNo'];
        $is_vendor = isset($_GET['isVendor']) ? $_GET['isVendor'] : 0;
        $new_password = $_GET['npass'];
        $confirm_password = $_GET['cpass'];

        $database->query("SELECT FROM USERS WHERE email_id = $email_id");
        
        if ( !$database->next() ) 
        {
            if ( strcmp($new_password, $confirm_password) ) 
            {
                $database->query("INSERT INTO USERS VALUES (null,'$email_id','$username','$address','$contactNo','".password_hash($new_password,PASSWORD_DEFAULT)."')");
                $_SESSION =  ["emailid"=> $email_id, "address"=> $address, "contactno"=> $contactNo] ;
                print_r($_SESSION);
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