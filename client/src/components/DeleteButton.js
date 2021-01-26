import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import {
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
} from "../util/graphql";
import MyPopup from "../util/MyPopup";

function DeleteButton({ postId, commentId = false, callback = false }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        const newPosts = data.getPosts.filter(({ id }) => id !== postId);
        console.log(newPosts);
        data.getPosts = newPosts;
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (!!callback) {
        console.log("Callback called!");
        callback();
      }
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
          basic
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

export default DeleteButton;
