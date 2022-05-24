import { useQuery } from "@apollo/client";
import { Dimmer, Grid, Loader, Transition } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const PostsList = () => {
  const { data, loading } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return (
      <Grid.Column width={16}>
        <Dimmer active inverted>
          <Loader size='massive' />
        </Dimmer>
      </Grid.Column >
    )
  }

  const { getPosts: posts } = data;
  return (
    <Transition.Group>
      {posts.map((post) => (
        <Grid.Column key={post.id} style={{ marginBottom: 20 }} width={8}>
          <PostCard post={post} />
        </Grid.Column>
      ))}
    </Transition.Group>
  )
}

export default PostsList
