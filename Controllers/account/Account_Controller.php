<?php

const UPLOADS_DIR = "../uploads/";


include "../../Models/Database.php";

session_start();

$database = new Database();
try
{
    if(isset($_POST['account_update']))
    {
        //Profile Section
        $vendorname = $_POST['name'];
        $address = $_POST['address'];
        $contactNo = $_POST['contactNo'];
        //Password Section
        $new_password = $_POST['password'];
        $confirm_password = $_POST['rpassword'];
        
            //Profile Controls
            $database->query("UPDATE users SET `username` = '$vendorname' where email_id = '".$_SESSION["emailid"]."'");
            $database->query("UPDATE users SET `address` = '$address' where email_id = '".$_SESSION["emailid"]."'");
            $database->query("UPDATE users SET `contactNo` = '$contactNo' where email_id = '".$_SESSION["emailid"]."'");

            //Avatar Controls
            if( ($_FILES["profile_avatar"]["size"] > 0) )
            {
                $image = $_FILES["profile_avatar"];
        
                if ($image["size"] < 1048576)
                {
                    if ( file_exists("../".UPLOADS_DIR.$_SESSION["emailid"].".jpg") ) unlink("../".UPLOADS_DIR.$_SESSION["emailid"].".jpg");
                    if ( file_exists("../".UPLOADS_DIR.$_SESSION["emailid"].".png") ) unlink("../".UPLOADS_DIR.$_SESSION["emailid"].".png");
                    if ( file_exists("../".UPLOADS_DIR.$_SESSION["emailid"].".jpeg") ) unlink("../".UPLOADS_DIR.$_SESSION["emailid"].".jpeg");
                        
                    $extension = '.'.pathinfo($image["name"],PATHINFO_EXTENSION);
                    
                    if( $extension === (".png"||".jpg"||".jpeg") ) {echo "image_mime_type_not_allowed";exit();} 
    
                    
                    $_SESSION["image"] = UPLOADS_DIR.$_SESSION["emailid"].$extension;
                    move_uploaded_file($image["tmp_name"], "../".$_SESSION["image"]);
                    $database->query("UPDATE users set user_image = '".$_SESSION['image']."' where email_id = '".$_SESSION["emailid"]."';");
                }   
                else
                {    
                    echo "image_size_greater_than_1MB";exit();
                }  
            }

            //Password Controls
            if ( ($new_password.$confirm_password) != "" ) 
            {
                if($new_password === $confirm_password)
                $database->query("UPDATE users SET `user_password` = '".password_hash($new_password,PASSWORD_DEFAULT)."' where email_id = '".$_SESSION["emailid"]."'");    
                else
                {echo "password_check_failed";exit();}
            }

            $_SESSION["username"] = $vendorname;  
            $_SESSION["address"] = $address;
            $_SESSION["contactno"] = $contactNo;
            
            echo "true";

        }
}
catch(Exception $e)
{
    echo $e->getMessage();
}
