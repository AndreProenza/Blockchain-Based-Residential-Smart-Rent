const getCurrentRealWorldDate = async () => {

    const url = 'https://world-time2.p.rapidapi.com/ip';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe197ed0a7mshe9b5eac8160b9b5p1b39edjsndfdf57d4d517',
            'X-RapidAPI-Host': 'world-time2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

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