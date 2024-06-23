// PostTransformer.js

function make(post) {
    if (!post) {
      return null;
    }
  
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      image_url:post.image,
      created_at:post.created_at
     
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
  