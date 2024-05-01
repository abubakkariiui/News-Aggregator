# News Aggregator | HeadlineHub

This is a news aggregator application built with React and Vite. It fetches news from the New York Times API and displays them in various categories like Business, Home, Search, and Tech. The application is designed to provide a seamless user experience, with a clean and intuitive interface that makes browsing news articles easy and enjoyable.

## Project Structure

The project is structured as follows:

- `src/`: Contains the source code of the application.
  - `App.jsx`: The main application component. This is where the main layout of the application is defined, including the header and the main content area.
  - `main.jsx`: The entry point of the application. This is where the React application is rendered to the DOM.
  - `components/`: Contains reusable components like `ArticleCard`, `Header`, `DropDown`, `Loading`, `NewsCard`, and `NotFound`. Each of these components are designed to be reusable and modular, making the codebase easier to maintain and extend.
  - `pages/`: Contains page components for different categories of news. Each page component fetches and displays news articles for a specific category.
  - `services/`: Contains the API service for fetching news. This service is responsible for making HTTP requests to the New York Times API and returning the response data.
  - `store/`: Contains Redux store and related files. The Redux store is used to manage global state in the application, such as the current user and the current category of news.
  - `utils/`: Contains utility files like `helpers.jsx`, `icons.jsx`, and `routes.jsx`. These files contain various utility functions and constants that are used throughout the application.
- `public/`: Contains public assets like images and fonts.
- `index.html`: The main HTML file that serves as the template for the application.
- `package.json`: Contains project metadata and dependencies. This file lists all the npm packages that the project depends on, as well as various scripts for running and building the application.
- `.env`: Contains environment variables. These variables are used to configure various aspects of the application, such as the API key for the New York Times API.
- `.eslintrc.cjs`: Contains ESLint configuration. ESLint is used to enforce a consistent coding style and catch potential bugs and errors.
- `postcss.config.js` and `tailwind.config.js`: Contains configuration for PostCSS and Tailwind CSS. These tools are used to process and style the application's CSS.

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Prerequisites for docker only

Before you begin, ensure you have Docker installed on your system. You can download and install Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started).

## Building the Docker Image
```
docker build -t news-aggregator .
```

## Running the Docker Container
```
docker run -p 3000:3000 react-vite-app
```

## Scripts

- `npm run dev`: Starts the development server. This server automatically reloads the application whenever you save a file, making it easier to develop and test the application.
- `npm run build`: Builds the application for production. This command compiles the application's JavaScript and CSS into optimized bundles that can be served efficiently to users.
- `npm run lint`: Runs ESLint on the project. This command checks the project's JavaScript files for potential bugs and style issues.
- `npm run preview`: Serves the production build of the application. This command starts a static server that serves the built application, allowing you to preview the production version of the application.

## Built With

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): A build tool that is faster and leaner than traditional tools like Webpack.
- [React Query](https://react-query.tanstack.com/): A library for fetching, caching, and updating asynchronous data in React.
- [Redux](https://redux.js.org/): A predictable state container for JavaScript apps.
- [React Router](https://reactrouter.com/): A collection of navigational components that compose declaratively with your application.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
- [Axios](https://axios-http.com/): A promise-based HTTP client for the browser and node.js.
- [ESLint](https://eslint.org/): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

## License

This project is open source and available under the [MIT License](LICENSE).
