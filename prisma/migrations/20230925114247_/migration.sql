/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Postagem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postagem" (
    "Cod_Post" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL
);
INSERT INTO "new_Postagem" ("Cod_Post", "conteudo", "titulo") SELECT "Cod_Post", "conteudo", "titulo" FROM "Postagem";
DROP TABLE "Postagem";
ALTER TABLE "new_Postagem" RENAME TO "Postagem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
