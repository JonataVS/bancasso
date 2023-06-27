<?php
$nome = $_POST['nome'];
$email = $_POST['email'];
$duvida = $_POST['duvida'];
$mensagem = $_POST['mensagem'];

$assunto = "Teste contato barbearia ".time();
$destino = "pabloftavares460@gmail.com";

$corpo = "Nome: $nome
Email: $email
Dúvida: $duvida
Mensagem: $mensagem";

$payload = [
    "subject" => $assunto,
    "body" => $corpo,
    "from" => "teste@mgconsultoriaecursos.com.br",
    "to" => $destino,
    "headers" => [
        "Content-Type" => "text/html"
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://api.smtplw.com.br/v1/messages");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json','x-auth-token: 5e85a1e62596ede60fb01f6fcb5c3909'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$payload = json_encode( $payload );
curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload );
$server_output = curl_exec($ch);
curl_close($ch);

header("Location: index.php")
?>
