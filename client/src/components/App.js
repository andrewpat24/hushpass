import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'

// Components
import Header from './Header';
import Landing from './Landing';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser(); 
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="container">

                        <Header /> 
                        <Route exact path="/" component={Landing} />

                    </div>
                </BrowserRouter>
            </div>
        )   
    }
};

export default connect(null, actions)(App); 