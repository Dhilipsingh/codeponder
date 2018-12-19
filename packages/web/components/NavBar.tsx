import * as React from "react";
import { Link, Text, Flex } from "rebass";
import NextLink from "next/link";
import { MeComponent } from "./apollo-components";
import get from "lodash.get";
import { MyButton, Avatar } from "@codeponder/ui";
import Router from "next/router";
import styled from "styled-components";

const Container = styled(Flex)`
  flex: 0 0 auto;
`;

export const NavBar = () => {
  return (
    <Container my="1.5rem" justifyContent="space-between">
      <NextLink passHref href="/">
        <Link fontSize={5} color="primary.1">
          <Text fontFamily="rubik">Code Ponder 🤔</Text>
        </Link>
      </NextLink>

      <MeComponent>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          let isLoggedIn = !!get(data, "me", false);

          if (isLoggedIn) {
            return (
              <Flex>
                <MyButton
                  variant="primary"
                  onClick={() => Router.push("/pick-repo")}
                >
                  NEW CODE REVIEW
                </MyButton>
                <Avatar size={32} src={data!.me!.pictureUrl} alt="avatar" />
              </Flex>
            );
          }

          return (
            <a href="http://localhost:4000/auth/github">login with github</a>
          );
        }}
      </MeComponent>
    </Container>
  );
};
