// utils/helpers.js

export function getSvgSrc(commodityName) {
    let formattedName = commodityName
        .toLowerCase()  // Convert to lowercase
        .replace(/\s+$/, '')  // Remove trailing spaces before .svg
        .replace(/[^\w\s]/g, '_')  // Replace special characters (including parentheses) with underscores
        .replace(/\s+/g, '_');  // Replace spaces with a single underscore (even consecutive spaces)

    formattedName = formattedName.replace(/_+/g, '_');  // Replace multiple underscores with a single underscore
    formattedName = formattedName.replace(/^_+|_+$/g, ''); // Remove underscores at the beginning and end

    return `/commodity/${formattedName}.svg`;  // Return the formatted image URL
}
