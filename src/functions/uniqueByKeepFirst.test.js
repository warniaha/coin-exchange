import { uniqueByKeepFirst } from './uniqueByKeepFirst';

const list = [
    {key: 1, data: "one"},
    {key: 2, data: "two"},
    {key: 4, data: "four"},
    {key: 5, data: "five"},
    {key: 5, data: "another-five"},
    {key: 2, data: "another-two"},
    {key: 4, data: "another-four"},
];
const uniqueList = uniqueByKeepFirst(list, id => id.key);
const oneElement = uniqueList.find(id => id.key === 1);
const twoElement = uniqueList.find(id => id.key === 2);
const fourElement = uniqueList.find(id => id.key === 4);
const fiveElement = uniqueList.find(id => id.key === 5);

it('should validate duplicates are removed', () => {
    expect(uniqueList.length).toEqual(4);   // 1, 2, 4, 5
});

it('should find key 1', () => {
    expect(oneElement).not.toBeNull();
    expect(oneElement.key).toEqual(1);
});

it('should find key 2', () => {
    expect(twoElement).not.toBeNull();
    expect(twoElement.key).toEqual(2);
});

it('should find key 4', () => {
    expect(fourElement).not.toBeNull();
    expect(fourElement.key).toEqual(4);
});

it('should find key 5', () => {
    expect(fiveElement).not.toBeNull();
    expect(fiveElement.key).toEqual(5);
});

it('should find the first of key: 2', () => {
    expect(twoElement.data).toEqual("two"); // first one encountered
});

it('should find the first of key: 4', () => {
    expect(fourElement.data).toEqual("four"); // first one encountered
});

it('should find the first of key: 5', () => {
    expect(fiveElement.data).toEqual("five"); // first one encountered
});
