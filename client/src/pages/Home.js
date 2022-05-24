import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import PostsList from "../components/PostsList";


const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <Grid>
      {user && (
        <Grid.Column width={16}>
          <PostForm />
        </Grid.Column>
      )}

      <Grid.Column className="page-title" width={16}>
        <h1>Recent Posts</h1>
      </Grid.Column>

      <PostsList />
    </Grid >
  );
};

export default Home;
