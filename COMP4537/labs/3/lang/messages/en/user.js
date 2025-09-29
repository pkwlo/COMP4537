class Message {
    constructor() {
        this.message = "Hello %1, What a beautiful day. Server current date and time is %2.";
    }

    getMessage(name, dateTime) {
        return this.message.replace('%1', name).replace('%2', dateTime);
    }
}
module.exports = new Message();