import { Component } from 'react';
import Head from 'next/head';
import { Editor, ButtonBar, ButtonGroup, Field, Preview, EmojiBar } from 'pulse-editor';
import {
  Bold,
  Italic,
  Underline,
  Code,
  Link,
  Image,
  OrderedList,
  UnorderedList,
  Quote,
  Heading,
  Youtube,
} from 'pulse-editor/buttons';

const defaultValue = `## Full usage example
This is an **example** usage of _PulseEditor_. You can use it to ++try how it works++.

\`\`\`
import { Editor, Field, Preview } from 'pulse-editor';
import { Bold, Italic } from 'pulse-editor/buttons';

export default () =>
	<Editor>
		<ButtonBar>
			<Bold><strong>Bold</strong></Bold>
			<Italic><em>I</em></Italic>
		</ButtonBar>
		<Field />
		<Preview />
	</Editor>
\`\`\`

> Check the console for some event logs.
`;

class HomePage extends Component {
  handleChange = ({ selected, selection, markdown, html, native }) => {
    console.group('Editor special change event')
    console.log('With this event you can get the `selected` text.')
    console.log('Along with the `selection` position inside the full value.')
    console.log('Of course, you also get the original `markdown` and the parsed `html`.')
    console.log('And since the changes are also triggered from a button click, text input, etc.')
    console.log('You will also get the `native` DOM event.')
    console.groupEnd('Editor special change event')
  }

  handleDrop = event => {
    console.group('Editor custom (drop) event')
    console.log('The editor is extensible!')
    console.log('This event is not actually used by the editor.')
    console.log('But you can use it to extend the editor features.')
    console.log('And create your own custom editor on top of this one.')
    console.groupEnd('Editor custom (drop) event')
  }

  setRef = editor => {
    console.log('We can also get the editor instance ref.');
    console.log('This can allow us to call editor methods to update the internal value.');
    console.log('That way we can extend our editor.');
    console.log('And implement features like Drag&Drop of images.');
    this.editor = editor;
  }

  render() {
    return (
      <main>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            rel="stylesheet"
            href="/static/styles.css"
          />
        </Head>
        <Editor
          name="main-editor"
          defaultValue={defaultValue}
          onChange={this.handleChange}
          onDrop={this.handleDrop}
          editorRef={this.setRef}
        >
          <ButtonBar>
            <ButtonGroup>
              <Bold><i className="fa fa-bold" aria-hidden="true" /></Bold>
              <Italic><i className="fa fa-italic" aria-hidden="true" /></Italic>
              <Underline><i className="fa fa-underline" aria-hidden="true" /></Underline>
            </ButtonGroup>
            <ButtonGroup>
              <Code><span><i className="fa fa-code" aria-hidden="true" /> Insert code</span></Code>
              <Link><span><i className="fa fa-link" aria-hidden="true" /> Link</span></Link>
              <Image><span><i className="fa fa-image" aria-hidden="true" /> Image</span></Image>
            </ButtonGroup>
            <ButtonGroup>
              <OrderedList><i className="fa fa-list-ol" aria-hidden="true" /></OrderedList>
              <UnorderedList><i className="fa fa-list-ul" aria-hidden="true" /></UnorderedList>
              <Quote><i className="fa fa-quote-left" aria-hidden="true" /></Quote>
              <Heading><i className="fa fa-header" aria-hidden="true" /></Heading>
              <Youtube><i className="fa fa-youtube-play" aria-hidden="true" /></Youtube>
            </ButtonGroup>
          </ButtonBar>
          <div className="PulseEditor-content">
            <Field style={{ height: '39px' }} />
            <Preview />
          </div>
          <EmojiBar />
        </Editor>
      </main>
    );
  }
}

export default HomePage;
