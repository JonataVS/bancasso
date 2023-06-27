<?php

require 'config.php';
$conexao->close();

unset($_SESSION['usuario']);
session_destroy();

header('Location: login.php');