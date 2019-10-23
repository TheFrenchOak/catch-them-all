import React, { Component } from 'react';
import pokeball from '../pokemon/pokeball.gif';
import styled from 'styled-components';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`
const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -o-user-select: none;
  user-select: none;
`
class PokemonCard extends Component {
  state = { 
    name: '',
    imageUrl: '',
    pokemonIndex: '',
    imageLoading: true,
    toManyRequests: false
  }
  
  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
  
    this.setState({
      name,
      imageUrl,
      pokemonIndex
    })
  }

  render() {
    return (
      <div className='col-md-3 col-sm-6 mb-5'>
        <Card className="card rounded">
          <h5 className="card-header">{this.state.pokemonIndex}</h5>
          <Sprite
            className="card-img-top rounded mx-auto mt-2"
            onLoad={() => this.setState({ imageLoading: false })}
            onError={() => this.setState({ toManyRequests: true })}
            src={this.state.imageUrl}
            style={ 
              this.state.toManyRequests ? { display: "none" } : 
              this.state.imageLoading ? null : { display: "block" } 
            }>
          </Sprite>
          { (this.state.imageLoading || this.state.toManyRequests) ? (
          <img 
            className="card-img-top rounded mx-auto d-block mt-2"
            src={pokeball}
            alt={this.state.name}
            style={{ width: '5em', height: '5em' }}
          />
          ) : null }
          <div className="card-body mx-auto">
            <h6 className="card-title">
              {this.state.name
                .toLowerCase()
                .split('-')
                .map(
                  word => word.charAt(0).toUpperCase() + word.substring(1)
                )
                .join(' ')}
            </h6>
          </div>
        </Card>
      </div>
    );
  }
}

export default PokemonCard;