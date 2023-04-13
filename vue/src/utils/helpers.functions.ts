export const formatDate = (date: Date) => {
    let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
}