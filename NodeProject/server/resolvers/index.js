import { GraphQLScalarType } from "graphql";
import { PubSub } from "graphql-subscriptions";
import {
  AuthorModel,
  FolderModel,
  NoteModel,
  NotificationModel,
} from "../models/index.js";

const pubsub = new PubSub();

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date", // Khai báo tên gì thì trong schema phải đặt đúng tên đó.
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
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
      }).sort({
        updatedAt: "desc",
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
      pubsub.publish("FOLDER_CREATED", {
        folderCreated: {
          message: "A new folder created",
        },
      });
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
    pushNotification: async (parent, args) => {
      const newNotification = new NotificationModel(args);
      pubsub.publish("PUSH_NOTIFICATION", {
        notification: {
          message: args.content,
        },
      });
      await newNotification.save();
      return { message: "SUCCESS" };
    },
  },
  Subscription: {
    // Khi có bất kỳ folder nào được tạo => thông báo cho người dùng.
    folderCreated: {
      // Đang lắng nghe 1 event "FOLDER_CREATED"
      // là array => có thể lắng nghe nhiều sự kiện.
      subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED"]),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"]),
    },
  },
};
