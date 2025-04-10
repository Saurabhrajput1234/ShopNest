# ShopNest - MERN Marketplace

## 🚀 Project Overview

ShopNest is a full-stack marketplace application built using the MERN stack. It allows users to become sellers, manage shops, and add products. Buyers can search for products, browse categories, and place orders using multiple payment methods. The admin has control over the functionalities of the marketplace, ensuring smooth operations.

## 🖥️ Tech Stack

### **Frontend:**
- React.js  
- React Router  
- Redux  
- TailwindCSS  
- Material UI  

### **Backend:**
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  

### **Realtime Communication:**
- **Socket.io** (for real-time messaging between users and sellers)

### **Additional Libraries & Features:**
- **Package Manager:** Yarn  
- **Error Handling & Notifications:** React-Toastify  
- **API Requests:** Axios  
- **Icons:** React Icons  
- **Session Management:** js-cookie  
- **Email Communication:** Nodemailer  
- **Image Uploading:** Cloudinary (for storing images)  

---

## 🚀 Features

### **User Features**
- **User Authentication**
  - Signup with email verification  
  - Upload profile image  
  - Secure login  
- **Shopping Experience**
  - View all products uploaded by sellers  
  - Filter products by category  
  - View best-selling products  
  - Search functionality  
  - Add products to cart & checkout  
  - Multiple payment methods (PayPal, Cash on Delivery)  
  - Apply coupon codes for discounts  
  - View seller profile and chat with sellers  
- **User Profile Management**
  - Edit profile details  
  - Change password  
  - View order history & track orders  
  - Request refunds  
  - Save multiple addresses (Default, Home, Office)  
- **Messaging System**
  - Chat with sellers in real time using Socket.io  
  - Send images in messages  
  - View message timestamps  

### **Seller Features**
- **Seller Authentication**
  - Signup with shop details (name, email, phone, address, zip code, password)  
  - Email verification  
  - Upload profile image  
- **Seller Dashboard**
  - View product overview & latest orders  
  - Manage orders & update delivery status  
  - Create & manage products with categories and stock details  
  - Create & manage discount coupons  
  - Withdraw earnings (with a 10% service charge)  
  - Receive email notifications for withdrawals  
  - Chat with users in real time  
  - Manage shop settings (address, phone number, description, etc.)  

### **Admin Features**
- **Admin Authentication**
  - Secure admin login  
- **Admin Dashboard**
  - View total earnings, all sellers, and latest orders  
  - Manage sellers & users (delete accounts if necessary)  
  - View & manage all products and events  
  - Approve seller withdrawal requests  
  - Manage system-wide coupons and discounts  

---

## 📦 Installation & Setup

### **Clone the repository:**
```sh
git clone https://github.com/Saurabhrajput1234/ShopNest.git
cd shopnest
Setup Backend:
```sh
cd backend
npm install
npm start
Setup Frontend:
```sh
cd frontend
npm install
npm start

Setup Docker:
Build and run the Docker containers:

```sh
docker-compose up --build
