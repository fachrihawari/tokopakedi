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
- [ ] User authentication (login and registration)
- [ ] Shopping cart functionality
- [ ] Admin panel for managing products (to be implemented)

## Technologies Used
- Next.js 14
- React 18
- MongoDB
- Tailwind CSS for styling
- TypeScript
- Docker for containerization
- Bun as the JavaScript runtime

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
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app`: Contains the main application pages and layouts
- `src/components`: Reusable React components
- `src/db`: Database connection and schema definitions
- `src/actions`: Server actions for data fetching
- `src/utils`: Utility functions
- `public`: Static assets

## API Routes

The project uses Next.js API routes for server-side functionality:

- `/api/products`: Get products with pagination and filtering
- `/api/products/facets`: Get product facets for filtering
- `/api/products/latest`: Get latest products
- `/api/products/best-sellers`: Get best-selling products
- `/api/products/[slug]`: Get a single product by slug

## Deployment

This project is configured for deployment using Docker. A `Dockerfile` and `docker-compose.yml` are provided for easy containerization and deployment.

To build and run the Docker container:

```bash
docker-compose up --build
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
