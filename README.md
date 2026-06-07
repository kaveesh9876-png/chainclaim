<!-- ========================================= -->
<!-- HERO SECTION -->
<!-- ========================================= -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=0:141E30,50:243B55,100:0F2027&text=ChainClaim&fontSize=55&fontColor=ffffff&animation=fadeIn&fontAlignY=38" />
</p>

<h1 align="center">⛓️ ChainClaim</h1>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=24&duration=3000&pause=1000&center=true&vCenter=true&width=900&lines=Insurance+Claim+Management+Platform;Real-Time+Claim+Tracking+System;Blockchain+%7C+Node.js+%7C+MongoDB+%7C+IoT;Fraud+Detection+%26+Policy+Analytics" />
</p>

<p align="center">
Modern Insurance Claims • Fraud Detection • Policy Management • Analytics Dashboard
</p>

---

## 🚀 Project Overview

ChainClaim is a modern insurance claim management platform designed to simplify claim processing, policy tracking, fraud detection, and analytics through a centralized dashboard.

The platform enables insurance providers, administrators, and policy holders to manage claims efficiently while improving transparency and operational performance.

Built using Node.js, Express.js, MongoDB, Blockchain, IoT integrations, and modern frontend technologies, ChainClaim provides a scalable foundation for next-generation insurance systems.

---

# ✨ Key Features

<table>
<tr>
<td width="50%">

### 📋 Claim Management

Create, update, review, and track insurance claims.

</td>

<td width="50%">

### 📊 Analytics Dashboard

Real-time insights and reporting.

</td>
</tr>

<tr>
<td>

### 🛡️ Fraud Detection

Identify suspicious claim activities.

</td>

<td>

### 📑 Policy Management

Centralized policy tracking system.

</td>
</tr>

<tr>
<td>

### ⛓️ Blockchain Ready

Immutable claim verification support.

</td>

<td>

### 🌐 REST APIs

Secure backend APIs for integration.

</td>
</tr>
</table>

---

# 📈 Business Impact

| Metric | Value |
|----------|----------|
| Claim Processing Speed | Faster |
| Fraud Detection | Improved |
| Data Transparency | High |
| Policy Tracking | Automated |
| Scalability | Enterprise Ready |
| User Experience | Modern Dashboard |

---

# 🖼️ Product Screenshots

## 📊 Dashboard

![Dashboard](assets/screenshots/Dashboard.png)

---

## 📈 IoT Analytics

![IoT Analytics](assets/screenshots/IoT%20Analytics.png)

---

## 📝 New Claim

![New Claim](assets/screenshots/New%20Claim.png)

---

# 🏗️ System Architecture

```text
                    👨 Policy Holder

                            │
                            ▼

                 ┌─────────────────────┐
                 │   Frontend Portal   │
                 └──────────┬──────────┘
                            │
                            ▼

                 ┌─────────────────────┐
                 │  Express.js APIs    │
                 └──────────┬──────────┘
                            │

       ┌────────────────────┼────────────────────┐
       │                    │                    │

       ▼                    ▼                    ▼

 ┌───────────┐      ┌──────────────┐      ┌───────────┐
 │ MongoDB   │      │ Blockchain   │      │ IoT Data  │
 │ Database  │      │ Verification │      │ Sensors   │
 └───────────┘      └──────────────┘      └───────────┘

       │                    │                    │

       └────────────────────┼────────────────────┘
                            │

                            ▼

                 ┌─────────────────────┐
                 │ Analytics Engine    │
                 └─────────────────────┘
```

---

# ⚡ Core Modules

## 📋 Claims Management

Manage insurance claims throughout their lifecycle.

### Capabilities

- Create Claims
- Update Claims
- Track Status
- Review History

---

## 📑 Policy Management

Centralized policy administration system.

### Capabilities

- Policy Records
- Customer Details
- Coverage Information
- Renewal Tracking

---

## 🛡️ Fraud Detection Dashboard

Identify potentially fraudulent activities.

### Capabilities

- Risk Analysis
- Suspicious Pattern Detection
- Fraud Monitoring
- Investigation Support

---

## 📊 Analytics & Reporting

Generate actionable business insights.

### Capabilities

- Claim Trends
- Policy Analytics
- User Reports
- Performance Metrics

---

## ⛓️ Blockchain Verification

Ensures transparency and trust.

### Benefits

- Immutable Records
- Tamper Resistance
- Secure Validation
- Enhanced Transparency

---

# 📂 Project Structure

```text
CHAINCLAIM/

├── backend/
│   ├── controllers/
│   │   └── claimController.js
│   │
│   ├── models/
│   │   ├── Claim.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── claimRoutes.js
│   │
│   └── server.js
│
├── contracts/
│   └── ClaimProcessor.sol
│
├── scripts/
│   └── deploy.js
│
├── iot/
│   └── sensor_collector.py
│
├── deployments/
│
├── assets/
│   └── screenshots/
│
├── index.html
├── style.css
├── script.js
│
├── hardhat.config.js
├── package.json
├── .env.example
└── README.md
```

---

# 🚀 Setup & Installation

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

```bash
cp .env.example .env
```

Update environment variables:

```env
MONGO_URI=
JWT_SECRET=
PRIVATE_KEY=
POLYGON_ZKEVM_RPC=
POLYGONSCAN_API_KEY=
INFURA_IPFS_PROJECT_ID=
```

---

## Compile Smart Contracts

```bash
npm run compile
```

---

## Deploy Smart Contracts

```bash
npm run deploy:testnet
```

---

## Start Backend Server

```bash
npm run dev
```

---

## Start IoT Service

```bash
npm run iot
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/claims | Get all claims |
| POST | /api/claims | Create claim |
| GET | /api/claims/:id | Get claim |
| PUT | /api/claims/:id | Update claim |
| DELETE | /api/claims/:id | Delete claim |
| POST | /api/auth/login | Login |
| POST | /api/auth/register | Register |

---

# 🌐 Blockchain Network

| Network | Chain ID |
|----------|----------|
| Polygon zkEVM Testnet | 1442 |
| Polygon zkEVM Mainnet | 1101 |

---

# 📚 Learning Outcomes

This project helped in understanding:

- Full Stack Development
- Node.js Backend Architecture
- Express.js APIs
- MongoDB Operations
- RESTful API Design
- Blockchain Integration
- Smart Contract Development
- IoT Data Processing
- Dashboard Development
- Git & GitHub Workflow

---

# 🔒 Security Features

✅ JWT Authentication

✅ Protected API Routes

✅ Secure Database Access

✅ Smart Contract Validation

✅ Blockchain Verification

✅ Environment Variable Protection

---

# 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Web3.js

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Blockchain

- Solidity
- Hardhat
- Polygon zkEVM
- Chainlink

### Storage

- IPFS

### IoT

- Python

---

# 🔮 Future Enhancements

- 👥 Role-Based Access Control
- 📧 Email Notifications
- 📄 PDF Report Generation
- 📊 Advanced Analytics Dashboard
- ☁️ Cloud Deployment
- 🔐 OAuth Authentication
- 📱 Mobile Application
- 🤖 AI Fraud Detection

---

# 👨‍💻 Developer

## Kaveesh Dhiman

💻 Full Stack Developer

🏢 Ex-Intern @ National Informatics Centre (NIC)

🎓 B.Tech CSE (IoT, Cyber Security & Blockchain)

🏫 Dronacharya College of Engineering

📧 kaveesh9876@gmail.com

🔗 GitHub: https://github.com/kaveesh9876-png

🔗 LinkedIn: https://www.linkedin.com/in/kaveesh-dhiman-4b619b322

---

# 📄 License

This project is developed for educational, research, portfolio, and learning purposes.

---

<p align="center">
⭐ If you found this project useful, consider giving it a star.
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=120&section=footer&color=0:141E30,50:243B55,100:0F2027"/>
</p>
