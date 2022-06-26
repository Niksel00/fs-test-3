import React from 'react';
import PropTypes from 'prop-types';

function InterfaceBtnContainer(props) {
    const { reset, accent } = props;

    return (
        <fieldset className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular" onClick={reset} type="button">Отмена</button>
            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={accent} />
        </fieldset>
    );
}

InterfaceBtnContainer.propTypes = {
    reset: PropTypes.func,
    accent: PropTypes.func,
}

InterfaceBtnContainer.defaultProps = {
    reset: () => {},
    accent: () => {},
};

export default InterfaceBtnContainer;
