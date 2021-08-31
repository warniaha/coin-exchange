import { render, screen } from '@testing-library/react';
import App from '../App';
import {create} from 'react-test-renderer';
import filesystem from 'fs';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

const skippedElements = ["_debug.*"];

function circularStringify(obj, skippedElements = []) {
  var cache = [];
  const newData = JSON.stringify(obj, (key, value) => {
    // skip anything that matches skipped elements
    const found = skippedElements.find(regex => key.match(regex) !== null);
    if (found || value === null) {
      // console.log(`key=${key} value=${value}`);
      return;
    }
    if (typeof value === 'object' && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value))
        return;

      // console.log(`key=${key} value=${value}`);
      // Store value in our collection
      cache.push(value);
      // console.log(`key=${key} value=${value}`);
    }
    return value;
  });
  cache = null; // Enable garbage collection
  return newData;
};

// test('should remove duplicates & trim _debug keys', () => {
//   const data = filesystem.readFileSync('src/App.test.json');
//   const obj = circularStringify(JSON.parse(data), skippedElements);
//   console.log(obj);
// });

test('renders Paper Coin Exchange', () => {
  render(<App />);
  const linkElement = screen.getByText(/Paper Coin Exchange/i);
  expect(linkElement).toBeInTheDocument();
  const depositElements = screen.getAllByText(/Deposit/i);
  // console.log(depositElements.length);
  const data = circularStringify(depositElements[1], skippedElements);
  // console.log(data);
  // depositElements.forEach(el => {
  //   console.log(circularStringify(el), skippedElements);
  // })
});

// test('2', () => {
//   const wrapper = shallow(<App/>);
//   expect(wrapper.find('button').text()).toBe('Show Balance');
// })

// test('matches snapshot 1', () => {
//   const tree = renderer.create(<App/>).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('should buy coins', () => {
//   // render(<App/>);
//   // var buttonList = tree.root.findAllByType('button');
//   // var json = JSON.stringify(buttonList);
//   // //console.log(json);
//   // expect(1).toEqual(2);
//   // deposit $1000
//   // select BTC, buy $1000
// });
