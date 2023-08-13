import { graphQLRequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Notes($folderId: String!) {
    folder(folderId: $folderId) {
        id,
        name,
        notes {
          id
          content
        }
      }
    }
  `;

  const data = await graphQLRequest({
    query,
    variables: {
      folderId,
    },
  });

  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      id
      content
    }
  }
    `;

  const data = await graphQLRequest({
    query,
    variables: {
      noteId,
    },
  });

  return data;
};

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();

  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));
  const query = `mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`;

  const { addNote } = await graphQLRequest({
    query,
    variables: formDataObj,
  });

  console.log("addNote", addNote);

  return addNote;
};

export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData();
  const formDataObj = {};
  updatedNote.forEach((value, key) => (formDataObj[key] = value));
  const query = `mutation Mutation(id: String!, $content: String!) {
    addNote(id: $id, content: $content) {
      id
      content
    }
  }`;

  console.log("updatedNote", updatedNote);
  return updatedNote;
};
