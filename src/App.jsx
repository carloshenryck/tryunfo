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
      isFiltered: false,
      searchInput: '',
      rarityInput: 'todas',
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
    }, () => {
      this.validateButton();
      if (name === 'searchInput' || name === 'rarityInput') {
        this.filterCard();
      }
    });
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

  isFiltered = () => {
    const { rarityInput, searchInput } = this.state;
    if (rarityInput !== 'todas' || searchInput !== '') {
      this.setState({ isFiltered: true });
    } else {
      this.setState({ isFiltered: false });
    }
  }

  filterCard = () => {
    const { cards, searchInput, rarityInput } = this.state;
    let filteredCards = cards;
    let isFiltered = false;
    if (searchInput !== '') {
      filteredCards = filteredCards.filter((card) => (
        card.cardName.toLowerCase().includes(searchInput.toLowerCase())
      ));
      isFiltered = true;
    }
    if (rarityInput !== 'todas') {
      filteredCards = filteredCards.filter((card) => (
        card.cardRare === rarityInput
      ));
      isFiltered = true;
    }
    this.setState({ filteredCards, isFiltered });
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
      filteredCards,
      isFiltered,
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
          name="searchInput"
          onChange={ this.onInputChange }
          data-testid="name-filter"
        />
        <select
          id="filterByRarity"
          data-testid="rare-filter"
          name="rarityInput"
          onChange={ this.onInputChange }
        >
          <option value="todas">todas</option>
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>
        { isFiltered ? renderCards(filteredCards) : renderCards(cards) }
      </>
    );
  }
}
export default App;
