import React from 'react'

const Register = () => {
  const { darkTheme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    // Function to handle form submission
    const signInWithEmail = async () => {
      try {
        setLoading(true); // Start loading indicator
        setError(null); // Clear previous error
        
        let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        })

        if (error) {
          throw error;
        }
        // Handle successful login
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

  return (
    <div className={`flex flex-col items-center justify-center h-full text-white px-4 ${darkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Loading indicator */}
      {loading && <div className="h-1 bg-blue-500 w-full absolute top-0 left-0"></div>}

      {/* Theme toggle button */}
      <button
        className={`fixed bottom-4 right-4 z-10 rounded-full p-2 ${darkTheme ? 'bg-gray-800' : 'bg-orange-600'}`}
        onClick={toggleTheme}
        tabIndex="0" // Ensure keyboard navigation
      >
        {darkTheme ? <RiSunFill className="text-yellow-400" /> : <RiMoonFill className="text-white" />}
      </button>
      {/* Page heading */}
      <h2 className={`text-3xl font-semibold mb-4 ${darkTheme ? 'text-white' : 'text-gray-800'} select-none`}>Register</h2>
      {/* Register form */}
      <form className="w-full max-w-sm select-none">
        {/* Email input */}
        <div className="mb-4">
          <label htmlFor="email" className="sr-only">Email</label>
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Your email"
            icon={<FiMail className="text-gray-400" />}
            regexPattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            className={darkTheme ? "bg-gray-800" : "bg-white border border-gray-300"}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex="0" // Ensure keyboard navigation
          />
          {/* Error message for invalid email */}
          {/* Note: You can implement error message display logic based on state */}
        </div>
        {/* Password input */}
        <div className="mb-4">
          <label htmlFor="password" className="sr-only">Password</label>
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Your password"
            icon={<FiLock className="text-gray-400" />}
            regexPattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            className={darkTheme ? "bg-gray-800" : "bg-white border border-gray-300"}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex="0" // Ensure keyboard navigation
          />
          {/* Error message for invalid password */}
          {/* Note: You can implement error message display logic based on state */}
        </div>

        {/*Confirm password input */}
        <div className="mb-4">
          <label htmlFor="password" className="sr-only">Password</label>
          <Input
            type="password"
            id="confirm_password"
            label="Confirm password"
            placeholder="Confirm password"
            icon={<FiLock className="text-gray-400" />}
            regexPattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            className={darkTheme ? "bg-gray-800" : "bg-white border border-gray-300"}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex="0" // Ensure keyboard navigation
          />
          {/* Error message for invalid password */}
          {/* Note: You can implement error message display logic based on state */}
        </div>
 
        {/* Register button */}
        <Button variant="primary" className="w-full mb-4" onClick={signInWithEmail}>Register</Button>
      </form>
      {/* Registration link */}
      <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'} select-none`}>
        Old user?{' '}
        <a href="/login" className={"text-orange-600 hover:text-orange-400"}>
          Login here
        </a>
      </p>
    </div>
  )
}

export default Register
