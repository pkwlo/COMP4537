class Message {
    constructor() {
        this.failed = "Wrong order!"
        this.success = "Excellent memory!"
        this.wrongBoxes = "Please enter a number between 3 and 7."
    }
    displayResult(isCompleted) { return isCompleted ? this.success : this.failed; }
    displayIncorrectBoxesMessage() { return this.wrongBoxes; }
}
export default new Message();