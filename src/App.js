import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './component/shop/shop.component';
import Header from './component/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component{
    constructor() {
      super();

      this.state = {
         currentUser: null
      };
    }

    unsubscribeFromAuth = null

    componentDidMount() {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
          //this.setState({ currentUser: user}) ;
          //createUserProfileDocument(user);
          if(userAuth) {
            const userRef = await createUserProfileDocument(userAuth);

            userRef.onSnapshot(snapshot => {
              this.setState({
                currentUser: {
                id: snapshot.id,
                ...snapshot.data()
                }
              }, () => {
                console.log('state = ',this.state);
              })
            });
          }else{
            this.setState({currentUser: userAuth});
          }
      });
    }
    
    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }

  render() {
    return (
    <div> 
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInAndSignUpPage}/>
      </Switch>
    </div>
    )
}
}
export default App;
