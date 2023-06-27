<?php
    session_start();

    $dbHost = 'localhost';
    $dbUsername = 'mateust_pablo';
    $dbPassword = 'pablo@p4bl0#P4B1O';
    $dbName = 'mateust_pablo';

    $conexao = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);

    if($conexao->connect_errno)
    {
        echo "DEU ERRADO BIXO";
    }
?>
