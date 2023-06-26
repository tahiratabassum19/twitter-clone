import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";
import axios from 'axios';
import TwitterIcon from '@mui/icons-material/Twitter';

const SignUpForm = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowInterestForm(true);
  };

  const handleInterestChange = (e) => {
    const { value } = e.target;
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(value)) {
        return prevInterests.filter((interest) => interest !== value);
      } else {
        return [...prevInterests, value];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    const userData = {
      username: username,
      password: password,
      interests: selectedInterests
    };

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.post("http://localhost:5000/signup", userData)
      .then(response => {
        console.log(response.data);
        navigate('/home');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='SignUp'>
      <div className='logo'>
        <TwitterIcon className='TwitterIcon'/>
        <h1>Sign Up to Twitter</h1>
        {!showInterestForm ? (
          <form onSubmit={handleSignUp}>
            <div className='signupbox'>
              <label htmlFor="username">Username:</label>
              <input className='usernamebox'
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className='password'>
              <label htmlFor="password">Password:</label>
              <input className='passwordbox'
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="submitbutton" type="submit">Sign Up</button>

          </form>

          
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='interests' >
              <label htmlFor="interests">Select your interests:</label>
              <div>
                <label >
                  <input
                    type="checkbox"
                    value="Music"
                    checked={selectedInterests.includes("Music")}
                    onChange={handleInterestChange}
                  />
                  Music
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Sports"
                    checked={selectedInterests.includes("Sports")}
                    onChange={handleInterestChange}
                  />
                  Sports
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Gaming"
                    checked={selectedInterests.includes("Gaming")}
                    onChange={handleInterestChange}
                  />
                  Gaming
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Technology"
                    checked={selectedInterests.includes("Technology")}
                    onChange={handleInterestChange}
                  />
                  Technology
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Travel"
                    checked={selectedInterests.includes("Travel")}
                    onChange={handleInterestChange}
                  />
                  Travel
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Fitness"
                    checked={selectedInterests.includes("Fitness")}
                    onChange={handleInterestChange}
                  />
                  Fitness
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Careers"
                    checked={selectedInterests.includes("Careers")}
                    onChange={handleInterestChange}
                  />
                  Careers
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Fashion and Beauty"
                    checked={selectedInterests.includes("Fashion and Beauty")}
                    onChange={handleInterestChange}
                  />
                  Fashion and Beauty
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="Family and Relationships"
                    checked={selectedInterests.includes("Family and Relationships")}
                    onChange={handleInterestChange}
                  />
                  Family and Relationships
                </label>
              </div>

              {/* Add more interest options as needed */}
            </div>
            <button className='interest-submit' type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;


