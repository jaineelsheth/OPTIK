# ŌPTIC® | Premium Optical Ecosystem

A dual-platform digital experience for a high-end eyewear brand, featuring a cinematic storefront and a precision administrative controller.

## 📁 Project Structure

This repository is divided into two primary modules:

1. **`optic-eyewear/`**: The primary customer-facing storefront.
   - **Tech Stack**: React, Vite, Tailwind CSS.
   - **Aesthetic**: Cinematic Dark Luxury with high-motion interactions.
   - **Main Features**: Product showcase, brand storytelling, and interactive lens features.

2. **`optic-admin/`**: The administrative control center.
   - **Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, `next-themes`.
   - **Aesthetic**: Matches the storefront with "Luxury Light" and "Cinematic Dark" modes.
   - **Main Features**: Inventory management, performance analytics, and content editing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Running the Storefront (`optic-eyewear`)
```bash
cd optic-eyewear
npm install
npm run dev
```
*The storefront will typically be available at `http://localhost:5173`.*

### Running the Admin Portal (`optic-admin`)
```bash
cd optic-admin
npm install
npm run dev
```
*The admin portal will typically be available at `http://localhost:3000`.*

---

## 🎨 Design Philosophy: "Cinematic Dark Luxury"
The project utilizes a specific set of design tokens to maintain a premium feel:
- **Charcoal Background**: `#050505`
- **Amber Accents**: `#c8831a`
- **Glassmorphism**: 12px blur with low-opacity borders.
- **Typography**: 'Cormorant Garamond' (Display) and 'Inter' (UI).

---

## 🛠 Features Implemented
- **Dynamic Theme Switching**: Seamlessly toggle between light and dark modes in the admin portal.
- **Hydration Optimized**: Built with Next.js best practices to ensure fast, error-free loading.
- **Responsive Management**: Full-viewport administrative interface for Products, Analytics, and Content.

---

© 2024 ŌPTIC®. All rights reserved..
