-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guichet" (
    "id" SERIAL NOT NULL,
    "numero_guichet" INTEGER NOT NULL,
    "statut" BOOLEAN NOT NULL,
    "responsable" VARCHAR(50) NOT NULL,

    CONSTRAINT "Guichet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "statut" BOOLEAN NOT NULL,
    "date_heure_creation" TIMESTAMP(3) NOT NULL,
    "numero" INTEGER NOT NULL,
    "guichet_id" INTEGER NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" SERIAL NOT NULL,
    "satis_score" INTEGER NOT NULL,
    "commentaire" TEXT NOT NULL,
    "date_evaluation" TIMESTAMP(3) NOT NULL,
    "utilisateur_id" INTEGER NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_guichet_id_fkey" FOREIGN KEY ("guichet_id") REFERENCES "Guichet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
