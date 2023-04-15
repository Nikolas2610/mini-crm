export const formatDate = (dateStr: string) => {
    const parts = dateStr.split("-");
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
};

export const handleValidationErrors = (errors: any) => {
    const errorArray: string[] = [];
    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            errorArray.push(errors[key][0]);
        }
    }
    return errorArray;
}

export const notificationAxiosError = (error: any) => {
    return error.response?.data?.error
        ? error.response.data.error
        : 'Something went wrong'
}