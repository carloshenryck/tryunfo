import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';

class Card extends React.Component {
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
      previewTitle,
      cardClass,
    } = this.props;

    return (
      <div className={ cardClass }>
        { previewTitle && <h1 className="previewTitle">Pré-visualização</h1>}
        <div className="preview">
          <div className="background">
            <div className="cardTitle">
              <p data-testid="name-card">{cardName}</p>
            </div>
            <img src={ cardImage } alt={ cardName } data-testid="image-card" />
            <p
              data-testid="description-card"
              className="description"
            >
              {cardDescription}
            </p>
            <div className="infoSection">
              <p data-testid="attr1-card" className="attr">
                Attr01...........................
                {cardAttr1}
              </p>
              <p data-testid="attr2-card" className="attr">
                Attr02...........................
                {cardAttr2}
              </p>
              <p data-testid="attr3-card" className="attr">
                Attr03...........................
                {cardAttr3}
              </p>
              <p data-testid="rare-card">{cardRare}</p>
              { cardTrunfo === true && <p data-testid="trunfo-card">Super Trunfo</p> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  cardClass: PropTypes.string,
}.required;

export default Card;
