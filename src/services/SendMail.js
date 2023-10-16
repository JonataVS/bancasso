import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js'

async function createNewUser(to) {
    try {
        const config = await mailConfig();

        const transporter = nodemailer.createTransport(config);

        const info = await transporter.sendMail({
            from: 'noreplay@gmail.com',
            to,
            subject: 'Conta criada com sucesso',
            text: 'Conta criada, acesse a página principal, para ter acesso aos seus conteúdos',
            html: '<h1>Sua conta foi criada!<h1><p>Faça login para ter acesso aos conteúdos<p>'
        });
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`Send Email: ${nodemailer.getTestMessageUrl(info)}`);
        }
    } catch (err) {
        throw new Error(err);
    }
}

async function createNewPost(to) {
    try {
        const config = await mailConfig();

        const transporter = nodemailer.createTransport(config);

        const info = await transporter.sendMail({
            from: 'noreplay@gmail.com',
            to,
            subject: 'Postagem criada com sucesso',
            text: 'Sua postagem foi criada, você pode ter acesso as postagens clicando na aba POSTAGENS',
            html: '<h1>Postagem criada com sucesso!<h1><p>Veja as postagens na aba POSTAGENS<p>'
        });

        if (process.env.NODE_ENV === 'development') {
            console.log(`Send Email: ${nodemailer.getTestMessageUrl(info)}`);
        }
    } catch (err) {
        throw new Error(err);
    }
}

export default { createNewUser, createNewPost };