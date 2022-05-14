import React, { useCallback, useMemo, useRef, useState, } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux';

import { Button, Box, Grid, Fab } from '@mui/material';
import { IconSquarePlus } from '@tabler/icons';

import { EditorState, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';
import "@draft-js-plugins/mention/lib/plugin.css";

import { CREATE_COMMENT, FETCH_POSTS_QUERY, FETCH_POST, ME, USER_MENTION } from '../../../graphql';
import { MAX_POST_IMAGE_SIZE, NotificationType } from '../../../constants'
import useNotifications from '../../../hooks/useNotifications'
import { editorStyle } from './styles';

const CommentCreate = ({ postId, author }) => {
  const ref = useRef(null);
  const client = useApolloClient()
  const notification = useNotifications()
  const auth = useSelector(state => state?.users?.user)


  const [image, setImage] = useState('')
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const rawEditorContent = convertToRaw(editorState.getCurrentContent());
  const mappedBlocks = rawEditorContent.blocks.map(block => (!block.text.trim() && '\n') || block.text);
  const commentText = mappedBlocks.reduce((acc, block) => {
    let returned = acc;
    if (block === "\n") returned += block;
    else returned += `${block}\n`;
    return returned;
  }, "")
  const mentionList = Object.values(rawEditorContent.entityMap).map(entity => entity.data.mention);
  const mentions = mentionList.map(({ id: userId, name: fullName }) => ({ userId, fullName }));



  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    onError(err) {
      console.log(err?.graphQLErrors[0]?.message)
    },
    variables: {
      input: {
        postId,
        comment: commentText,
        image: image ? image : null,
        mentions: mentions.length ? mentions : null
      }
    },
    refetchQueries: [
      { query: FETCH_POSTS_QUERY },
      { query: FETCH_POST, variables: { postId } },
      { query: ME },
    ]
  })


  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({ mentionPrefix: '@' })
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(async ({ value }) => {
    const { data } = await client.query({
      query: USER_MENTION,
      variables: {
        searchQuery: value,
        postId
      },
    });
    const result = data.userMentionSearch.map(({ id, fullName: name, image: avatar }) => ({ id, name, avatar }));
    setSuggestions(result);
  }, [setSuggestions, postId, client]);

  const focusEditor = () => {
    ref.current.focus()
  }
  const handlePostImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size >= MAX_POST_IMAGE_SIZE) {
      console.log(`File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`);
      return;
    }
    setImage(file);
    e.target.value = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await createComment()
    const mention = mentions?.map(item => item?.userId)
    if (mention.length || auth?.id !== author?.id) {
      notification.create({
        userId: author?.id,
        postId,
        mentions: mention,
        notificationType: NotificationType.COMMENT,
        notificationTypeId: data?.createComment?.id,
      })
    }
    setEditorState(EditorState.createEmpty())
    setImage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12}>
          <Box sx={editorStyle} onClick={() => focusEditor()}   >
            <Editor
              editorKey={'editor'}
              editorState={editorState}
              onChange={setEditorState}
              plugins={plugins}
              ref={ref}
            />
            <MentionSuggestions
              open={open}
              onOpenChange={onOpenChange}
              suggestions={suggestions}
              onSearchChange={onSearchChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
            <label htmlFor="commentImage">
              <input
                style={{ display: "none" }}
                id="commentImage"
                name="commentImage"
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={handlePostImageUpload}
              />
              <Fab
                color="inherit"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                sx={{ width: 60, height: 50, boxShadow: 'none', zIndex: 1 }}
                disableRipple={true}
                disableFocusRipple={true}
              >
                <IconSquarePlus />
              </Fab>
            </label>
            {
              image && (
                <Box sx={{ width: '100%', height: 40, display: 'flex', ml: 5, mt: 1 }}>
                  <img key={image.name} src={URL.createObjectURL(image)} alt="..." style={{ marginRight: 5, borderRadius: 5 }} />
                </Box>
              )
            }
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary' size='large' disabled={loading}>
            Create Comment
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CommentCreate