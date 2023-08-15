import fakeData from "../fakeData/index.js";
import AuthorModel from "../models/AuthorModel.js";
import FolderModel from "../models/FolderModel.js";
import NoteModel from "../models/NoteModel.js";

export const resolvers = {
  // resolver cha
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: "desc",
      });

      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },
  // Viết cho mỗi lần graphQL thấy dữ liệu author thì trả về
  // resolver con
  Folder: {
    author: async (parent, args) => {
      const { authorId } = parent;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (parent, args) => {
      const notes = await NoteModel.find({
        folderId: parent.id,
      });

      return notes;
    },
  },
  Mutation: {
    updateNote: async (parent, args) => {
      console.log("updateNote");
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      console.log({ note });
      return note;
    },
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.id });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};
