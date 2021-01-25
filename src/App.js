import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import 'tachyons'

// components
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import AddArtist from "./components/AddArtist";

// apollo client setup
const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div id="main">
                    <h1>Public Playlist</h1>
                    <h3>What's everybody listening?</h3>
                    <SongList/>
                    <div className="flex items-center justify-between">
                        <AddSong/>
                        <AddArtist/>
                    </div>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
