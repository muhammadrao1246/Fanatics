<?php 

const UPLOADS_DIR = "../assets/img/";

include "../../Models/Database.php";

$database = new Database();


try 
{
    if(isset($_GET["id"]))
    {
        $database->query("SELECT * from product WHERE product_id =".$_GET["id"].";");
        echo json_encode($database->next());
    }
} 
catch (Exception $d) 
{
    echo $d->getMessage();
}

?>