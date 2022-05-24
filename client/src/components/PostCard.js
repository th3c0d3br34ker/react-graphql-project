import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";

import MyPopup from "../util/MyPopup";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    userImage,
    likeCount,
    commentCount,
    likes,
  },
}) {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  function deletePostCallback() {
    history.push("/");
  }

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="medium"
          avatar
          src={`https://semantic-ui.com/images/avatar2/small/${userImage}.png`}
          alt="avatar"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
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
  );
}

export default PostCard;
