import nodemailer from 'nodemailer';

async function mailConfig() {
    const config = {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE == 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    };
    
    if (process.env.NODE_ENV === 'development') {
        const testAccount = await nodemailer.createTestAccount();
        config.auth = {
            user: 'jonata.venancio@academico.ifpb.edu.br',
            pass: '57prppJ221!'
        };
    }
    return config;
}

export default mailConfig;