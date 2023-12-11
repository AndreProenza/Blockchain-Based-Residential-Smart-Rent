const getCurrentRealWorldDate = async () => {

    const url = 'http://worldtimeapi.org/api/timezone/Europe/Lisbon';

    try {
        const response = await fetch(url);
        const result = await response.json();

        // ------ TEMP -------
        // const result = "2023-12-30T18:55:48.620744+00:00";
        // const currentLocalDate = new Date(result);
        // -------------------

        const currentLocalDate = new Date(result.datetime);
        return extractDate(currentLocalDate);
    } catch (error) {
        console.error('Error fetching current date:', error);
        return extractDate(new Date()); // Fallback to using local system date in case of an error
    }
}

const extractDateFromString = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

const extractDate = (date) => {
    const extractedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
    return extractedDate;
}

export { getCurrentRealWorldDate, extractDateFromString, extractDate };