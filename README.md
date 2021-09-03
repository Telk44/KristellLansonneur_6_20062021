# Projet 6 du parcours Développeur web d'OpenClassrooms : Construire une API sécurisée pour une application d'avis gastronomiques

So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. L’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.  
Le côté frontend de l’application est déjà développé, il m’est demandé de développer la partie backend.

__Pour la réalisation de l’API:__

Les données des utilisateurs doivent être parfaitement protégées. Pour cela, l’API utilisée devra impérativement respecter des pratiques de code sécurisé.  

__Exigences concernant la sécurité :__
* l’API doit respecter le RGPD et les standards OWASP ; 
* le mot de passe des utilisateurs doit être chiffré ; 
* 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données ; 
* la sécurité de la base de données MongoDB doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine ;
* l’authentification est renforcée sur les routes requises ; 
* les mots de passe sont stockés de manière sécurisée ; 
* les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

__Erreurs API__

Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur(). 
Routes API Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer "). 

__Technologies à utiliser:__ 
* framework : Express ; 
* serveur : NodeJS ; 
* base de données : MongoDB ; 
* toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

