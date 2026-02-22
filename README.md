# FinanceTracker - Industrial-Grade Personal Finance Management

FinanceTracker is a high-performance, secure, and intuitive web application designed for comprehensive personal financial management. Built with the MERN stack (MongoDB, Express, React, Node.js), it provides real-time financial insights, budget tracking, and transaction management with a premium dark-themed interface.

---

## 🚀 Key Features

### 🔐 Advanced Security & Auth
- **JWT-based Authentication**: Secure stateless authentication using JSON Web Tokens.
- **Client-Side Persistence**: Token management via `localStorage` for seamless sessions.
- **Protected Routing**: Role-based access control for secure dashboard interactions.
- **Secure Hashing**: Multi-layer password hashing using `bcryptjs`.

### 💰 Transaction Management
- **Universal Tracking**: Record Income and Expenses with precision.
- **Recurring Logic**: Support for Monthly and Weekly automated transaction tagging.
- **Filtering & Search**: Industrial search engine for transaction lookup by description, category, and date range.

### 📊 Financial Insights
- **Savings Analytics**: Real-time calculation of "Savings Rate" to measure financial health.
- **Dynamic Dashboard**: Balanced overview of Total Income, Expenses, and current Net Worth.
- **Budget Guardrails**: Visual progress bars per category with over-budget alerts.

---

## 🛠️ Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite | Fast UI/UX rendering & bundling |
| **Routing** | React Router 7 | Client-side navigation |
| **State** | React Context API | Global state for Auth |
| **Styling** | Vanilla CSS3 | Custom high-performance dark theme |
| **Icons** | Lucide React | Premium vector iconography |
| **Backend** | Node.js, Express 5 | High-concurrency API layer |
| **Database** | MongoDB, Mongoose | NoSQL persistence with schema validation |
| **Security** | JWT, bcryptjs | Industry-standard encryption |

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Client ["Frontend (React/Vite)"]
        UI[User Interface]
        Ctx[Auth Context]
        Ax[Axios Interceptors]
    end

    subgraph Server ["Backend (Node/Express)"]
        RT[API Routes]
        MW[Auth Middleware]
        MD[Mongoose Models]
    end

    subgraph Persistence ["Persistence Layer"]
        DB[(MongoDB)]
    end

    UI --> Ctx
    Ctx --> Ax
    Ax -- "JSON + JWT" --> RT
    RT --> MW
    MW --> MD
    MD --> DB
```

---

## 📂 Project Structure

```text
AssignmentHyscalar/
├── client/                # React Frontend
│   ├── src/
│   │   ├── api/          # Axios instance & interceptors
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # AuthContext provider
│   │   ├── pages/        # Main route views
│   │   └── styles/       # Modular CSS system
│   └── package.json
├── server/                # Express Backend
│   ├── middleware/       # JWT verification
│   ├── models/           # Mongoose schemas (User, Budget, Transaction)
│   ├── routes/           # API Endpoints
│   ├── index.js          # Server entry point
│   └── package.json
└── README.md              # Documentation
```

---

## 🚦 API Reference

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create new user account |
| `POST` | `/api/auth/login` | Authenticate & receive JWT |
| `GET` | `/api/auth/check` | Verify token & get user profile |

### Transactions
| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/transactions` | Fetch all logs | `type`, `category`, `startDate`, `endDate`, `search` |
| `POST` | `/api/transactions` | Add new entry | N/A |
| `DELETE` | `/api/transactions/:id` | Remove entry | N/A |

### Budgets
| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/budgets` | Fetch monthly goals | `month`, `year` |
| `POST` | `/api/budgets` | Set/Update budget | N/A |

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher
- **MongoDB**: A running instance (Local or Atlas)
- **Git**: For version control

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/AssignmentHyscalar.git
cd AssignmentHyscalar
```

### 2. Backend Configuration
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and configure the following:
```env
PORT=5000                     # Port for the Express server
MONGODB_URI=your_mongodb_uri   # Your MongoDB Connection String
JWT_SECRET=your_super_secret   # A secure string for JWT signing
```

Start the backend server:
```bash
npm start # Starts the server using nodemon
```
*The server will be running at `http://localhost:5000`*

### 3. Frontend Configuration
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

Start the development server:
```bash
npm run dev
```
*The application will be accessible at `http://localhost:5173`*

---

## 🏃 Quick Start (Development)
To run the full-stack application, ensure you have two terminal windows open:
1. **Terminal 1**: Running the backend (`cd server && npm start`)
2. **Terminal 2**: Running the frontend (`cd client && npm run dev`)

---

## 🧪 Testing

### Manual Testing Procedure
1. **Auth Flow**: Register -> Verify "Success" redirect -> Login -> Verify token storage in Developer Tools (Local Storage).
2. **Data Integrity**: Add transaction -> Check History -> Verify Dashboard counters update instantly.
3. **Cross-Month Budgets**: Set budget for Feb -> Add Feb transaction -> Set budget for March -> Verify isolation of data.


---

## 📸 Proof of Work

### 🖥️ Dashboard Overview
*(Add your screenshot here: `![Dashboard](file:///c:/path/to/screenshot1.png)`) *

### 📊 Budget Monitoring
*(Add your screenshot here: `![Budgets](file:///c:/path/to/screenshot2.png)`) *

### 🛠️ API Load Testing (Backend)
*(Add your screenshot here: `![Postman/Backend](file:///c:/path/to/screenshot3.png)`) *

---

## 📜 License
Released under the ISC License. © 2026 FinanceTracker.
