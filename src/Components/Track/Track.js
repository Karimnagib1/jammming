import React from 'react';
import './Track.css';
export class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction(){
        if(this.props.isRemoval){
            return (<button className = 'Track-action' onClick={this.removeTrack}>-</button>);
        } else {
            return (<button className = 'Track-action' onClick= {this.addTrack}>+</button>);
        }
    }
    addPreview(){
        if(!this.props.isRemoval){
            if(this.props.preview){
                return(
                    <div className='preview'>
                        <audio controls>
                            <source src={this.props.preview} type="audio/ogg"/>
                            <source src={this.props.preview} type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio> 
                    </div>
                );
            } else {
                return <p class='no_p'>No preview available :(</p>
            }
     
        }
    }
    addTrack(){
        this.props.onAdd(this.props.track);
    }
    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    render() {
        return (
            < div className= 'container'>
                <div className="Track">
                    <div className="Track-information">
                        <h3>{this.props.track.name}</h3>
                        <p>{this.props.track.artist} | {this.props.track.album}</p>
                        
                    </div>
                    {this.renderAction()}
                    
                </div>
                <div className= 'audio-container'>
                    {this.addPreview()}
                </div>
    
            </div>

            
        );
    }
}