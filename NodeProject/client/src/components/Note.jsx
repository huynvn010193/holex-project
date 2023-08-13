import React, { useEffect, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";

export default function Note() {
  const { note } = useLoaderData();
  const location = useLocation();
  const submit = useSubmit();

  console.log("location", location);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertFromRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorsState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something"
    ></Editor>
  );
}
