import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from "../util/graphql";
import { useHistory } from "react-router-dom";

function PostForm() {
  const history = useHistory();
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const newPosts = [result.data.createPost, ...data.getPosts];
      console.log(newPosts);
      data.getPosts = newPosts;
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
    onError(err) {
      console.error(err.graphQLErrors[0]);
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
    history.go(0);
    console.log("Callback Called");
  }

  return (
    <>
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={!!error}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: "20px" }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PostForm;
