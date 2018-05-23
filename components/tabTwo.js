import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
export default class tabTwo extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button danger><Text> Danger </Text></Button>
          <Button dark><Text> Dark </Text></Button>
        </Content>
      </Container>
    );
  }
}