import { AppShell, Box, Button, Title } from "@mantine/core";
import '@mantine/tiptap/styles.css';
import { useDisclosure } from "@mantine/hooks";
import Header from "../utils/Header";
import Footer from "../utils/Footer";
import {
  IconArrowsLeftRight,
  IconFolder,
  IconSettings,
  IconVideo,
  IconImageInPicture,
  IconChartBar,
  IconChartArea,
  IconTable,
  IconPlus,
  IconPhoto,
} from "@tabler/icons-react";
import { rem } from "@mantine/core";

import { Link, RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'


const links = [
  { link: "/projects", label: "Projects", icon: <IconFolder style={{ width: rem(14), height: rem(14) }} /> },
  { link: "/settings", label: "Settings", icon: <IconSettings style={{ width: rem(14), height: rem(14) }} /> },
  { link: "/pointers", label: "Pointers", icon: <IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} /> },
];

const Dashboard = () => {
  const [opened, { toggle }] = useDisclosure();

  const content =
    '<h1 style="text-align: center;">Welcome to Purity - Project Montor</h1><p><code>Purity</code> focuses on usability and is designed to be as simple as possible to bring a familiar project experience to regular users. <code>Purity</code> was developed by <a href="https://portfolio-wamunyima.vercel.app/" rel="noopener noreferrer" target="_blank">Wamunyima Mukelabai</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';


  const editor = useEditor({
    extensions: [
      ListItem,
      BulletList,
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content,
  });


  // const addImage = useCallback(() => {
  //   const url = window.prompt('URL')

  //   if (url) {
  //     editor!.chain().focus().setImage({ src: url }).run()
  //   }
  // }, [editor])

  const addImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', file);

      fetch('https://api.imgbb.com/1/upload?key=api_key', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => resolve(result.data.url))
        .catch(() => reject(new Error('Upload failed')));
    });


  return (
    <AppShell
      header={{ height: 60 }}
      aside={{
        width: 300,
        breakpoint: "lg",
        collapsed: { mobile: true},
      }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      styles={(theme) => ({
        main: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        },
      })}
      footer={{
        height: 300,
        offset: false,
      }}
    >
      <AppShell.Header className="content-center">
        <Header
          side_nav_panel_opened={opened}
          side_nav_panel_toggle={toggle}
          links={links}
        />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        List of project proposals
        <Button fullWidth leftSection={<IconPlus stroke={1.5} size="1rem"/>} mt={20}>New Proposal</Button>
      </AppShell.Navbar>

      <AppShell.Aside p="md">
        <Title order={4}>Table of contents</Title>
      </AppShell.Aside>

      <AppShell.Main className="flex-grow">
        <RichTextEditor editor={editor} className="p-5">
          {editor && (
            <FloatingMenu editor={editor}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.BulletList />
              </RichTextEditor.ControlsGroup>
            </FloatingMenu>
          )}

          {editor && (
            <BubbleMenu editor={editor}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Link />
              </RichTextEditor.ControlsGroup>
            </BubbleMenu>
          )}

          <RichTextEditor.Toolbar sticky stickyOffset={60} >
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
              <RichTextEditor.CodeBlock />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>

              <RichTextEditor.Control
                onClick={() => editor?.commands.insertContent('⭐')}
                aria-label="Insert star emoji"
                title="Insert star emoji">
                <IconVideo stroke={1.5} size="1rem" />
              </RichTextEditor.Control>

              <RichTextEditor.Control
                onClick={() => editor?.commands.insertContent('⭐')}
                aria-label="Insert star emoji"
                title="Insert star emoji">
                <IconPhoto stroke={1.5} size="1rem" />
              </RichTextEditor.Control>

              <RichTextEditor.Control
                onClick={() => editor?.commands.insertContent('⭐')}
                aria-label="Insert star emoji"
                title="Insert star emoji">
                <IconChartArea stroke={1.5} size="1rem" />
              </RichTextEditor.Control>

              <RichTextEditor.Control
                onClick={() => editor?.commands.insertContent('⭐')}
                aria-label="Insert star emoji"
                title="Insert star emoji">
                <IconTable stroke={1.5} size="1rem" />
              </RichTextEditor.Control>

            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content p={5} />
        </RichTextEditor>
        <Box className="mt-auto w-full border-t">
          <Footer />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default Dashboard;
