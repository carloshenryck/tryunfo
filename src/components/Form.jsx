import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          Nome
          <input type="text" id="name" data-testid="name-input" />
        </label>
        <label htmlFor="description">
          Descrição
          <textarea id="description" data-testid="description-input" />
        </label>
        <label htmlFor="attr01">
          Attr01
          <input type="number" id="attr01" data-testid="attr1-input" />
        </label>
        <label htmlFor="attr02">
          Attr02
          <input type="number" id="attr02" data-testid="attr2-input" />
        </label>
        <label htmlFor="attr03">
          Attr03
          <input type="number" id="attr03" data-testid="attr3-input" />
        </label>
        <label htmlFor="image">
          Imagem
          <input type="text" id="image" data-testid="image-input" />
        </label>
        <label htmlFor="rarity">
          Raridade
          <select id="rarity" data-testid="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="superTrunfo">
          Super Trybe Trunfo
          <input type="checkbox" id="superTrunfo" data-testid="trunfo-input" />
        </label>
        <button type="submit" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
