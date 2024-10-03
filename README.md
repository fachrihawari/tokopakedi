# TokoPakEdi

TokoPakEdi is a modern e-commerce web application built with Next.js, React, and MongoDB. It offers a user-friendly interface for browsing and purchasing products, with features like product search, filtering, and a responsive design.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- [ ] Responsive design for mobile and desktop
- [x] Product browsing with search and filter functionality
- [x] Product details page
- [x] User authentication (login and registration)
- [x] Shopping cart functionality
- [x] Order management
- [x] Payment integration with Midtrans
- [x] Google OAuth login
- [ ] Product review and rating system
- [ ] Admin panel for managing products
- [ ] Admin panel for managing orders
- [ ] Admin panel for managing sales reports

## Technologies Used
- Next.js 14
- React 18
- MongoDB
- Tailwind CSS for styling
- TypeScript
- Docker for containerization
- Bun as the JavaScript runtime
- Midtrans for payment processing
- Google OAuth for authentication

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/fachrihawari/tokopakedi.git
   cd tokopakedi
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   MONGO_DATABASE=your_database_name
   TOTAL_PRODUCTS=1000
   PORT=3000
   NEXT_PUBLIC_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret
   MIDTRANS_SERVER_KEY=your_midtrans_server_key
   MIDTRANS_CLIENT_KEY=your_midtrans_client_key
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the database migration and seed:
   ```bash
   bun run migrate
   bun run seed
   ```

5. Run the development server:
   ```bash
   bun run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app`: Contains the main application pages and layouts
- `src/components`: Reusable React components
- `src/lib/db`: Database connection and schema definitions
- `src/lib/actions`: Server actions for data fetching and mutations
- `src/lib/utils`: Utility functions
- `src/lib/hooks`: Custom React hooks
- `public`: Static assets

## API Routes

The project uses Next.js API routes for server-side functionality:

| Endpoint                           | Method(s)      | Description                                          |
|------------------------------------|-----------------|------------------------------------------------------|
| `/api/products`                    | GET             | Get products with pagination and filtering           |
| `/api/products/facets`             | GET             | Get product facets for filtering                     |
| `/api/products/latest`             | GET             | Get latest products                                  |
| `/api/products/best-sellers`       | GET             | Get best-selling products                            |
| `/api/products/[slug]`             | GET             | Get a single product by slug or ID                   |
| `/api/cart`                        | GET             | Get the current user's cart                          |
| `/api/cart/[productId]`            | POST, PUT, DELETE | Add, update, or remove items from the cart         |
| `/api/orders`                      | GET, POST       | Get user orders or create a new order                |
| `/api/payment/notification`        | POST            | Handle payment notifications from Midtrans           |
| `/api/auth/login`                  | POST            | Handle user login                                    |
| `/api/auth/register`               | POST            | Handle user registration                             |
| `/api/auth/google-login`           | POST            | Handle Google OAuth login                            |
| `/api/heartbeat`                   | GET             | Health check endpoint                                |

## Deployment

This project is configured for deployment using Docker. A `Dockerfile` and `docker-compose.yml` are provided for easy containerization and deployment.

To build and run the Docker container:

```bash
docker-compose up --build
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
