import React from 'react';
import ReactDOM from 'react-dom';
import Spotify from '../../util/Spotify';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state  = {
      searchResults: [],
      playlistName : 'favorites',
      playlistTracks: [],
      
    }
    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    for( let existingTrack of this.state.playlistTracks){
      if(existingTrack.id === track.id){
        return;
      }
    }
    let currentPlaylistTracks = this.state.playlistTracks.slice();
    currentPlaylistTracks.push(track);
    this.setState({playlistTracks: currentPlaylistTracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks.slice();
    tracks = tracks.filter(currentTrack => {
      return currentTrack.id !== track.id;
    })
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){

    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    console.log(trackURIs);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then( ()=> {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    })
  
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    }) 
  }

  render(){
    
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch = {this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults = {this.state.searchResults} onAdd = { this.addTrack}/>
          <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}  
          onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName}
          onSave = {this.savePlaylist}
          />

        </div>
      </div>
    </div>);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
export default App;