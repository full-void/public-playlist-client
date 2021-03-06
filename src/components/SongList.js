import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getSongsQuery } from '../queries/queries';

// components
import SongDetails from './SongDetails';

class SongList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    displaySongs(){
        let data = this.props.data;
        console.log("DATA: " , data)
        if(data.loading){
            return( <div>Loading songs...</div> );
        } else {
            console.log("SongList DATA: " , data)
            return data.songs.map(song => {
                return(
                    <li key={ song.id } onClick={ (e) => this.setState({ selected: song.id }) }>{ song.name } : { song.kudos }</li>
                );
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="song-list">
                    { this.displaySongs() }
                </ul>
                <SongDetails songId={ this.state.selected } />
            </div>
        );
    }
}

export default graphql(getSongsQuery)(SongList);
