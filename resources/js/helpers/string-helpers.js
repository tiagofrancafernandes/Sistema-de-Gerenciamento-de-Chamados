export const randomString = (lenght = 5) => {
    var result = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var caracteresLength = chars.length;

    for (var i =  0; i < lenght; i++) {
        result += chars.charAt(Math.floor(Math.random() * caracteresLength));
    }

    return result;
}

const StringHelpers = () => ({
    randomString(lenght = 5) {
        return randomString(lenght);
    }
})

export default StringHelpers
