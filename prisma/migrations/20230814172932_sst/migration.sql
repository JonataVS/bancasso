/*
  Warnings:

  - You are about to drop the column `tipo` on the `Usuario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "sexo" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("email", "id", "nome", "senha", "sexo") SELECT "email", "id", "nome", "senha", "sexo" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
