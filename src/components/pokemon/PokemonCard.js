import React, { Component } from 'react';
import pokeball from '../pokemon/pokeball.gif';
import pokemonLogo from '../pokemon/pokemoncartridge.png'
import nintendoLogo from '../pokemon/nintendo.png'
import styled from 'styled-components';

const Sprite = styled.img`
  width: 8em;
  height: 8em;
  position: absolute;
  left: 40px;
  top: 18px;
  display: none;
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
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
  
    this.setState({
      name,
      imageUrl,
      pokemonIndex
    })
  }

  render() {
    return (
      <div className='col-md-6 mb-5'>
        <div className="cartridge">
          <div className="part part_1"></div>
          <div className="part part_2">
            <div className="part stripe"></div>
            <div className="part stripe"></div>
            <div className="part stripe"></div>
            <div className="part stripe"></div>
            <div className="part stripe"></div>
          </div>
          <div className="part logo"><p>Nintendo <span>Gameboy</span></p></div>
          <div className="part large"></div>
          <div className="part dark">
            <div className="part"></div>
          </div>
          <div className="part dark image_bg">
            <div 
              className="part image" 
              style={{ 
                zIndex: "1",
                background: 
                `linear-gradient(
                  rgba(${Math.floor(Math.random()*256)}, 
                  ${Math.floor(Math.random()*256)}, 
                  ${Math.floor(Math.random()*256)},
                  0.8),
                  rgba(${Math.floor(Math.random()*256)}, 
                  ${Math.floor(Math.random()*256)}, 
                  ${Math.floor(Math.random()*256)},
                  0.8))`
              }}>
              <img className='pokemon-logo' src={pokemonLogo} alt="logo"/>
              <img className='nintendo-logo' src={nintendoLogo} alt="logo"/>
              <Sprite
                className="img-pokemon mx-auto mt-2"
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
              <div className="cartridge-name">
                <h6>
                  {this.state.name
                    .toLowerCase()
                    .split('-')
                    .map(
                      word => word.charAt(0).toUpperCase() + word.substring(1)
                    )
                    .join(' ')} <br/>
                  Version
                </h6>
              </div>
            </div>
          </div>
          <div className="part triangle"></div>
        </div>
      </div>
    );
  }
}

export default PokemonCard;