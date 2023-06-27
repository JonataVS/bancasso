<?php
require 'config.php';

if(isset($_SESSION['usuario']))
    return header('Location: index.php');

$cadastrook = (isset($_GET['cadastro']) && $_GET['cadastro']);
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
        <form action="cadastro.php" method="POST">
                <?php if( $cadastrook ): ?>
                <div style="background: green; color: white; padding: 10px 15px; border-radius: 5px; text-align: center; font-weight: bold;">Cadastro Realizado</div>
                <?php endif; ?>
                <br>
                <legend><b>Fórmulário de Alunos</b></legend>
                <br>
                <div class="inputBox">
                    <input type="text" name="nome" id="nome" class="inputUser" required>
                    <label for="nome" class="labelInput">Nome completo</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="matricula" id="matricula" class="inputUser" maxlength="11" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required>
                    <label for="matricula" class="labelInput">Matricula</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="senha" id="senha" class="inputUser" maxlength="8"  required>
                    <label for="matricula" class="labelInput">Senha</label>
                </div>
                <p>Sexo:</p>
                <input type="radio" id="feminino" name="genero" value="feminino" required>
                <label for="feminino">Feminino</label>
                <br>
                <input type="radio" id="masculino" name="genero" value="masculino" required>
                <label for="masculino">Masculino</label>
                <br>
                <input type="radio" id="outro" name="genero" value="outro" required>
                <label for="outro">Outro</label>
                <br><br>
                <label for="data_nascimento"><b>Data de Nascimento:</b></label>
                <input type="date" name="data_nascimento" id="data_nascimento" required>
                <br><br><br>
                <div class="inputBox">
                    <input type="text" name="cidade" id="cidade" class="inputUser" required>
                    <label for="cidade" class="labelInput">Cidade</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="estado" id="estado" class="inputUser" required>
                    <label for="estado" class="labelInput">Estado</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="endereco" id="endereco" class="inputUser" required>
                    <label for="endereco" class="labelInput">Endereço</label>
                </div>
                <br>
                <input type="submit" name="submit" id="submit">
                <br><br>
                <a href="login.php">Volte ao Login</a>
        </form>
    </div>
</body>
</html>