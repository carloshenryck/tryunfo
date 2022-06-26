import React from 'react';
import Form from './components/Form';

class App extends React.Component {
  render() {
    let cardName;
    let cardDescription;
    let cardAttr1;
    let cardAttr2;
    let cardAttr3;
    let cardImage;
    let cardRare;
    let cardTrunfo;
    let hasTrunfo;
    let isSaveButtonDisabled;
    let onInputChange;
    let onSaveButtonClick;

    return (
      <Form
        cardName={ cardName }
        cardDescription={ cardDescription }
        cardAttr1={ cardAttr1 }
        cardAttr2={ cardAttr2 }
        cardAttr3={ cardAttr3 }
        cardImage={ cardImage }
        cardRare={ cardRare }
        cardTrunfo={ cardTrunfo }
        hasTrunfo={ hasTrunfo }
        isSaveButtonDisabled={ isSaveButtonDisabled }
        onInputChange={ onInputChange }
        onSaveButtonClick={ onSaveButtonClick }
      />
    );
  }
}

export default App;
