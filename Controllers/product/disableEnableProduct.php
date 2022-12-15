<?php 

const UPLOADS_DIR = "../assets/img/";

include "../../Models/Database.php";

$database = new Database();

session_start();

try 
{
    if(isset($_GET["id"]))
    {
        $status = $_GET["status"];
        $database->query("UPDATE product SET product_status = '$status' WHERE product_id =".$_GET["id"].";");
        $msg = ($status == 1) ? "Enabled" : "Disabled"; 

        $date = date("Y-m-d")." ".date("H:i:s",time());

        $database->query("select * from product where product_id = '".$_GET["id"]."'");
        $database->next();
        $database->query("INSERT into `audit` (`user_id`,`product_id`,`modify_date`,`modify_status`,`product_quantity`) values ('".$_SESSION["id"]."','".$_GET["id"]."','".$date."','".$msg."','".$database->get("product_quantity")."')");
        
        echo $_GET["id"];
    }
} 
catch (Exception $d) 
{
    echo $d->getMessage();
}

?>