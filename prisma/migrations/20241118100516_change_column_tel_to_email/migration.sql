/*
  Warnings:

  - You are about to drop the column `date` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `guichetId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateurId` on the `Ticket` table. All the data in the column will be lost.
  - The `statut` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `telephone` on the `Utilisateur` table. All the data in the column will be lost.
  - Added the required column `date_heure_creation` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guichet_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `utilisateur_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_guichetId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_utilisateurId_fkey";

-- DropIndex
DROP INDEX "Utilisateur_telephone_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "date",
DROP COLUMN "guichetId",
DROP COLUMN "utilisateurId",
ADD COLUMN     "date_heure_creation" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guichet_id" INTEGER NOT NULL,
ADD COLUMN     "utilisateur_id" INTEGER NOT NULL,
DROP COLUMN "statut",
ADD COLUMN     "statut" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Utilisateur" DROP COLUMN "telephone";

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_guichet_id_fkey" FOREIGN KEY ("guichet_id") REFERENCES "Guichet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
