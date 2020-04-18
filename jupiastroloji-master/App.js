import React, {Component} from 'react';
import {
  Button,
  Container,
  Content,
  Form,
  Label,
  Icon,
  Item,
  Input,
  Spinner,
  Text,
} from 'native-base';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCbIgkayS_eTC0S3NYXhUVdPhGzkAjSU00',
  authDomain: 'jupiastroloji.firebaseapp.com',
  databaseURL: 'https://jupiastroloji.firebaseio.com',
  projectId: 'jupiastroloji',
  storageBucket: 'jupiastroloji.appspot.com',
  messagingSenderId: '937787959865',
  appId: '1:937787959865:web:5284996753dc1acaa87be8',
  measurementId: 'G-LSPH1XB5P8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  signUp() {
    this.setState({loading: true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(temp => {
        this.setState({loading: false});
        console.log('First');
        console.log(temp);
      })
      .catch(error => {
        this.setState({loading: false});
        console.log('Second');
        console.log(error);
        alert(error);
      });
  }

  login() {
    this.setState({loading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(temp => {
        this.setState({loading: false});
        console.log('Login');
      })
      .catch(error => {
        this.setState({loading: false});
        console.log('Login error');
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Kullanici adi</Label>
            <Input onChangeText={email => this.setState({email})}></Input>
          </Item>
          <Item floatingLabel>
            <Label>Sifre</Label>
            <Input
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}></Input>
          </Item>
        </Form>

        <Button
          full
          rounded
          success
          iconLeft
          style={{marginTop: 50}}
          onPress={() => {
            this.login(this.state.email, this.state.password);
          }}>
          <Icon name="ios-person" />
          <Text>Giris Yap</Text>
        </Button>

        <Button
          full
          rounded
          primary
          iconLeft
          style={{marginTop: 10}}
          onPress={() => {
            this.signUp(this.state.email, this.state.password);
          }}>
          <Icon name="ios-person" />
          <Text>Kayit ol</Text>
        </Button>

        {this.state.loading && <Spinner color="blue" />}
      </Container>
    );
  }
}
