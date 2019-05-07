import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'

// Components
import Header from './Header';
import Landing from './Landing';
import Download from './Download'

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
                        <Route exact path="/download" component={Download} />
                        <Route exact path="/download/:fileId" component={Download} />


                    </div>
                </BrowserRouter>
            </div>
        )   
    }
};

export default connect(null, actions)(App); 