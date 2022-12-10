<?php
session_start();

if (isset($_SESSION['username']))
{
    include "../Models/Database.php";
    include "../Controllers/auth/Logout_Controller.php";
}

//If some how user pressed logout button this will run or the page is accessed directly by GET method then also it will run
if( !isset($_SESSION['username']) )
{
    header("Location: ../");
}

//We always check before displaying dashboard whether user has logged in  or not
if(isset($_SESSION['username']))
{
    include "../Views/templates/header.phtml";
    include "../Views/dashboard.phtml";
    include "../Views/templates/footer.phtml";
}
?>