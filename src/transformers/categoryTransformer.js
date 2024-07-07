

function make(category) {
    if (!category) {
      return null;
    }
  
    return {
      name: category.name,
    };
  }
  
  function collection(categories) {
    if (!categories || !Array.isArray(categories)) {
      return [];
    }
  
    return categories.map(category => make(category));
  }
  
  module.exports = {
    make,
    collection,
  };
  