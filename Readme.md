
# Gestion File d'Attente

## Description

Ce projet est une API de gestion des files d'attente, des guichets, des tickets, et des utilisateurs. Elle permet la gestion complète  des utilisateurs, des tickets de file d'attente, des guichets, et offre plusieurs opérations CRUD (Create, Read, Update, Delete).

L'API est construite avec **PostgreSQL** comme base de données relationnelle et **Prisma** comme ORM.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (version 16+ recommandée) : [Télécharger Node.js](https://nodejs.org/)
- **PostgreSQL** : [Installer PostgreSQL](https://www.postgresql.org/download/)
- **Prisma CLI** : [Installation de Prisma](https://www.prisma.io/docs/getting-started)

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/shyshasy/Backend_certification_project.git
cd Backend_certification_project
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données PostgreSQL

1. Créez une base de données PostgreSQL localement ou via un service cloud (ex. Heroku, Supabase).
2. Dans le fichier `.env`, configurez la chaîne de connexion pour PostgreSQL, comme ceci :

    ```bash
    DATABASE_URL="postgresql://<utilisateur>:<motdepasse>@<host>:<port>/<nom_de_la_base_de_donnees>?schema=public"
    ```

    Par exemple :
    ```bash
    DATABASE_URL="postgresql://postgres:password@localhost:5432/gestion_file_attente?schema=public"
    ```

### 4. Initialiser Prisma

1. Générez le client Prisma à partir du schéma :

    ```bash
    npx prisma generate
    ```

2. Exécutez les migrations pour configurer la base de données :

    ```bash
    npx prisma migrate dev --name init
    ```

Cela créera les tables nécessaires dans PostgreSQL en fonction du schéma Prisma défini dans `prisma/schema.prisma`.

### 5. Démarrer le serveur

Lancez le serveur avec la commande suivante :

```bash
npm start
```

L'API sera disponible à l'adresse `http://localhost:5002`.

## Modèles Prisma

Le projet utilise les modèles Prisma suivants pour gérer les entités **Utilisateur**, **Guichet**, **Ticket**, et **Evaluation** :

```prisma
model Utilisateur {
  id        Int      @id @default(autoincrement())
  nom       String   @db.VarChar(50)
  role      String   @db.VarChar(50) 
  email     String   @unique @db.VarChar(250)
  status    Boolean
  password  String   @db.VarChar(255)

  tickets   Ticket[] @relation("UtilisateurTickets")
("UtilisateurEvaluations")
}

model Guichet {
  id              Int      @id @default(autoincrement())
  numero_guichet  Int      @unique
  statut          Boolean
  responsable     String   @db.VarChar(50)

  tickets         Ticket[] @relation("GuichetTickets")
}

model Ticket {
  id                Int        @id @default(autoincrement())
  statut            Boolean    @default(true)
  date_heure_creation DateTime
  numero            string       @unique

  guichet_id        Int
  utilisateur_id    Int

  guichet           Guichet    @relation("GuichetTickets", fields: [guichet_id], references: [id])
  utilisateur       Utilisateur @relation("UtilisateurTickets", fields: [utilisateur_id], references: [id])
}


```

## Endpoints

### 1. Utilisateurs

- **Récupérer tous les utilisateurs** : `GET /utilisateurs`
- **Créer un nouvel utilisateur** : `POST /utilisateurs`
  - Exemple de corps de requête :
    ```json
    {
      "nom": "Aichetou Taher Sy",
      "role": "Admin",
      "email": "aichetou@example.com",
      "status": true,
      "password": "password123"
    }
    ```
- **Supprimer un utilisateur** : `DELETE /utilisateurs/:id`

### 2. Guichets

- **Récupérer tous les guichets** : `GET /guichets`
- **Créer un nouveau guichet** : `POST /guichets`
  - Exemple de corps de requête :
    ```json
    {
      "numero_guichet": 3,
      "statut": true,
      "responsable": "Ali Ould Ahmed"
    }
    ```
- **Supprimer un guichet** : `DELETE /guichets/:id`

### 3. Tickets

- **Récupérer tous les tickets** : `GET /tickets`
- **Créer un nouveau ticket** : `POST /tickets`
  - Exemple de corps de requête :
    ```json
    {
      "statut": true,
      "numero": 105,
      "guichet_id": 1,
      "utilisateur_id": 2
    }
    ```
- **Supprimer un ticket** : `DELETE /tickets/:id`

### 4. Évaluations

- **Récupérer toutes les évaluations** : `GET /

## Utilisation de Postman

1. **Importer la collection Postman** : Importez la collection `postman_collection.json` dans Postman pour faciliter les tests.
2. **Tester l'API** : Effectuez des requêtes CRUD pour tester les différentes routes de l'API.

## Développement

### Migration de base de données

Lorsque vous modifiez votre modèle Prisma, vous pouvez créer une nouvelle migration et l'appliquer à votre base de données PostgreSQL :

```bash
npx prisma migrate dev --name <nom_de_la_migration>
```

Cela mettra à jour votre base de données avec les nouveaux changements.

### Documentation

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)


# Auteur # 

[Aichetou Taher Sy](https://github.com/shyshasy)
