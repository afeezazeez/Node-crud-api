const userTransformer = require('./userTransformer');
const categoryTransformer = require('./categoryTransformer');


function make(post) {
    if (!post) {
      return null;
    }
  
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      image_url:post.image,
      created_at:post.created_at,
      user:userTransformer.make(post.User),
      categories:categoryTransformer.collection(post.Categories) 
    };
  }
  
  function collection(posts) {
    if (!posts || !Array.isArray(posts)) {
      return [];
    }
  
    return posts.map(post => make(post));
  }
  
  module.exports = {
    make,
    collection,
  };
  