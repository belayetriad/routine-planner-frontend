# Routine Planner Frontend

Welcome to Routine Planner Frontend! This is the frontend part of the Routine Planner web application designed to help students generate study schedules based on their preferences and constraints.

## Features

- **User Authentication**: Users can securely sign up, log in, and log out.
- **Dynamic Routine Generation**: Study plans are dynamically generated for users on a 5-7 day basis, considering their available study time and learning objectives.
- **Prioritization**: Study sessions are intelligently prioritized based on duration and priority.

## Technology Stack

- **Framework**: Next.js
- **Language**: JavaScript
- **Styling**: React Material UI
- **State Management**: React Context API, Redux (optional)
- **API Integration**: Axios

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/belayetriad/routine-planner-frontend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd routine-planner-frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

The frontend will be accessible at `http://localhost:3000`.

### Building for Production

To build the project for production, run:

```bash
npm run build
```

### Running Tests

To run tests (if available), use:

```bash
npm test
```

### Running with Docker

To run the frontend using Docker, you can build and run the Docker container:

1. **Build Docker Image:**

   ```bash
   docker build -t routine-planner-frontend .
   ```

2. **Run Docker Container:**

   ```bash
   docker run -p 3000:3000 routine-planner-frontend
   ```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Contact

For any inquiries or feedback, please contact [Belayet Hossen](mailto:belayetriadbd@gmail.com).
