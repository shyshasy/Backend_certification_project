/*
  Warnings:

  - You are about to drop the column `date_heure_creation` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `guichet_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateur_id` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telephone]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `telephone` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_guichet_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_utilisateur_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "date_heure_creation",
DROP COLUMN "guichet_id",
DROP COLUMN "utilisateur_id",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "guichetId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "utilisateurId" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "statut" SET DEFAULT 'en_attente',
ALTER COLUMN "statut" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "telephone" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_telephone_key" ON "Utilisateur"("telephone");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_guichetId_fkey" FOREIGN KEY ("guichetId") REFERENCES "Guichet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
