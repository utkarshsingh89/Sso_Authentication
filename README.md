# 🔐 SSO Authentication System (Keycloak + React + .NET)

## 📌 Overview

This project demonstrates a complete **Single Sign-On (SSO) Authentication System** using:

* **Frontend:** React (Vite)
* **Backend:** .NET Web API
* **Identity Provider:** Keycloak
* **Authentication:** JWT (JSON Web Tokens)

The system allows users to log in once and securely access protected resources across applications.

---

## 🧠 How It Works

1. User opens the React application
2. User is redirected to Keycloak login page
3. After successful login, Keycloak issues a JWT token
4. The frontend stores the token
5. Token is sent to backend APIs for authorization
6. Backend validates the token and returns protected data

---

## 🏗️ Project Structure

```
Sso_Authentication/
│
├── backend/                 # .NET Web API
│   ├── Program.cs
│   ├── appsettings.json
│   ├── KeycloakSsoDemo.csproj
│
├── frontend/               # React App (Vite)
│   ├── src/
│   ├── package.json
│
├── .gitignore
├── README.md
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js (v18+)
* .NET SDK (6 or later)
* Keycloak (running locally or via Docker)
* Git

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/utkarshsingh89/Sso_Authentication.git
cd Sso_Authentication
```

---

### 2️⃣ Run Keycloak

If using Docker:

```bash
docker run -p 8080:8080 \
-e KEYCLOAK_ADMIN=admin \
-e KEYCLOAK_ADMIN_PASSWORD=admin \
quay.io/keycloak/keycloak:latest start-dev
```

Access Keycloak at: http://localhost:8080

---

### 3️⃣ Configure Keycloak

* Create a **Realm** (e.g., `sso-demo`)
* Create a **Client**:

  * Client ID: `frontend-app`
  * Access Type: `public`
  * Valid Redirect URI: `http://localhost:5173/*`

---

### 4️⃣ Run Backend

```bash
cd backend
dotnet run
```

Backend runs on: `http://localhost:5000` (or configured port)

---

### 5️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔐 Features

* ✅ Single Sign-On (SSO)
* ✅ Secure JWT Authentication
* ✅ Role-Based Access Control (optional)
* ✅ Protected API endpoints
* ✅ Keycloak integration

---

## 🛡️ Security Notes

* Never commit `.env` or secret keys
* Use HTTPS in production
* Store tokens securely (avoid localStorage in production)

---

## 📚 Technologies Used

* React
* Vite
* .NET Web API
* Keycloak
* JWT Authentication

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Utkarsh Kumar Singh**

---

## ⭐ Acknowledgements

* Keycloak Documentation
* Open-source community
