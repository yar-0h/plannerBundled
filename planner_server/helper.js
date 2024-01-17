// helper functions (obviously)

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function exit(reason) {
    throw new Error(reason);
}

module.exports = {
    getOffset,
    emptyOrRows,
    exit
}