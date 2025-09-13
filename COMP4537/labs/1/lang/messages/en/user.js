class Message {
    constructor() {
        // common
        this.back = "Back";
        this.title = "Lab 1";
        
        // index
        this.reader = "Reader";
        this.writer = "Writer";
        this.header = "Lab 1: JSON, Object Constructor, localStorage";
        this.name = "Patricia Lo";
        this.studentId = "A00959925";

        // reader
        this.emptyReader = "No notes available. Add some notes!";
        this.readerUpdate = "Last updated at ";
        
        // writer
        this.placeholder = "Type your note here...";
        this.remove = "Remove";
        this.emptyWriter = "No notes yet. Add some notes!";
        this.writerUpdate = "Stored at ";
        this.addButton = "Add";
    }
}

export default new Message();