module.exports = (query) => {
    const keys = Object.keys(query);

    keys.forEach(key => {
        if (!query[key]) {
            delete query[key]
        }
    });

    return query;
};
