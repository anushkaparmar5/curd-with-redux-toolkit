export const trimValue = (value) => {
    return value?.replace(/^\s+|\s+$/g, ' ');
};

export const generateUniqueId = () => {
    return Math.random().toString(16).slice(2);
};

export const titleCase = (str, key = null) => {
    try {
        if (!str)
            return null;
        const text = str.replace(/_/g, " ").split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return key === "And" ? text.replace("And", "&") : text;
    } catch (error) {
        console.error(error)
        return null;
    }
};