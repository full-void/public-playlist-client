import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {addArtistMutation, getSongsQuery} from '../queries/queries';

class AddArtist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: ''
        };
    }

    submitForm(e) {
        e.preventDefault()
        // use the addArtistMutation
        this.props.addArtistMutation({
            variables: {
                name: this.state.name,
                age: this.state.age
            },
            refetchQueries: [{ query: getSongsQuery }]
        });
        window.location.reload()
    }

    render() {
        return (
            <form id="add-artist" className="" onSubmit={this.submitForm.bind(this)}>
                <h3>Add Artist</h3>
                <div className="field">
                    <input type="text" placeholder="Name" onChange={(e) => this.setState({name: e.target.value})}/>
                </div>
                <div className="field">
                    <input type="text" placeholder="Age" onChange={(e) => this.setState({age: parseInt(e.target.value)})}/>
                </div>
                <div className="flex justify-center items-center">
                    <button className="primary-btn">SUBMIT</button>
                </div>
            </form>
        );
    }
}

export default graphql(addArtistMutation, {name: "addArtistMutation"})(AddArtist);