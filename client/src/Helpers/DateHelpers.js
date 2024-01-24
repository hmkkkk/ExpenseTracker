const formatDateForInputFromDate = (date) => {
    return date.getFullYear().toString() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    date.getDate().toString().padStart(2, 0)
}

const formatDateForInputFromApi = (dateString) => {
    if (!dateString) return

    const index = dateString.indexOf('T');
    return dateString.substring(0, index)
}


export {formatDateForInputFromDate, formatDateForInputFromApi}
