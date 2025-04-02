export const addressFormat = (address = '') => {
    const a = address.substring(0, 7);
    const b = address.substring(37);
    return `${a}...${b}`;
}