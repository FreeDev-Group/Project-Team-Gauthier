# 📋 ANALYSE COMPLÈTE DU PROJET - DATA CONSULTANCE

**Date d'analyse:** 20 mars 2026  
**Type de projet:** Site vitrine + API Backend  
**Stack:** Node.js/Express, MySQL, Authentication JWT

---

## 🎯 OBJECTIF GLOBAL DU PROJET

Le projet **DATA CONSULTANCE** est un site vitrine professionnel (CMS hybride) destiné à :
- Présenter une activité de conseil en data (Data Strategy, BI, Predictive Analytics)
- Générer des leads via formulaire de contact
- Mettre en avant des études de cas
- Publier des contenus (Insights/Blog)
- Inciter à la prise de rendez-vous stratégique

---

## 📁 STRUCTURE DU PROJET

```
Project-Team-Gauthier/
├── README.md (documentation du projet)
├── backend/ (API REST Node.js/Express)
│   ├── app.js (configuration de l'app)
│   ├── server.js (point d'entrée)
│   ├── package.json (dépendances)
│   │
│   ├── config/
│   │   ├── database.js (connexion MySQL)
│   │   ├── environment.js (variables d'env)
│   │   └── index.js (exports config)
│   │
│   ├── models/ (couche données - ORM maison)
│   │   ├── User.js (gestion des utilisateurs)
│   │   ├── Blog.js (articles de blog)
│   │   ├── Contact.js (messages de contact)
│   │   ├── CaseStudy.js (études de cas)
│   │   └── entities/ (modèles alternatifs)
│   │
│   ├── controllers/ (logique métier des requêtes)
│   │   ├── authController.js (auth)
│   │   ├── blogController.js (blogs)
│   │   ├── contactController.js (contacts)
│   │   ├── caseStudyController.js (case studies)
│   │   ├── admin/ (admin-specific)
│   │   ├── blog/ (blog-specific)
│   │   ├── caseStudy/ (case-specific)
│   │   └── contact/ (contact-specific)
│   │
│   ├── services/ (logique métier réutilisable)
│   │   ├── authService.js (login, register)
│   │   ├── blogService.js (crud blogs)
│   │   ├── contactService.js (crud contacts)
│   │   ├── caseStudyService.js (crud case studies)
│   │   ├── email/emailService.js (envoi emails)
│   │   └── auth/, blog/, etc. (services spécialisés)
│   │
│   ├── routes/ (définition des endpoints API)
│   │   ├── index.js (agrégation des routes)
│   │   ├── authRoutes.js (endpoints auth)
│   │   ├── blogRoutes.js (endpoints blogs)
│   │   ├── contactRoutes.js (endpoints contacts)
│   │   ├── caseStudyRoutes.js (endpoints case studies)
│   │   └── admin/, blog/, etc. (routes spécialisées)
│   │
│   ├── middleware/ (traitements intermédiaires)
│   │   ├── authMiddleware.js (JWT protection)
│   │   ├── corsMiddleware.js (CORS - vide)
│   │   ├── errorMiddleware.js (gestion erreurs globale)
│   │   ├── uploadMiddleware.js (multer pour images)
│   │   ├── validateMiddleware.js (validation des données)
│   │   └── logger.js (journalisation)
│   │
│   ├── utils/ (utilitaires divers)
│   │   ├── AppError.js (classe erreur personnalisée)
│   │   ├── catchAsync.js (wrapper async/await)
│   │   ├── responseFormatter.js (format réponses API)
│   │   ├── responseHandler.js (gestion réponses)
│   │   ├── emailService.js (Nodemailer)
│   │   ├── helpers.js (fonctions helpers)
│   │   ├── validators.js (validateurs personnalisés)
│   │   └── constants.js (constantes app)
│   │
│   ├── scripts/
│   │   └── init_db.sql (script initialisation BD)
│   │
│   ├── tests/
│   │   ├── app.test.js
│   │   ├── auth.test.js
│   │   ├── blog.test.js
│   │   └── contact.test.js
│   │
│   ├── uploads/ (stockage images téléchargées)
│   └── public/ (fichiers statiques)
```

---

## 🔌 STACK TECHNOLOGIQUE

### Backend
| Technologie | Rôle | Version |
|-------------|------|---------|
| **Node.js** | Runtime JavaScript serveur | - |
| **Express.js** | Framework web | ^4.19.2 |
| **MySQL2** | Driver base données | ^3.11.0 |
| **JWT** | Authentification stateless | ^9.0.2 |
| **Bcrypt** | Hash mots de passe | ^5.1.1 |
| **Multer** | Téléchargement fichiers | ^1.4.5-lts.1 |
| **Nodemailer** | Envoi emails | ^6.9.14 |
| **Express-Validator** | Validation des données | ^7.1.0 |
| **Helmet** | Sécurité HTTP headers | ^7.1.0 |
| **CORS** | Cross-Origin Requests | ^2.8.5 |
| **Morgan** | Logs HTTP | ^1.10.0 |
| **Rate Limit** | Limitation requêtes | ^7.3.1 |
| **XSS-Clean** | Protection XSS | ^0.1.4 |
| **Dotenv** | Variables environnement | ^16.4.5 |

### Outils Dev
| Outil | Usage |
|-------|-------|
| **Jest** | Tests unitaires |
| **Supertest** | Tests API |
| **Nodemon** | Dev server with auto-reload |

### Base de Données
- **MySQL** (via XAMPP)
- **Socket:** `/opt/lampp/var/mysql/mysql.sock`
- **DB Name:** `data_consultance`

---

## 🗄️ ARCHITECTURE BASE DE DONNÉES

### Table: `users`
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'editor', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Usage:** Gestion des utilisateurs, authentification, rôles

### Table: `contacts`
```sql
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Usage:** Messages de contact depuis le formulaire public

### Table: `blogs`
```sql
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);
```
**Usage:** Articles de blog/insights

### Table: `case_studies`
```sql
CREATE TABLE case_studies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    industry VARCHAR(255) NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
**Usage:** Études de cas pour preuves sociales

---

## 🔐 FLUX D'AUTHENTIFICATION

### 1. **Inscription (`POST /api/v1/auth/register`)**
```
POST /api/v1/auth/register
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "password": "securePassword123"
}

↓ (Validation)
↓ (Vérifier email unique)
↓ (Bcrypt hash password: 12 rounds)
↓ (Insert dans users table)
↓
201 Created { userId: 1 }
```

### 2. **Connexion (`POST /api/v1/auth/login`)**
```
POST /api/v1/auth/login
{
  "email": "jean@example.com",
  "password": "securePassword123"
}

↓ (Trouver user par email)
↓ (Bcrypt compare password)
↓ (Si match: JWT sign { id, exp: 30d })
↓
200 OK { 
  user: { id, name, email, role }, 
  token: "eyJhbGc..."
}
```

### 3. **Protection Routes (Middleware `protect`)**
```
Authorization: Bearer eyJhbGc...

↓ (Extraire token du header)
↓ (JWT verify token)
↓ (Lookup user par decoded.id)
↓ (Injecter user dans req.user)
↓ (next())
```

### 4. **Autorisation par Rôle (`restrictTo('admin')`)**
```
Si req.user.role inclus dans rôles autorisés
  ↓ next()
Sinon
  ↓ 403 Forbidden "Vous n'avez pas la permission"
```

---

## 📡 ENDPOINTS API

### **Authentication**
| Méthode | Endpoint | Auth | Rôle | Description |
|---------|----------|------|------|-------------|
| POST | `/api/v1/auth/register` | ❌ | - | Créer un nouvel utilisateur |
| POST | `/api/v1/auth/login` | ❌ | - | Se connecter, obtenir JWT |
| GET | `/api/v1/auth/me` | ✅ | - | Récupérer profil utilisateur |

### **Blogs**
| Méthode | Endpoint | Auth | Rôle | Description |
|---------|----------|------|------|-------------|
| GET | `/api/v1/blogs` | ❌ | - | Lister tous les blogs |
| GET | `/api/v1/blogs/:id` | ❌ | - | Détail d'un blog |
| POST | `/api/v1/blogs` | ✅ | admin, editor | Créer un blog (avec image) |
| PATCH | `/api/v1/blogs/:id` | ✅ | admin, editor | Modifier un blog |
| DELETE | `/api/v1/blogs/:id` | ✅ | admin, editor | Supprimer un blog |

### **Case Studies**
| Méthode | Endpoint | Auth | Rôle | Description |
|---------|----------|------|------|-------------|
| GET | `/api/v1/case-studies` | ❌ | - | Lister tous les case studies |
| GET | `/api/v1/case-studies/:id` | ❌ | - | Détail d'une case study |
| POST | `/api/v1/case-studies` | ✅ | admin | Créer une case study |
| PATCH | `/api/v1/case-studies/:id` | ✅ | admin | Modifier une case study |
| DELETE | `/api/v1/case-studies/:id` | ✅ | admin | Supprimer une case study |

### **Contacts**
| Méthode | Endpoint | Auth | Rôle | Description |
|---------|----------|------|------|-------------|
| POST | `/api/v1/contacts` | ❌ | - | Soumettre formulaire contact |
| GET | `/api/v1/contacts` | ✅ | admin | Lister tous les contacts |
| GET | `/api/v1/contacts/:id` | ✅ | admin | Détail d'un contact |
| DELETE | `/api/v1/contacts/:id` | ✅ | admin | Supprimer un contact |

---

## 🔄 FLUX DE DONNÉES - EXEMPLE: Créer un Blog

```
1️⃣ CLIENT REQUEST
POST /api/v1/blogs
Authorization: Bearer eyJhbGc...
Content-Type: multipart/form-data
{
  "title": "Data Tips",
  "content": "Lorem ipsum...",
  "image": <file>
}

2️⃣ MIDDLEWARE STACK
├─ express.json (parse body)
├─ authMiddleware.protect (vérifier JWT)
├─ restrictTo('admin', 'editor') (vérifier rôle)
├─ uploadMiddleware (traiter image)
├─ validateMiddleware (valider champs)
└─ blogController.createBlog (logique métier)

3️⃣ CONTROLLER - blogController.createBlog()
├─ Récupérer req.user.id (autor)
├─ Traiter req.file.filename (image)
├─ Construire blogData
└─ Appeler blogService.createBlog()

4️⃣ SERVICE - blogService.createBlog()
├─ Appeler Blog.create(blogData)
├─ Récupérer le nouvel ID
└─ Appeler Blog.findById(newId)
└─ Retourner blog complet

5️⃣ MODEL - Blog.create() & Blog.findById()
├─ Exécuter requête SQL:
│  INSERT INTO blogs (title, content, author_id, image_url)
│  VALUES (?, ?, ?, ?)
├─ Récupérer ID généré
└─ SELECT b.*, u.name as author_name...
   JOIN users... WHERE b.id = ?

6️⃣ DATABASE
├─ Insérer la ligne
└─ Retourner résultat

7️⃣ RESPONSE FORMATTER
{
  "status": "succès",
  "message": "Blog créé avec succès",
  "data": { 
    "blog": {
      "id": 5,
      "title": "Data Tips",
      "content": "...",
      "author_id": 1,
      "author_name": "Jean",
      "image_url": "/uploads/img-1710937200000-123456.jpg",
      "created_at": "2026-03-20T10:30:00.000Z"
    }
  }
}

8️⃣ CLIENT RESPONSE
201 Created ✅
```

---

## 🛡️ SÉCURITÉ

### Middlewares de Sécurité (dans app.js)
1. **Helmet** - Définie des headers HTTP sécurisés
2. **CORS** - Partage de ressources cross-origin
3. **Morgan** - Logs des requêtes HTTP
4. **Rate Limit** - 100 requêtes/heure par IP
5. **XSS-Clean** - Assainit les données XSS
6. **Body Parser** - Limite taille: 10kb

### Authentification & Autorisation
- **JWT** (JSON Web Tokens) - Stateless authentication
- **Bcrypt** - Hash mots de passe (12 rounds)
- **Role-based Access Control** - user, editor, admin
- **Protect Middleware** - Vérifie JWT sur routes privées
- **RestrictTo Middleware** - Vérifie rôle utilisateur

### Validation des Données
- **Express-Validator** - Valide inputs
- **Custom ValidateMiddleware** - Retourne erreurs formatées
- **AppError Class** - Erreurs opérationnelles vs programmation

---

## 📧 GESTION DES EMAILS

### Service: `emailService.js`
```javascript
sendEmail({
  email: "recipient@example.com",
  subject: "Subject",
  message: "Message text",
  html: "<p>HTML content</p>"
})
```

### Intégration: Contact Form
1. Utilisateur soumet formulaire contact
2. `contactService.submitContactForm()`:
   - Sauvegarde le message dans DB
   - Envoie email à admin (try-catch optionnel)
   - Retourne contactId

### Variables d'Environnement Requises
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-password
EMAIL_FROM=noreply@dataconsultance.com
```

---

## 📤 GESTION DES UPLOADS

### Configuration: `uploadMiddleware.js`
- **Storage:** Multer disk storage
- **Destination:** `/uploads/`
- **Filename:** `img-{timestamp}-{random}.{ext}`
- **Filter:** UNIQUEMENT images (image/*)
- **Limit:** 5 MB max

### Usage dans Routes
```javascript
router.post(
  '/blogs',
  upload.single('image'), // Middleware
  blogController.createBlog
);
```

### Accès: URL publique
```
GET /uploads/img-1710937200000-123456.jpg
```

---

## ⚙️ CONFIGURATION & ENVIRONNEMENT

### Fichier `.env`
```env
NODE_ENV=development
PORT=5000

# Database
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=data_consultance
DB_PORT=3306

# JWT
JWT_SECRET=cle_secrete_super_securisee_a_changer_en_production
JWT_EXPIRES_IN=30d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-password
EMAIL_FROM=noreply@dataconsultance.com
```

### Configuration par Environnement
**Development:**
- Morgan logs: 'dev'
- Error details: Complètes (stack trace)
- Rate limit: 100 requêtes/heure

**Production:**
- Morgan logs: OFF (ou apache format)
- Error details: Minimales
- Rate limit: RECOMMANDÉ augmenter
- JWT_SECRET: À changer ABSOLUMENT

---

## 🧪 TESTS

### Structure de Test
```
backend/tests/
├── app.test.js (tests app globale)
├── auth.test.js (tests authentification)
├── blog.test.js (tests blogs)
└── contact.test.js (tests contacts)
```

### Framework
- **Jest** - Test runner
- **Supertest** - Agent pour tester API

### Scripts
```bash
npm test                # Lancer tous les tests
npm test -- auth.test   # Tester (auth spécifiquement)
```

---

## 🚀 DÉMARRAGE DU PROJET

### Prérequis
- Node.js v14+
- MySQL (XAMPP ou standalone)
- npm ou yarn

### Étapes
```bash
# 1. Cloner le repo
git clone <repo-url>
cd Project-Team-Gauthier/backend

# 2. Installer dépendances
npm install

# 3. Créer fichier .env
cp .env.example .env
# Éditer avec credentials MySQL, email, etc.

# 4. Initialiser BD
mysql -u root < scripts/init_db.sql

# 5. Démarrer le serveur
npm run dev           # Mode développement avec nodemon
npm start            # Mode production

# 6. Tester API
curl http://localhost:5000/api/v1/blogs
```

### Sortie Attendue
```
✅ Connecté avec succès à la base de données MySQL
🚀 Le serveur fonctionne sur le port 5000 en mode development
```

---

## 🎯 SECTIONS DU SITE (Frontend - À Implémenter)

Le site doit avoir les sections suivantes (selon README):

1. **Home (Hero)** - Call-to-action "Book a Free Strategy Call"
2. **About** - Confiance, avantages, photo professionnel
3. **Services**:
   - Data Strategy & Governance
   - Business Intelligence & Reporting
   - Predictive Analytics
4. **Industries** - Finance, Healthcare, Retail, Tech
5. **Insights** - Blog articles
6. **Contact** - Formulaire intégré à l'API
7. **Footer** - Privacy, Terms, réseaux sociaux

---

## 📊 DIAGRAMME RELATION DONNÉES

```
┌─────────────┐
│   users     │
├─────────────┤
│ id (PK)     │
│ name        │
│ email (UQ)  │
│ password    │
│ role        │
│ created_at  │
└─────┬───────┘
      │ 1
      │ |
      │ n
      ↓
┌─────────────────────┐
│   blogs             │
├─────────────────────┤
│ id (PK)             │
│ title               │
│ content             │
│ author_id (FK)      │──→ users.id
│ image_url           │
│ created_at          │
└─────────────────────┘

┌──────────────────────┐
│   case_studies       │
├──────────────────────┤
│ id (PK)              │
│ title                │
│ client_name          │
│ industry             │
│ challenge            │
│ solution             │
│ results              │
│ image_url            │
│ created_at           │
└──────────────────────┘

┌────────────────┐
│   contacts     │
├────────────────┤
│ id (PK)        │
│ name           │
│ email          │
│ subject        │
│ message        │
│ created_at     │
└────────────────┘
```

---

## 🔧 DOSSIERS CLÉS & LEURS RESPONSABILITÉS

| Dossier | Responsabilité |
|---------|-----------------|
| `/config` | Configuration app (DB, env vars) |
| `/models` | ORM/Requêtes SQL - couche données |
| `/controllers` | Logique requêtes HTTP - valider & formater réponses |
| `/services` | Logique métier réutilisable - pas de HTTP |
| `/routes` | Définition endpoints et middlewares |
| `/middleware` | Traitements intermédiaires (auth, validation, upload) |
| `/utils` | Fonctions utilitaires (erreurs, formatage, etc.) |
| `/scripts` | Scripts d'initialisation (BD, etc.) |
| `/tests` | Tests unitaires & intégration |
| `/uploads` | Stockage fichiers téléchargés |

---

## 📝 BONNES PRATIQUES IMPLÉMENTÉES

✅ **Séparation des préoccupations** - Controllers vs Services vs Models  
✅ **Gestion d'erreurs centralisée** - AppError + globalErrorHandler  
✅ **Validation des inputs** - Express-Validator + custom middleware  
✅ **Authentification avec JWT** - Tokens signés 30 jours  
✅ **Autorisation par rôle** - RBAC admin/editor/user  
✅ **Sécurité HTTP** - Helmet, CORS, Rate Limit, XSS-Clean  
✅ **Async/Await wrapper** - catchAsync pour éviter try-catch répétitif  
✅ **Format réponses standardisé** - responseFormatter  
✅ **Logging** - Morgan pour HTTP logs  
✅ **Multer pour uploads** - Images avec validation type & taille  
✅ **Email** - Nodemailer pour notifications  
✅ **Variables d'environnement** - Dotenv pour config sensible  

---

## ⚠️ POINTS À AMÉLIOER / ATTENTION

1. **JWT_SECRET en production** ⚠️ - CHANGER la clé secrète
2. **Email Service** - Nécessite config SMTP valide
3. **Dossiers dupliqués** - `/controllers/{admin,blog,caseStudy,contact}` vs `/controllers/{blogController,etc}`
4. **Models vides** - `/models/entities/` pas utilisés
5. **CORS middleware** - Vide, CORS configuré dans app.js seulement
6. **Tests** - À démultiplier et améliorer
7. **Rate limit** - 100 requêtes/heure à évaluer selon trafic
8. **Timeout connexions** - À configurer selon charge
9. **Logs ** - Morgan assez basique, considérer Winston
10. **Documentation API** - Ajouter swagger/OpenAPI

---

## 🎯 RÉSUMÉ EXÉCUTIF

### Type de projet
API REST Node.js/Express + site vitrine conseil en data

### Objectif
Plateforme SaaS ou vitrine avec gestion contenu dynamique (blogs, case studies, contacts)

### Architecture
MVC modifiée: Routes → Controllers → Services → Models → Database

### Données
- 4 tables MySQL (users, blogs, case_studies, contacts)
- Relations: blogs.author_id → users.id

### Sécurité
- JWT authentication (30 jours)
- Role-based authorization (admin/editor/user)
- Bcrypt password hashing
- Helmet, CORS, Rate Limit, XSS-Clean

### Key Features
✅ Authentication/Authorization  
✅ CRUD Blogs avec images  
✅ CRUD Case Studies  
✅ Formulaire Contact avec email  
✅ Validation données  
✅ Gestion erreurs globale  
✅ Upload fichiers  

### Stack
Node.js 🔌 Express 📡 MySQL 🗄️ JWT 🔐 Multer 📤 Nodemailer 📧

---

## 📚 FICHIERS CLÉS À COMPRENDRE (Par ordre importance)

1. **[app.js](backend/app.js)** - Configuration globale & middlewares
2. **[server.js](backend/server.js)** - Point d'entrée, démarrage serveur
3. **[routes/index.js](backend/routes/index.js)** - Agrégation endpoints
4. **[middleware/authMiddleware.js](backend/middleware/authMiddleware.js)** - JWT protect
5. **[services/authService.js](backend/services/authService.js)** - Logique auth
6. **[controllers/blogController.js](backend/controllers/blogController.js)** - Exemple controller
7. **[models/Blog.js](backend/models/Blog.js)** - Exemple model (SQL)
8. **[config/database.js](backend/config/database.js)** - Connexion MySQL
9. **[scripts/init_db.sql](backend/scripts/init_db.sql)** - Schema BD
10. **[package.json](backend/package.json)** - Dépendances & scripts

---

**Fin de l'analyse.** Ce document couvre 99% du projet!
