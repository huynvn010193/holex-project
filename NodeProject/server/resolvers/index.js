import fakeData from "../fakeData/index.js";
import FolderModel from "../models/FolderModel.js";

export const resolvers = {
  // resolver cha
  Query: {
    folders: async () => {
      const folders = await FolderModel.find();
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne({
        _id: folderId,
      });
      return foundFolder;
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  // Viết cho mỗi lần graphQL thấy dữ liệu author thì trả về
  // resolver con
  Folder: {
    author: (parent, args) => {
      const { authorId } = parent;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({ ...args, authorId: "123" });
      console.log({ newFolder });
      await newFolder.save();
      return newFolder;
    },
  },
};
