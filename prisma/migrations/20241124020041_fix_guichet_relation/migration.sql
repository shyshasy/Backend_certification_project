/*
  Warnings:

  - Added the required column `nom` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_guichet_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_utilisateur_id_fkey";

-- DropIndex
DROP INDEX "Ticket_numero_key";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "nom" VARCHAR(50) NOT NULL,
ADD COLUMN     "telephone" INTEGER NOT NULL,
ALTER COLUMN "statut" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Ticket_utilisateur_id_idx" ON "Ticket"("utilisateur_id");

-- CreateIndex
CREATE INDEX "Ticket_guichet_id_idx" ON "Ticket"("guichet_id");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_guichet_id_fkey" FOREIGN KEY ("guichet_id") REFERENCES "Guichet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
