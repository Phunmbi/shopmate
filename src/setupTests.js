import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// mock localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value;
  }
}

global.localStorage = new LocalStorageMock;
global.shallow = shallow;
global.render = render;
global.mount = mount;