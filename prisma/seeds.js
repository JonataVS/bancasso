import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const usuario = await prisma.usuario.create({
        data: {
            id: 1,
            name: 'Jonata Venâncio',
            email: 'jonata@gmail.com',
            senha: '123',
            sexo: 'masculino',

        },
    });

    const postagem = await prisma.postagem.create({
        data:{
            Cod_Post: 1,
            titulo: 'LP-2023',
            conteudo: 'Intale o prisma pela documentação no quickstart prisma'
        },
    });
}
main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});