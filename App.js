import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebaseApp } from './Firebase';

import { Header, Button, Spinner, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn:null
        };
    }

    componentWillMount()
    {

        firebaseApp.auth().onAuthStateChanged((user)=>{
            if(user)
            {
                this.setState({ loggedIn:true });
            }
            else{
                this.setState({ loggedIn:false });
            }
        });
    }
    renderContent(){

        switch(this.state.loggedIn)
        {
            case true:
                return (
                    <CardSection>
                        <Button onPress={()=> firebaseApp.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
                break;
            case false:
                return <LoginForm />;
                break;
            default:
                return <Spinner size="large" />;
                break;


        }

    }
  render() {
    return (
      <View>
          <Header headerText="Authentication"></Header>
          {this.renderContent()}

      </View>
    );
  }
}
