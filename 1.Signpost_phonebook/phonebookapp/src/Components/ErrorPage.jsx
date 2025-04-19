import { Link } from "react-router-dom";
import "../Css/ErrorPage.css"; // Optional if you want to separate CSS

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="home-link">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
