<?php 

const UPLOADS_DIR = "../assets/img/";

include "../../Models/Database.php";

$database = new Database();

session_start();
// date("Y-m-d")
try 
{
    if ( isset($_POST) ) 
    {
        $date = date("Y-m-d")." ".date("H:i:s",time());
        // echo json_encode($_POST);
        $name = $_POST["name"];
        $size = $_POST["size"];
        $desc = $_POST["description"];
        $price = $_POST["price"];
        $qty = $_POST["qty"];

        $id = isset($_POST["id"]) ? $_POST["id"] : false;
            
        $code = null;
    
        if ( isset($_POST["add_product"]) ) 
        {
            $code = 100;
            $database = new Database();
            $id = $database->query("INSERT INTO `product` (`product_id`, `product_name`, `product_description`, `product_price`, `product_size`, `product_quantity`, `product_date`, `product_image`, `product_status`, `user_id`) VALUES (NULL, '".$name."', '".$desc."', '".$price."', '".$size."', '".$qty."', '".$date."','../assets/media/products/default.png','1','".$_SESSION['id']."')");    
        }
        else if( isset($_POST["edit_product"]) )
        {
            $database->query("UPDATE product set product_name = '$name',product_size = '$size',product_description = '$desc',product_price = $price,product_quantity = $qty WHERE product_id = $id;");
            $code = 101;
        }
    
        

        if( isset($_FILES["image"]) )
        {
            if( ($_FILES["image"]["size"] > 0) )
            {
                    $image = $_FILES["image"];
            
                    if ($image["size"] < 1048576)
                    {
                        if ( file_exists("../".UPLOADS_DIR.$id.".jpg") ) unlink("../".UPLOADS_DIR.$id.".jpg");
                        if ( file_exists("../".UPLOADS_DIR.$id.".png") ) unlink("../".UPLOADS_DIR.$id.".png");
                        if ( file_exists("../".UPLOADS_DIR.$id.".jpeg") ) unlink("../".UPLOADS_DIR.$id.".jpeg");
                            
                        $extension = '.'.pathinfo($image["name"],PATHINFO_EXTENSION);
                        
                        if( $extension === (".png"||".jpg"||".jpeg") ) {echo "image_mime_type_not_allowed";exit();} 
        
                        
                        $product_image_path = UPLOADS_DIR.$id.$extension;
                        move_uploaded_file($_FILES["image"]["tmp_name"], "../".$product_image_path);                        
                        $database->query("UPDATE product set product_image = '".$product_image_path."' where product_id = '".$id."';");
                    }   
                    else
                    {    
                        echo "image_size_greater_than_1MB";exit();
                    }  
            }
        }

        

        $database->query("SELECT product_id from product where product_id = '$id'");
        $database->next();
        echo ($database->get("product_id")).":".$code;
        
        if ( $code == 100 )
        $database->query("INSERT into `audit` (`user_id`,`product_id`,`modify_date`,`modify_status`,`product_quantity`) values ('".$_SESSION["id"]."','".$database->get("product_id")."','".$date."','Added','".$qty."')");
        else
        $database->query("INSERT into `audit` (`user_id`,`product_id`,`modify_date`,`modify_status`,`product_quantity`) values ('".$_SESSION["id"]."','".$database->get("product_id")."','".$date."','Updated','".$qty."')");
        
        // echo $code;
    }
} 
catch (Exception $d) 
{
    echo $d->getMessage();
}

?>