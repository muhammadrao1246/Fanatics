<?php


session_start();
if (!isset($_SESSION['username']))
{
    include "Views/login.phtml";
}
else
{
    echo "<script>
                if(history.forward() == undefined)
                    window.location.href = 'dashboard/';
        </script>";
}

?>