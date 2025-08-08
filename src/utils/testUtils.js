import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import PropTypes from 'prop-types';

/**
 * Enhanced router rendering with better options
 * @param {React.Component} component - Component to render
 * @param {Object} options - Render options
 * @returns {Object} Render result with history
 */
export const renderWithRouter = (component, options = {}) => {
  const {
    initialEntries = ['/'],
    initialIndex = 0,
    ...renderOptions
  } = options;

  const history = createMemoryHistory({ initialEntries, initialIndex });

  const result = render(
    <Router history={history}>{component}</Router>,
    renderOptions
  );

  return {
    ...result,
    history,
    // Helper to navigate in tests
    navigate: path => history.push(path),
  };
};

/**
 * Enhanced viewport testing helper
 * @param {Object} viewport - Viewport dimensions
 * @param {Function} testFn - Test function to run
 */
export const withViewport = (viewport, testFn) => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: viewport.width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: viewport.height,
    });

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });

  return testFn;
};

/**
 * Test data factory helpers
 */
export const createTestProps = (defaults, overrides = {}) => ({
  ...defaults,
  ...overrides,
});

/**
 * Mock component helper for isolation testing
 */
export const createMockComponent = (name, testId) => {
  function MockComponent(props) {
    return (
      <div data-testid={testId || `mock-${name.toLowerCase()}`}>
        Mock {name}
        {props.children}
      </div>
    );
  }

  MockComponent.propTypes = {
    children: PropTypes.node,
  };

  return MockComponent;
};
