import React, { useCallback, useMemo, useRef, useState, } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux';

import { Button, Box, Grid, Fab, Typography } from '@mui/material';
import { IconSquarePlus } from '@tabler/icons';

import { EditorState, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';
import "@draft-js-plugins/mention/lib/plugin.css";

import { CREATE_COMMENT, FETCH_POSTS_QUERY, FETCH_POST, GET_AUTH_USER, USER_MENTION } from '../../../graphql';
import { NotificationType } from '../../../constants'
import useNotifications from '../../../hooks/useNotifications'
import { editorContent, mentionList, handlePostImageUpload, editorStyle } from './CommentHelper';

const CommentCreate = ({ postId, author }) => {
  const ref = useRef(null);
  const focusEditor = () => ref.current.focus();
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()
  const notification = useNotifications()
  const auth = useSelector(state => state?.users?.user)

  const [image, setImage] = useState('')
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const rawEditorContent = convertToRaw(editorState.getCurrentContent());
  const commentText = editorContent(rawEditorContent)
  const mentions = mentionList(rawEditorContent)

  const [createComment, { error }] = useMutation(CREATE_COMMENT, {
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
      { query: GET_AUTH_USER },
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
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
    setLoading(false)
  }
  if (error) return <Typography>Something wrong creating comment</Typography>
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify='center' alignItems='flex-end' >
        {
          image && (
            <Grid item xs={12} sx={{ padding: 1 }}>
              <Box sx={{ width: '100%', height: 40, display: 'flex' }}>
                <img key={image.name} src={URL.createObjectURL(image)} alt="..." style={{ marginRight: 5, borderRadius: 5 }} />
              </Box>
            </Grid>
          )
        }
        <Grid item xs={7} sm={6} md={8} lg={8} >
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
        <Grid item xs={5} sm={6} md={4} lg={4} sx={{ marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label htmlFor="commentImage" style={{ paddingInline: 5 }}>
              <input
                style={{ display: "none" }}
                id="commentImage"
                name="commentImage"
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={(e) => handlePostImageUpload(e, setImage)}
              />
              <Fab
                color="inherit"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                sx={{ boxShadow: 'none', zIndex: 1, borderRadius: 1.5, width: 50 }}
                disableRipple={true}
                disableFocusRipple={true}
              >
                <IconSquarePlus />
              </Fab>
            </label>

            <Button type='submit' variant='contained' color='primary' disabled={loading}>
              <Typography variant='subtitle2' color='white'>Comment</Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default CommentCreate