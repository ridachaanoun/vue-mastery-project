const axios = require('axios');
const fs = require('fs');

const jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com';

// Function to fetch and save posts, comments, and users
const fetchData = async () => {
  try {
    // Fetch posts
    const postsResponse = await axios.get(`${jsonPlaceholderUrl}/posts`);
    const posts = postsResponse.data;

    // Fetch comments
    const commentsResponse = await axios.get(`${jsonPlaceholderUrl}/comments`);
    const comments = commentsResponse.data;

    // Fetch users
    const usersResponse = await axios.get(`${jsonPlaceholderUrl}/users`);
    const users = usersResponse.data;

    // Create a db.json structure
    const db = {
      posts: posts,
      comments: comments,
      users: users
    };

    // Write to db.json
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    console.log('Data has been fetched and saved to db.json');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Execute the fetch
fetchData();
