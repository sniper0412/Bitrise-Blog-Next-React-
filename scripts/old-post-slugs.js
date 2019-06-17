require('dotenv').config();
const Butter = require('buttercms');

const { getAllButterPost } = require('./shared');

const butter = Butter(process.env.BUTTER_TOKEN);
getAllButterPost(butter).then(posts => {
  const slugs = posts.map(({ slug }) => slug).reverse();
  console.log(JSON.stringify(slugs));
});
