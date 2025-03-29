import React, { useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'


const ContentEditor = () => {
  const editorInstance = useRef(null); // Ref to hold the Editor.js instance
  const editorElement = useRef(null); // Ref to the DOM element where Editor.js will be attached

  useEffect(() => {
    if (!editorElement.current) return; // Ensure the element is available

    if (!editorInstance.current) {
      // Initialize Editor.js only once
      editorInstance.current = new EditorJS({
        holder: editorElement.current, // Use the ref's current value
        tools: {
          header: {
            class: Header, // Use imported Header
            inlineToolbar: ['link', 'bold', 'italic'],
          },
          list: {
            class: List, // Use imported List
            inlineToolbar: true,
          },
        },
        autofocus: true,
        placeholder: 'Write Something...',
        logLevel: 'ERROR',
        onReady: () => {
          console.log('Editor.js is ready to work');
        },
        onChange: () => {
          console.log('Sync data to web socket!');
        },
      });
    }


  }, []); // Empty dependency array ensures this runs only on mount/unmount

  return (
    <>
        <div id="editorjs" ref={editorElement} className="w-full overflow-x-hidden"></div>
    </>
  );
};

export default ContentEditor;