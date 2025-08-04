# ⚡ Electrical Company Website (Frontend)

This is the frontend code for a business website built for a local electrical company. It is a statically generated React application using **React Router**, **TypeScript**, and **Tailwind CSS**, designed with smooth styling, responsive layout, and functional form handling.

The site includes two routes: `/` (home page) and `/careers`. The home page is structured as a single scrolling page with hash-based section navigation (e.g., `/#services`, `/#contact`) and uses **lazy loading** for better performance. It also features **parallax scrolling effects** via React Parallax.

Form submissions (contact and job applications) are sent to the company’s email using a separate **Node.js + Express** backend that integrates with the **Twilio SendGrid API**.  
➡️ You can view the backend code here: [github.com/Ramen96/Electric-Server](https://github.com/Ramen96/Electric-Server)

---

## 🧰 Tech Stack

- **TypeScript**
- **React + React Router** – for routing (`/`, `/careers`)
- **Tailwind CSS** – utility-first styling
- **React Parallax** – visual scroll effects
- **Lazy loading** – via `React.lazy` and `Suspense`
- **SendGrid (Twilio)** – for email delivery (via external backend)
- **Static Site Generation (SSG)**

---

## 🔧 Features

- Two routes: `/` and `/careers`
- Home page supports smooth scrolling via URL hashes (e.g., `/#section`)
- Lazy-loaded homepage sections to improve performance
- Responsive design across devices
- Contact and job application forms
- Forms submit data to external email backend using SendGrid API
- HTTPS enabled via Certbot and Let's Encrypt

---

## 📦 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Ramen96/Electric.git
cd Electric
npm install
npm run dev
