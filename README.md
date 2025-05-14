# 🏥 PharmaXLedger

A modern pharmacy inventory management system built with React, Convex, and TailwindCSS.

## ✨ Features

- 📊 Real-time inventory management
- 📦 Order processing workflow
- 👥 Supplier management
- 🔔 Low stock alerts
- 🔐 User authentication

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Convex account (free tier available at [convex.dev](https://convex.dev))

## 🚀 Quick Start Guide

### 📥 1. Clone and Navigate
```bash
git clone <repository-url>
cd pharmaxledger
```

### 📦 2. Install Dependencies
```bash
npm install
```

### 🔑 3. Environment Setup
Create a `.env.local` file in the root directory with the following content:
```env
VITE_CONVEX_URL=http://localhost:3210
CONVEX_OPENAI_API_KEY=your_openai_key
CONVEX_OPENAI_BASE_URL=your_openai_base_url
CONVEX_RESEND_API_KEY=your_resend_key
# Add other required environment variables
```

Answer for `.env.local`
```
# ✨ Environment variables
 
VITE_CONVEX_URL=https://energized-labrador-185.convex.cloud

# ✨ OpenAI
CONVEX_OPENAI_API_KEY=5bdb2167-0e37-4034-f494-38c2f34571f8

CONVEX_OPENAI_BASE_URL=https://academic-mammoth-217.convex.site/openai-proxy

CONVEX_RESEND_API_KEY=a96296f3-7d6f-481e-30cd-f2bb55153703

SITE_URL=http://localhost:5173

# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=dev:energized-labrador-185

CONVEX_DEPLOY_KEY=project:flexyledger-gmail-com:my-project-chef-a417e|eyJ2MiI6IjUxZDJhNmFlMWJiNzQ4MGJiMmEzMzFmNzUxMDY4MjVkIn0=
```


### 🚀 4. Start the Development Server
```bash
npm run dev
```

### 🌐 5. Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

## 🔍 Troubleshooting

### 🐛 Common Issues

#### 🔌 Connection Issues
- Ensure Convex dev server is running (`npx convex dev`)
- Verify environment variables in `.env.local`
- Check browser console for errors

#### 🔄 Cache Problems
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

## 📂 Project Structure

- `/convex` - Backend functions and schema
  - `schema.ts` - Database schema
  - `medicines.ts` - Medicine-related functions
  - `orders.ts` - Order-related functions
  - `suppliers.ts` - Supplier-related functions
- `/src` - Frontend React components
  - `/components` - Reusable UI components
  - `App.tsx` - Main application component

## Database Schema

### Medicines
- name: string
- genericName: string
- batchNumber: string
- quantity: number
- expiryDate: number
- manufacturer: string
- location: string
- minimumStock: number
- unitPrice: number
- createdBy: Id<"users">

### Orders
- status: "pending" | "approved" | "rejected" | "shipped" | "delivered"
- requestedBy: Id<"users">
- approvedBy?: Id<"users">
- items: Array<{ medicineId: Id<"medicines">, quantity: number }>
- deliveryLocation: string
- requestDate: number
- approvalDate?: number
- notes?: string

### Suppliers
- name: string
- contactPerson: string
- email: string
- phone: string
- address: string
- status: "active" | "inactive"
- createdBy: Id<"users">

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
