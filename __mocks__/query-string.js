module.exports = {
  parse: jest.fn((str) => ({})),
  stringify: jest.fn((obj) => ''),
  parseUrl: jest.fn((url) => ({ url: '', query: {} })),
  stringifyUrl: jest.fn((obj) => ''),
  extract: jest.fn((str) => ''),
  exclude: jest.fn((obj, keys) => ({})),
  pick: jest.fn((obj, keys) => ({})),
}
