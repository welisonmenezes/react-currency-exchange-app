import moment from "moment";

export const getCurrentDate = () => {
    return moment().format("YYYY-MM-DD");
};

export const getCurrentTime = () => {
    return moment().format("HH:mm");
};

export const getSubtractedDate = (daysBefore, dayOrigin) => {
    if (!dayOrigin) {
        return moment(getCurrentDate())
            .subtract(daysBefore, "days")
            .format("YYYY-MM-DD");
    } else {
        return moment(dayOrigin)
            .subtract(daysBefore, "days")
            .format("YYYY-MM-DD");
    }
};

export const formatDateForHumans = (date) => {
    let theDate = date;
    let theTime = null;
    if (date.indexOf(" @ ") > -1) {
        const arrDate = date.split(" @ ");
        theDate = arrDate[0];
        theTime = arrDate[1];
    }
    const d = new Date(theDate);
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    const formated = moment(d).format("DD/MM/YYYY");
    return theTime ? `${formated} @ ${theTime}` : `${formated}`;
};

export const checkIfDateIsBeforeToday = (date) => {
    return moment(date).isBefore(getCurrentDate());
};
