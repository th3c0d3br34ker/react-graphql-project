import React, { useContext, useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label,
  Dimmer,
  Loader,
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import MyPopup from "../util/MyPopup";
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from "../util/graphql";
import { useHistory, useParams } from "react-router-dom";

function SinglePost() {
  const history = useHistory();
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    history.push("/");
  }

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader size="massive" />
      </Dimmer>
    );

  } else {
    const { getPost } = data;
    const {
      id,
      body,
      createdAt,
      username,
      userImage,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    return (
      <Grid>
        <Grid.Column width={4}>
          <Image
            src={`https://semantic-ui.com/images/avatar2/large/${userImage}.png`}
            size="small"
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <MyPopup content="Comment on post">
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
              </MyPopup>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Comment.."
                      name="comment"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button blue"
                      disabled={comment.trim() === ""}
                      onClick={submitComment}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>
                  <Image
                    floated="left"
                    size="medium"
                    avatar
                    src={`https://semantic-ui.com/images/avatar2/small/${comment.userImage}.png`}
                    alt="avatar"
                  />

                  {comment.username}
                </Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid>
    );
  }
}

export default SinglePost;
