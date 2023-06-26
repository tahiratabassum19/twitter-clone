import React from 'react';
import axios from 'axios';
import './Home.css';

const CenteredContainer = ({ children }) => {
    return (
      <div className="centered-container">
        {children}
      </div>
    );
  }
const Home = () => {
  const [tweet, setTweet] = React.useState('');

  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const tweetData = {
      tweet:tweet
     
    };

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.post("http://localhost:5000/home", tweetData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

return (
  <div className='Home'>
    <h1>Home Page</h1>
    <CenteredContainer className='centered-container'>
      <div>
        <h2>Post a Tweet</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea className='tweettext' 
              id="tweet"
              value={tweet}
              onChange={handleTweetChange}
               
              placeholder="What's happening?"
              rows={5}
              cols={100}
            />
          </div>
          <button className='tweetbutton' type="submit">Tweet</button>
        </form>
      </div>
    </CenteredContainer>




  <div className="feed-container">
      <CenteredContainer className='feedcentered-container'>
        <h2 className='newsfeed'>News Feed</h2>
        <div className="feed-scroll-container">
          <div className="feed">
            {/* Placeholder content for feed items */}
            <div className="feed-item">
              <h3>Donal Trump</h3>
              <p>To all of those who have asked, I will not be going to the Inauguration on January 20th.</p>
            </div>
            <div className="feed-item2">
              <h3>Elon Musk</h3>
              <p>Don’t want to brag but … I’m the best at humility</p>
            </div>
            <div className="feed-item3">
            <h3>Bill Gates</h3>
            <p>By 2025, how many jobs in the United States will require some education beyond high school?</p>
          </div>
          </div>
        </div>
      </CenteredContainer>

  </div>
</div>

   
);
};
export default Home;
