import React, { useEffect, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

export default function Note() {
  const note = {
    id: "9999",
    content: "<p>This is new note</p>",
  };

  const [editorsState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertFromRaw(e.currentContent())));
  };

  return (
    <Editor
      editorState={editorsState}
      onEditorStateChange={handleOnChange}
      placeholder='Write something'
    ></Editor>
  );
}
