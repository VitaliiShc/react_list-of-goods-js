/* eslint-disable */

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function internalArrayOfObjectsWithId(arr) {
  const internalArrayOfObjects = [];

  for (let i = 0; i < arr.length; i++) {
    internalArrayOfObjects.push({
      name: arr[i],
      internalId: i,
    });
  }

  return internalArrayOfObjects;
}

const goodsListWithId = internalArrayOfObjectsWithId(goodsFromServer);
const SORT_BY_LENGTH = 'length';
const SORT_BY_ABC = 'abc';

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [reversed, setReversed] = useState(false);

  let sortedGoods = goodsListWithId.toSorted((good1, good2) => {
    switch (sortValue) {
      case SORT_BY_LENGTH:
        return good1.name.length - good2.name.length;
      case SORT_BY_ABC:
        return good1.name.localeCompare(good2.name);
      default:
        return 0;
    }
  });

  if (reversed) {
    sortedGoods = sortedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortValue !== SORT_BY_ABC,
          })}
          onClick={() => setSortValue(SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortValue !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortValue(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed !== true,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortValue || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortValue('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedGoods} />
    </div>
  );
};
