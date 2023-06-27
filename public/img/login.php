<?php
require 'config.php';

if(isset($_SESSION['usuario']))
    return header('Location: index.php');

if( isset($_POST['matricula']) ) {
    $matricula = $_POST['matricula'];
    $senha = $_POST['senha'];
    
    $sql = "SELECT * FROM usuarios WHERE matricula = '{$matricula}' LIMIT 1";

    $result = $conexao->query($sql);

    if ($result->num_rows <= 0)
        return header('Location: login.php?erro=1');

    $usuario = $result->fetch_assoc();
    
    if( password_verify($senha, $usuario['senha']) ) {
        $_SESSION['usuario'] = [
            'nome' => $usuario['nome'],
            'tipo' => $usuario['tipo']
        ];
        return header('Location: index.php');
    }
    
    return header('Location: login.php?erro=1');
}
  
$conexao->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" type="image/jpg" href="img/icon.png">
    <link rel="stylesheet" type="text/css" href="master/form.css" media="screen" />
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário | SST</title>
</head>
<body>
    <div class="box">
        <form method="POST">
                <legend><b>Login de Alunos</b></legend>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="matricula" id="matricula" class="inputUser" maxlength="11" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required>
                    <label for="matricula" class="labelInput">Matricula</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="password" name="senha" id="senha" class="inputUser" maxLenght="8" required>
                    <label for="matricula" class="labelInput">Senha</label>
                </div>
                <br>
                <button type="submit" id="submit">Enviar</button>
                <br><br>
                <p class="pt" >Não tem uma conta?</p><a class="lk" href="form.php">Cadastre-se!</a>
        </form>
    </div>
</body>
</html>