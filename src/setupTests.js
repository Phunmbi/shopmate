import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// mock localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
}

global.localStorage = new LocalStorageMock;
global.shallow = shallow;
global.render = render;
global.mount = mount;