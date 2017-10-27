import React, { Component } from 'react';
import { Text,StyleSheet } from 'react-native';
import { firebaseApp } from '../../Firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            email:'',
            password:'',
            error:'',
            loading:false
        };
    }

    onButtonPress()
    {
        const { email, password } = this.state;
        this.setState({error:'',loading:true});

        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(
            this.onLoginSuccess.bind(this)
        )
        .catch(()=>{
            firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then(
                this.onLoginSuccess.bind(this)
            )
            .catch(
                    this.onLoginFail.bind(this)
            );
        });
    }
    onLoginFail()
    {
        this.setState({
            error:'Authentication Failed.',
            loading:false});
    }

    onLoginSuccess()
    {
        this.setState({
            email:'',
            password:'',
            error:'',
            loading:false
        });
    }

    renderButton (){
        if(this.state.loading)
        {
            return <Spinner size="small" />;
        }
        return (
            <Button
                onPress={this.onButtonPress.bind(this)}
                >
                Log In
            </Button>
        );
    }

    render () {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        value={this.state.email}
                        onChangeText= {email=>this.setState({ email })}
                        placeholder="user@domain.com"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Password"
                        value={this.state.password}
                        onChangeText= {password=>this.setState({ password })}
                        placeholder="password"
                        secureTextEntry
                    />
                </CardSection>
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    errorText: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

export default LoginForm;
