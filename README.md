
# FrankoStore API Documentation

Welcome to the FrankoStore API, a comprehensive backend solution designed for e-commerce platforms. Built with TypeScript, NestJS, TypeORM, PostgreSQL, and AWS S3 Bucket, this API facilitates product management, user authentication, order processing, and more.

## Technology Stack

- **TypeScript**: Provides strong typing for JavaScript, ensuring more reliable code and developer productivity.
- **NestJS**: A versatile framework for building efficient and scalable server-side applications.
- **TypeORM**: Bridges your JavaScript application with a relational database, allowing for easy data manipulation.
- **PostgreSQL**: A powerful, open-source object-relational database system with a strong reputation for reliability.
- **AWS S3 Bucket**: Offers scalable cloud storage solutions, perfect for storing static files like images and documents.

## Getting Started

### Prerequisites

- Node.js (v12+ recommended)
- PostgreSQL (v10+ recommended)
- An AWS account for S3 Bucket access
- Git for cloning the repository

### Installation

1. **Clone the Repository**

   Use Git to clone the repository to your local machine:

   ```bash
   git clone https://github.com/FrankoStore/FrankoStoreApi.git
   cd FrankoStoreApi
   ```

2. **Install Dependencies**

   Navigate into the project directory and install its dependencies:

   ```bash
   yarn
   ```
   or
   ```bash
   yarn install
   ```

3. **Environment Configuration**

   Duplicate the `.env.example` file, rename it to `.env`, and fill in the necessary environment variables:

   ```bash
   cp ./src/common/envs/example.env ./src/common/envs/.env 
   ```

4. **Database Setup**

   Run the following command to apply migrations to your PostgreSQL database: (experimental)

   ```bash
   yarn typeorm migration:run
   ```

5. **Start the Server**

   Launch the application:

   ```bash
   yarn run start
   ```

### Accessing the API

After starting the server, the API endpoints can be accessed locally at `http://localhost:*port*/`. The Appolo Sandbox documentation, detailing all available endpoints and their specifications, is accessible at `http://localhost:*port*/graphql`.

## API Features

### Products

- **List Products**: Retrieve a list of products available in the store.
- **Add Product**: Create a new product entry.
- **Upload Product Image**: Upload images for products using AWS S3 Bucket.

### Orders

- **Create Order**: Initiate a new order.
- **List Orders**: Fetch a list of orders made by a user.

### Users

- **User Registration**: Register a new user account.
- **User Login**: Authenticate a user and issue a token.

## Configuration

Detailed configuration options are provided in the `.env` file and include:
#### (SOON)

## Contributing

We warmly welcome contributions to the FrankoStore API. Whether it's bug reports, feature requests, or code contributions, please follow our contribution guidelines outlined in the CONTRIBUTING.md file.
#### (SOON)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
#### (SOON)

## Contact Information

#### (SOON)

