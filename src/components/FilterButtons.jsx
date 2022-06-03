/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

const buttonFilters = ['all', 'active', 'completed'];

const FilterButtons = ({ statusHandler }) => {
  const [active, setActive] = useState(buttonFilters[0]);

  return (
    <div onClick={statusHandler} className="filters">
      {buttonFilters.map((button) => (
        <button
          key={button}
          className={active === button ? 'active' : ''}
          onClick={() => setActive(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
