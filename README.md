# 🌦 Weather App Frontend

Simple weather application with **Next.js frontend** and **NestJS backend**.

## ⚙️ Environment setup

```cp .env.example .env```

## 🚀 Development run (without Docker)

1. Install dependencies:
```npm install```

2. Start the project:
   ```npm run dev```

3. Open in browser:
   http://localhost:3000

## 🐳 Docker run

1. Make sure you have **Docker** and **Docker Compose** installed.  
2. From the project root, build and start containers:
   ```bash
   docker compose up --build
   ```
3. Open in browser:
    - Frontend: http://localhost:3000
    - Backend (Swagger): http://localhost:3001/api
4. To stop containers:
    ```bash 
    docker compose down```

## 🔧 Features
- 🔍 Search weather by city

- 🌡 Current weather in the selected city

- ⏰ Hourly forecast

- 📅 Daily forecast

- 💳 Subscriptions page:

     - two subscription plans

     - backend & Stripe payment integration

     - subscribe and unsubscribe directly from the UI
