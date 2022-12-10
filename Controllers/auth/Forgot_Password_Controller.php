<?php

require_once "../../Models/Database.php";

$database = new Database();

session_start();


    if( $_POST['forgot_Password'] )
    {
        $otp_code = "";    
        for( $i=0 ; $i < 6 ; $i++ )
            $otp_code .= rand(0,9);

        
        
        $email = $_POST['email'];
        $database->query("SELECT * FROM USERS WHERE email_id = '$email';");

        if( $database->next() )
        {
            echo "Mail is sent to you";
        }
        else
        {
            echo "user_does_not_exists";
        }
    }
    else if( $_POST['change_password'] )
    {

    }

?>