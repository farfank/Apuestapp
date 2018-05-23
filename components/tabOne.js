import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
export default class tabOne extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button light><Text> Light </Text></Button>
          <Button primary><Text> Primary </Text></Button>

        </Content>
      </Container>
    );
  }
}