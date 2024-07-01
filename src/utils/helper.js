function getPaginationData(count, pageSize, page) {
    const totalPages = Math.ceil(count / pageSize);
    const nextPage = page < totalPages ? page + 1 : null;

    return {
        total: count,
        total_pages: totalPages,
        current_page: page,
        page_size: pageSize,
        next_page: nextPage
    };
}

function generateRandomAddress() {
    const streets = ['Main St', 'Highland Ave', 'Maple St', 'Park Ave', 'Oak St'];
    const cities = ['Springfield', 'Riverside', 'Greenville', 'Fairview', 'Madison'];
    const states = ['CA', 'NY', 'TX', 'FL', 'IL'];
    const zipCodes = ['12345', '67890', '54321', '09876', '11223'];
  
    const street = streets[Math.floor(Math.random() * streets.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zipCode = zipCodes[Math.floor(Math.random() * zipCodes.length)];
    const streetNumber = Math.floor(Math.random() * 9999) + 1;
  
    return `${streetNumber} ${street}, ${city}, ${state} ${zipCode}`;
  }


module.exports = {
    getPaginationData,
    generateRandomAddress
};
