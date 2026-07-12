# 🚀 Bolster — Crowdfunding Platform for Creators

Bolster is a modern crowdfunding platform that enables creators to receive direct financial support from their audience without platform restrictions or high commission cuts.

> Much more is comming from Boslter.

---

## 🌟 Features

- 🔐 Authentication using Google & GitHub (NextAuth)
- 👤 Creator profiles with:
  - Profile picture & banner
  - Social links
  - Document uploads (resume/portfolio)
- 💳 Razorpay payment integration
- 📊 Dashboard with:
  - Live supporters feed
  - Payment history
  - Contribution stats
- 📁 Cloudinary integration for file uploads
- 🔄 Username sync across payments & profile
- ⚡ Toast notifications for payments
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Lottie Animations

### Backend
- Next.js Server Actions & API Routes
- MongoDB + Mongoose

### Authentication
- NextAuth (Google + GitHub OAuth)

### Payments
- Razorpay

### Storage
- Cloudinary (cloud)
- MongoDB (database)
- server storage (static data storage)

---

## 📂 Project Structure

/app  
&nbsp;&nbsp;/api  
&nbsp;&nbsp;/components  
&nbsp;&nbsp;/dashboard  
&nbsp;&nbsp;/profile  

/models  
&nbsp;&nbsp;User.js  
&nbsp;&nbsp;Payment.js  

/DB  
&nbsp;&nbsp;connectDB.js  

/actions  
&nbsp;&nbsp;useractions.js  

---

## ⚙️ Environment Variables

Create a `.env.local` file and add:

MONGODB_URI=your_mongodb_connection  

GITHUB_ID=your_github_id  
GITHUB_SECRET=your_github_secret  

GOOGLE_ID=your_google_id  
GOOGLE_SECRET=your_google_secret  

RAZORPAY_ID=your_razorpay_id  
RAZORPAY_SECRET=your_razorpay_secret  

NEXT_PUBLIC_RAZORPAY_ID=your_public_key  

CLOUDINARY_CLOUD_NAME=your_cloud_name  
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret  

---

## 🧠 How It Works

### 💳 Payment Flow
1. User enters amount & details  
2. Razorpay order is created via server action  
3. Payment is stored as pending in database  
4. On success → updated and displayed in dashboard  

### 👤 User System
- Users are created on first login via OAuth  
- Profiles include social links, media, and payment credentials  

### 🗄️ Database Handling
- MongoDB connection is cached globally to avoid multiple connections  
- Ensures stability in Next.js environment  

### 📁 File Upload System
- Cloudinary used for storing images and documents  
- Old files are automatically deleted before new uploads  

---

## ▶️ Getting Started

### 1. Clone the repo
git clone https://github.com/your-username/bolster.git  
cd bolster  

### 2. Install dependencies
npm install  

### 3. Setup environment variables
Create `.env.local` and add required keys  

### 4. Run the development server
npm run dev  

App will run at:  
http://localhost:3000  

---

## 🚧 Future Improvements

- 🔔 Real-time notifications  
- 💬 Comments / supporter interaction  
- 📈 Creator analytics dashboard  
- 🌍 Public explore page  
- 🛡️ Improved validation & security  

---

## 👨‍💻 Author

Shubham Rana  
GitHub: https://github.com/Shubham-Rana-cse  
LinkedIn: https://www.linkedin.com/in/shubham-rana45/  
