import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const usuario = await prisma.usuario.create({
        data: {
            nome: 'Jonata Venâncio',
            email: 'jon@gmail.com',
            senha: '123',
            postagem: {
                create: {
                    Cod_Post: 1,
                    titulo: 'Teste',
                    conteudo: 'Teste legalzinho'
                }
            }
        },
    });

    /*const postagem = await prisma.postagem.create({
        data:{
            Cod_Post: 1,
            titulo: 'LP-2023',
            conteudo: 'Instale o prisma pela documentação no Quickstart do prisma',
        },
    });*/
    console.log(usuario);
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