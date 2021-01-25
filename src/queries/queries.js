import { gql } from 'apollo-boost';

const getArtistsQuery = gql`
    {
        artists {
            name
            id
        }
    }
`;

const getSongsQuery = gql`
    {
        songs {
            name
            id
            kudos
        }
    }
`;

const addSongMutation = gql`
    mutation AddSong($name: String!, $genre: String!, $artistId: ID!){
        addSong(name: $name, genre: $genre, artistId: $artistId){
            name
            id
        }
    }
`;

const increaseSongKudosMutation = gql`
    mutation IncreaseKudos($songId: ID!){
        increaseKudos(songId: $songId){
            kudos
        }
    }
`;

const addArtistMutation = gql`
    mutation AddArtistMutation($name: String!, $age: Int!){
        addArtist(name: $name, age: $age) {
            name
        }
    }
`;

const getSongQuery = gql`
    query GetSong($id: ID){
        song(id: $id) {
            id
            name
            genre
            kudos
            artist {
                id
                name
                age
                songs {
                    name
                    id
                    kudos
                }
            }
        }
    }
`;

export { getArtistsQuery, getSongsQuery, addSongMutation, getSongQuery, increaseSongKudosMutation, addArtistMutation };
