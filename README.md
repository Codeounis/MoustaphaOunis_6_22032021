# MoustaphaOunis_6_22032021
So-Pekocko-p6

Projet 6 Open ClassRooms

VISUALISER LE PROJET

Afin de visualiser correctement le projet veuillez suivre les étapes ci dessous:
1- Cloner le repository du backend (lien dans le depôt OPC), Le lien du front-end est disponible dans la page de description de la mission.
2- Remplacer le fichier .env par celui fourni dans le depôt du projet openclassrooms dans le dossier backend.
3- Ouvrir un premier terminal dans le dossier backend, éxécuter "npm init" et installer si nécessaire le framework EXPRESS via la commande "npm i express".
4- Puis lançer la commande "nodemon server" ou "npm start".
5- Si nécessaire, la liste des modules node suppélmentaire installés sont disponibles à la fin du README.
6- Ouvrir un second terminal dans le dossier frontend puis lançer la commande "ng serve".



INTRODUCTION

Voici mon 6 ème projet dans le cadre de ma formation developpeur web ( chez OpenClassRooms). Chaque projet s'accompagne d'un scénario et d'un cahier des charges.

PRESENTATION DU PROJET

Vous êtes développeur backend freelance et vous travaillez depuis quelques années sur des projets web pour des startups ou des grandes entreprises.

La semaine dernière, vous avez reçu un mail vous proposant un nouveau projet.

La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.

CAHIER MVP

Front end déja frouni

Réalisation d'une API
- l’API doit respecter le RGPD et les standards OWASP.

- Le mot de passe des utilisateurs doit être chiffré.

- 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données.

La sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine.

L’authentification est renforcée sur les routes requises.

Les mots de passe sont stockés de manière sécurisée.

Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

Le front-end ne doit pas être modifié.

Technologies à utiliser :

Framework : Express ;
Serveur : NodeJS ;
Base de données : MongoDB ;
Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

Liste des modules node installés:

EXPRESS
BCRYPT
DDOS
EXPRESS-MONGO-SANITIZE
DOTENV
HELMET
JSONWEBTOKEN
MONGOOSE
MONGOOSE-UNIQUE-VALIDATOR
MULTER
MASKDATA
