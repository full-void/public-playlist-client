import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {getSongQuery, increaseSongKudosMutation} from '../queries/queries';

class SongDetails extends Component {
    giveKudos() {
        console.log(this.props.data)
        this.props.increaseSongKudosMutation({
            variables: {
                songId: this.props.data.song.id
            }
        })
        window.location.reload()
    }

    displaySongDetails() {
        const {song} = this.props.data;
        if (song) {
            return (
                <div>
                    <h2>{song.name}</h2>
                    <button className="primary-btn-dark" onClick={this.giveKudos.bind(this)}>GIVE KUDOS!</button>
                    <p>Kudos: {song.kudos}</p>
                    <p>Genre: {song.genre}</p>
                    <p>By {song.artist.name}</p>
                    <p>All songs by {song.artist.name}</p>
                    <ul className="other-songs">
                        {song.artist.songs.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return (<div>No song selected...</div>);
        }
    }

    render() {
        return (
            <div id="song-details">
                {this.displaySongDetails()}
            </div>
        );
    }
}

export default compose(
    graphql(getSongQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.songId
                }
            }
        }
    }),
    graphql(increaseSongKudosMutation, {name: "increaseSongKudosMutation"}))(SongDetails);
