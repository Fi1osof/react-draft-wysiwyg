/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import { Editor } from '../../src';

const TestOption = () => <div>testing</div>;

const TestOption2 = () => <div>resting</div>;

class DemoEditor extends Component {

  state: any = {
    editorContent: undefined,
    editorState: EditorState.createEmpty(),
  };

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onContentStateChange: Function = () => {
  };

  clearContent: Function = () => {
    this.setState({
      contentState: convertToRaw(ContentState.createFromText('')),
    });
  };

  imageUploadCallBack: Function = file => new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData(); // eslint-disable-line no-undef
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      },
    );

  render() {
    const { editorContent } = this.state;
    return (
      <div className="rdw-storybook-root">
        <div className="rdw-storybook-label">
          Toolbar is alwasy <sup>visible</sup>
        </div>
        <button onClick={this.clearContent} tabIndex={0}>Force Editor State</button>
        <div className="rdw-storybook-editorSection">
          <input tabIndex={0} />
          <div className="rdw-storybook-editorWrapper">
            <Editor
              tabIndex={0}
              hashtag={{}}
              toolbarClassName="rdw-storybook-toolbar"
              wrapperClassName="rdw-storybook-wrapper"
              editorClassName="rdw-storybook-editor"
              toolbar={{
                history: { inDropdown: true },
                inline: { inDropdown: false },
                list: { inDropdown: true },
                link: { showOpenOptionOnHover: true },
                textAlign: { inDropdown: true },
                image: { uploadCallback: this.imageUploadCallBack },
              }}
              onEditorStateChange={this.onEditorStateChange}
              onContentStateChange={this.onEditorChange}
              placeholder="testing"
              spellCheck
              toolbarCustomButtons={[<TestOption />, <TestOption2 />]}
              onFocus={() => {}}
              onBlur={() => {}}
              onTab={() => true}
              localization={{ locale: 'zh', translations: { 'generic.add': 'Test-Add' } }}
              mention={{
                separator: ' ',
                trigger: '@',
                caseSensitive: true,
                suggestions: [
                  { text: 'A', value: 'AB', url: 'href-a' },
                  { text: 'AB', value: 'ABC', url: 'href-ab' },
                  { text: 'ABC', value: 'ABCD', url: 'href-abc' },
                  { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
                  { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
                  { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
                  { text: 'ABCDEFG', value: 'ABCDEFG', url: 'href-abcdefg' },
                ],
              }}
            />
          </div>
          <input tabIndex={0} />
          <textarea
            className="rdw-storybook-content no-focus"
            value={draftToHtml(editorContent)}
          />
          <textarea
            className="rdw-storybook-content no-focus"
            value={draftToMarkdown(editorContent)}
          />
          <textarea
            className="rdw-storybook-content no-focus"
            value={JSON.stringify(editorContent)}
          />
        </div>
      </div>
    );
  }
}

export default DemoEditor; // eslint-disable-line no-undef