import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

    const { login } = useContext(AuthContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/")
          } catch (err) {
            setErr(err.response.data);
          }
    };



    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="email"
                            value={inputs.email}
                            name="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={inputs.password}
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {err && err}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
