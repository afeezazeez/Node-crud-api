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


module.exports = {
    getPaginationData
};
