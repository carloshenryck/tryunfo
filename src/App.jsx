import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './styles/app.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      searchInput: '',
      cards: [],
      filteredCards: [],
    };
  }

  verifyAttrs = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const attrs = [
      parseInt(cardAttr1, 10),
      parseInt(cardAttr2, 10),
      parseInt(cardAttr3, 10)];
    const max = 90;
    const min = 0;
    const maxSum = 210;

    for (let i = 0; i < attrs.length; i += 1) {
      if (attrs[i] > max || attrs[i] < min || Number.isNaN(attrs[i])) {
        return false;
      }
    }

    const sum = attrs.reduce((acc, i) => acc + i, 0);
    return sum <= maxSum;
  }

  validateButton = () => {
    const { cardName, cardDescription, cardImage } = this.state;

    if (cardName !== '' && cardDescription !== ''
    && cardImage !== '' && this.verifyAttrs()) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validateButton);
  };

  cleanInputs = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  onSaveButtonClick = () => {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo, hasTrunfo, cards } = this.state;

    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    if (cardTrunfo && !hasTrunfo) {
      this.setState({
        cards: [...cards, card],
        hasTrunfo: card.cardTrunfo,
      }, this.cleanInputs);
    }

    this.setState({
      cards: [...cards, card],
    }, this.cleanInputs);
  };

  deleteCard = ({ target }) => {
    const parentElement = target.parentNode;
    const name = parentElement.firstChild.firstChild
      .firstChild.firstChild.firstChild.textContent;
    const { cards } = this.state;

    const newCards = cards.filter((card) => card.cardName !== name);
    const cardElement = cards.find((card) => card.cardName === name);
    if (cardElement.cardTrunfo) {
      this.setState({
        cards: newCards,
        hasTrunfo: false,
      });
    }

    this.setState({
      cards: newCards,
    });
  }

  searchCard = ({ target: { value } }) => {
    this.setState({ searchInput: value }, () => {
      const { searchInput, cards } = this.state;

      if (searchInput !== '') {
        console.log(searchInput);
        const filteredCards = cards.filter((card) => (
          card.cardName.toLowerCase().includes(searchInput.toLowerCase())
        ));
        this.setState({ filteredCards });
      }
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      cards,
      searchInput,
      filteredCards,
    } = this.state;

    const renderCards = (cardsArr) => (
      cardsArr.map((card) => (
        <div className="cardWrapper" key={ card.cardName }>
          <Card
            cardName={ card.cardName }
            cardDescription={ card.cardDescription }
            cardAttr1={ card.cardAttr1 }
            cardAttr2={ card.cardAttr2 }
            cardAttr3={ card.cardAttr3 }
            cardImage={ card.cardImage }
            cardRare={ card.cardRare }
            cardTrunfo={ card.cardTrunfo }
            cardClass="cardWrapper"
            previewTitle={ false }
          />
          <button
            type="button"
            data-testid="delete-button"
            className="deleteButton"
            onClick={ this.deleteCard }
          >
            Excluir
          </button>
        </div>
      ))
    );

    return (
      <>
        <div className="container">
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
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />

          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            cardClass="previewWrapper"
            previewTitle
          />
        </div>

        <h1>Cards</h1>

        <input
          type="text"
          id="nameFilter"
          onChange={ (e) => this.searchCard(e) }
          data-testid="name-filter"
        />

        { searchInput.length >= 1 ? renderCards(filteredCards) : renderCards(cards) }
      </>
    );
  }
}

export default App;
