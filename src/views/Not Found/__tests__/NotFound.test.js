import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import NotFoundContainer  from '../index';

describe('<ConnectedHomePage />', () => {
  const props = {};
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  let wrapper;

  beforeEach(() => {
    wrapper =  mount(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundContainer {...props} />
        </MemoryRouter>
      </Provider>
    );
    localStorage.clear();
  });

  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });
});