import '@testing-library/jest-dom'; // additional matchers for DOM testing

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
