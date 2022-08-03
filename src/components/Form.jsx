import React from 'react';
import PropTypes from 'prop-types';
import '../styles/form.css';
import { AiOutlinePaperClip } from 'react-icons/ai';

class Form extends React.Component {
  superTrunfo = () => {
    const { cardTrunfo, hasTrunfo, onInputChange } = this.props;

    if (!hasTrunfo) {
      return (
        <label htmlFor="superTrunfo" className="trunfoCheck">
          Super Trybe Trunfo
          <input
            type="checkbox"
            id="superTrunfo"
            data-testid="trunfo-input"
            name="cardTrunfo"
            checked={ cardTrunfo }
            onChange={ onInputChange }
          />
        </label>
      );
    }

    return <p>Você já tem um Super Trunfo em seu baralho</p>;
  };

  render() {
    const {
      cardName,
      onInputChange,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      isSaveButtonDisabled,
      onSaveButtonClick,
    } = this.props;

    return (
      <div className="formWrapper">
        <form onSubmit={ (e) => e.preventDefault() }>

          <h1>Adicionar nova carta</h1>

          <label htmlFor="name" className="breakLine">
            <span className="labelMargin">Nome</span>
            <input
              type="text"
              id="name"
              className="borderLess"
              data-testid="name-input"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="description" className="breakLine">
            <span className="labelMargin">Descrição</span>
            <textarea
              id="description"
              className="borderLess"
              data-testid="description-input"
              name="cardDescription"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr01" className="labelInSameLine">
            <span>Attr01</span>
            <input
              type="number"
              id="attr01"
              className="takeEntireLine"
              data-testid="attr1-input"
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr02" className="labelInSameLine">
            <span>Attr02</span>
            <input
              type="number"
              id="attr02"
              className="takeEntireLine"
              data-testid="attr2-input"
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr03" className="labelInSameLine">
            <span>Attr03</span>
            <input
              type="number"
              id="attr03"
              className="takeEntireLine"
              data-testid="attr3-input"
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="image" className="labelInSameLine">
            <span className="labelMargin">Imagem</span>
            <div className="imgClipper">
              <AiOutlinePaperClip color="white" fontSize="20px" />
            </div>
            <input
              type="text"
              id="image"
              className="takeEntireLine leftBorderLess"
              data-testid="image-input"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="rarity" className="breakLine">
            <span className="labelMargin">Raridade</span>
            <select
              id="rarity"
              className="borderLess"
              data-testid="rare-input"
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          { this.superTrunfo() }
          <button
            type="submit"
            data-testid="save-button"
            name="isSaveButtonDisabled"
            className="saveButton"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  onInputChange: PropTypes.func,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onSaveButtonClick: PropTypes.func,
}.required;

export default Form;
