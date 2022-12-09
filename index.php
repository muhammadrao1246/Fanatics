<?php

    include "Models/Database.php";
    session_start();
    print_r($_SESSION);
    include "Controllers/Logout_Controller.php";
    include "Views/index.phtml";

?>