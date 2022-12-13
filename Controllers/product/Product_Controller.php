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
        $name = $_POST["name"];
        $size = $_POST["size"];
        $desc = $_POST["description"];
        $price = $_POST["price"];
        $qty = $_POST["qty"];

        $id = isset($_POST["id"]) ? $_POST["id"] : false;

        $code = null;
        
try{
        if ( isset($_POST["add_product"]) ) 
        {
            echo $database->query("SELECT * from product where product_name = '$name';");

            if( $database->next() ) echo "Product Name Already Exists.";exit();
            $id = $database->query("INSERT into product values(null,'$name','$desc',$price,'$size',$qty,'".date("Y-m-d")."','../assets/media/products/default.png',1,".$_SESSION["id"].")");    
            echo $id;
            $code = 100;
        }
        else if( isset($_POST["edit_product"]) )
        {
            $database->query("UPDATE product set product_name = '$name',product_size = '$size',product_description = '$desc',product_price = $price,product_quantity = $qty WHERE product_id = $id;");
            $code = 101;
        }
    }
    catch(Exception $e)
    {
        echo $e->getMessage();
    }

        move_uploaded_file($_FILES["image"]["tmp_name"], "../".$product_image_path);
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
                        
                        $database->query("UPDATE product set product_image = '".$product_image_path."' where product_id = '".$id."';");
                    }   
                    else
                    {    
                        echo "image_size_greater_than_1MB";exit();
                    }  
            }
        }
        
        echo $code;
    }
    else if( isset($_GET["disable"]) )
    {
        $id = $_GET["id"];
    }
} 
catch (Exception $d) 
{
    echo $d->getMessage();
}

?>