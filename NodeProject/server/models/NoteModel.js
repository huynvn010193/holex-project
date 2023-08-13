import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    folderId: {
      type: String,
      required: true, // Vì 1 note phải thuộc 1 folder
    },
  },
  { timestamps: true }
);

// Tự động tạo createAt and updateAt => timestamps = true

const NoteModel = mongoose.model("Note", noteSchema);
export default NoteModel;
