
import { Component } from 'react';

import { fetchBreeds, fetchDogBreed } from './api';
import { GlobalStyle } from './GlobalStyle';
import { Dog } from './Dog';
import { BreedSelect } from './BreedSelect';




export class App extends Component {
  state = {
    breeds: [],
    dog: null,
    error: null,
  };

  async componentDidMount() {
  try {
    const breeds = await fetchBreeds();
    this.setState({breeds: breeds});
  } catch (error) { 
    this.setState({ error: 'error'});
   }  
  }

  selectBreed = async (breedId) => {
    try {
     const dog = await fetchDogBreed(breedId)
      this.setState({ dog });
    } catch (error) {
      this.setState({ error: 'error'});
    }
  };

  render() {
    const {breeds, dog, error } = this.state;

    return (
      <>
        <BreedSelect breeds={breeds} onSelect={this.selectBreed} />
        {error && <div>{error}</div>}
        {dog && <Dog dog={dog} />}
         <GlobalStyle />
    </>
  );
  }
};
