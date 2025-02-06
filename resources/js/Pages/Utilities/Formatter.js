export function FormatLongDate(dateString) {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "long", day: "numeric" };

    const formatter = new Intl.DateTimeFormat("en-PH", options);

    const formattedLongDate = formatter.format(date);

    return formattedLongDate;
}
