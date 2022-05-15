import { MAX_POST_IMAGE_SIZE } from '../../../../constants'

export const editorContent = (editorState) => {
  const mappedBlocks = editorState.blocks.map(block => (!block.text.trim() && '\n') || block.text);
  return mappedBlocks.reduce((acc, block) => {
    let returned = acc;
    if (block === "\n") returned += block;
    else returned += `${block}\n`;
    return returned;
  }, "")
}

export const mentionList = (editorState) => {
  const mentionList = Object.values(editorState.entityMap).map(entity => entity.data.mention);
  return mentionList.map(({ id: userId, name: fullName }) => ({ userId, fullName }));
}
export const handlePostImageUpload = async (e, setImage) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size >= MAX_POST_IMAGE_SIZE) {
    console.log(`File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`);
    return;
  }
  setImage(file);
  e.target.value = null;
}