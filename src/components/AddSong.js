import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getArtistsQuery, addSongMutation, getSongsQuery } from '../queries/queries';

class AddSong extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            artistId: ''
        };
    }
    displayArtists(){
        var data = this.props.getArtistsQuery;
        if(data.loading){
            return( <option disabled>Loading artists</option> );
        } else {
            return data.artists.map(artist => {
                return( <option key={ artist.id } value={artist.id}>{ artist.name }</option> );
            });
        }
    }
    submitForm(e){
        e.preventDefault()
        // use the addSongMutation
        this.props.addSongMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                artistId: this.state.artistId
            },
            refetchQueries: [{ query: getSongsQuery }]
        });
    }
    render(){
        return(
            <form id="add-song" onSubmit={ this.submitForm.bind(this) } >
                <h3>Add Song</h3>
                <div className="field">
                    <input type="text" placeholder="Name" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <input type="text" placeholder="Genre" onChange={ (e) => this.setState({ genre: e.target.value }) } />
                </div>
                <div className="field">
                    <select onChange={ (e) => this.setState({ artistId: e.target.value }) } >
                        { this.displayArtists() }
                    </select>
                </div>
                <div className="flex justify-center items-center">
                    <button className="primary-btn">SUBMIT</button>
                </div>
            </form>
        );
    }
}

export default compose(
    graphql(getArtistsQuery, { name: "getArtistsQuery" }),
    graphql(addSongMutation, { name: "addSongMutation" })
)(AddSong);
