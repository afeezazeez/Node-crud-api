// UserTransformer.js

function make(user) {
    if (!user) {
      return null;
    }
  
    return {
      name: user.name,
      email: user.email,
      created_at:user.created_at,
      avatar: user.avatar || null,
    };
  }
  
  function collection(users) {
    if (!users || !Array.isArray(users)) {
      return [];
    }
  
    return users.map(user => make(user));
  }
  
  module.exports = {
    make,
    collection,
  };
  