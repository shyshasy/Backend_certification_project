/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ticket_numero_key" ON "Ticket"("numero");
