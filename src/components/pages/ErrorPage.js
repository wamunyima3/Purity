import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode, errorMessage, errorDetails = null }) => {
  // Helper function to format error details for readability
  const formatErrorDetails = (details) => {
    if (!details) return null;

    let formattedDetails;
    try {
      // Attempt to parse JSON for structured data
      formattedDetails = JSON.stringify(details, null, 2); // Indentation of 2 spaces
    } catch (error) {
      // If parsing fails, display raw details
      formattedDetails = details.toString();
    }
    return (
      <pre className="text-sm p-2 rounded overflow-auto whitespace-pre">
        {formattedDetails}
      </pre>
    );
  };


  return (
    <div className="flex flex-col justify-center items-center h-full text-white text-center"> {/* Center everything */}
      <h1 className="text-4xl font-bold mb-4">Uh oh! Looks like something went wrong.</h1>
      {errorCode && (
        <p className="text-2xl mb-2 font-bold">
          Error Code: <span className="font-mono">{errorCode}</span>
        </p>
      )}
      {errorMessage && <p className="text-2xl mb-4">{errorMessage}</p>}

      {errorDetails && (
        <div className="mt-4">
          <details>
            <summary className="text-blue-600 hover:underline cursor-pointer font-bold">
              Show Technical Details
            </summary>
            {formatErrorDetails(errorDetails)}
          </details>
        </div>
      )}

      <Link to="/" className="text-blue-600 hover:underline mt-4">
        Go back to homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
