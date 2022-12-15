<?php 

const UPLOADS_DIR = "../assets/img/";

include "../../Models/Database.php";

$database = new Database();

session_start();
try 
{
    if(isset($_GET["id"]))
    {
        $date = date("Y-m-d")." ".date("H:i:s",time());
        $database->query("select * from product where product_id = '".$_GET["id"]."';");
        $database->next();
        $database->query("INSERT into `audit` (`modify_date`,`user_id`,`product_id`,`modify_status`,`product_quantity`) values ('".$date."','".$_SESSION["id"]."','".$_GET["id"]."','Deleted','".$database->get("product_quantity")."')");
        
        $database->query("Update product set product_status = 0 WHERE product_id =".$_GET["id"].";");
                
        echo true;
    }
} 
catch (Exception $d) 
{
    echo $d->getMessage();
}

?>