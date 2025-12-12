# 🚀 LOMASH CRM SYSTEM

**A Comprehensive Business Management Solution**
*Built with React.js, Tailwind CSS, and Framer Motion*

![Dashboard Preview](screenshots/dashboard.png)

## 📋 Overview
Lomash CRM System is a high-performance, modern web application designed to streamline business operations. It combines powerful **Customer Relationship Management (CRM)** features with robust **HRMS (Human Resource Management)** and **ERP** capabilities. 

Built with a "Glassmorphism" aesthetic and advanced animations, it offers a premium user experience while handling complex data like payroll automation, attendance tracking, and project management.

**Live Demo:** [Add Netlify Link Here]

## ✨ Key Features

### 🏢 HRMS & ERP Suite
- **Employee Directory**: Manage staff profiles with detailed info (Role, Department, Salary).
- **Smart Attendance**: 
  - Daily tracking with visual indicators.
  - **Excel Auto-Upload**: Drag & drop support for bulk attendance updates.
- **Automated Payroll**: 
  - One-click salary calculation based on attendance.
  - Generates net pay automatically (Base Salary / 30 * Present Days).
  - Downloadable Payslips (Coming Soon).

### 🤝 CRM & Sales
- **Lead Pipeline**: Kanban-style board to track potential deals (New -> Converted).
- **Customer Management**: Database of clients with search & filter.
- **Bulk Import**: Universal Excel upload for Leads and Customers.

### 📊 Project Management
- **Project Tracker**: Monitor deadlines, budgets, and team assignments.
- **Task Board**: Organize daily work items.
- **Calendar View**: Visual timeline of project milestones.

### 🎨 UI/UX Excellence
- **Dark Glass Theme**: Modern, high-contrast dark mode with glassmorphism effects.
- **Fluid Animations**: Smooth page transitions and micro-interactions using Framer Motion.
- **Responsive Design**: Fully optimized for all screen sizes.

---

## 🛠️ Technology Stack
- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Handling**: `xlsx` (Excel Processing), LocalStorage (Persistence)
- **Routing**: React Router DOM

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/lomashsrivastava/Lomash-CRM-System.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Lomash-CRM-System
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

---

## 📂 Deployment

### Netlify (Recommended)
This project is optimized for Netlify.
1.  Connect your GitHub repository to Netlify.
2.  Build Command: `npm run build`
3.  Publish Directory: `dist`
4.  *Note: A `_redirects` file is included in `public/` to handle client-side routing.*

### GitHub Pages
1.  Update `vite.config.js` with your base URL.
2.  Run `npm run build`.
3.  Deploy the `dist` folder.

---

## 📸 Screenshots

### 🖥️ Dashboard - High Tech Analytics
![Dashboard](screenshots/dashboard.png)

### 📂 Projects - Progress Tracking
![Projects](screenshots/projects.png)

### 👥 Customer Management with Bulk Import
![Customers](screenshots/customers.png)

### 📈 Leads Pipeline
![Leads](screenshots/leads.png)

### ✅ Task Management
![Tasks](screenshots/tasks.png)

---

**Developed solely by Lomash Srivastava**
*© 2025 Lomash CRM System. All rights reserved.*
