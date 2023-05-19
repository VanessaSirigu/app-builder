import React from 'react';
import { DDProvider } from '@entando/ddtable';
import { Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/dom';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockHistory } from 'test/legacyTestUtils';

import WidgetGroupings from 'ui/pages/config/WidgetGroupings';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const CONTENT_WIDGET = {
  code: 'content_widget',
  used: 2,
  titles: {
    it: 'Contenuto',
    en: 'Content Widget',
  },
  widgetCategory: 'cms',
  typology: 'User Widget',
  group: 'free',
  configUi: null,
  hasConfig: false,
};

const DUMMY_WIDGET = {
  code: 'dummy_widget',
  used: 2,
  titles: {
    it: 'Widget Dummy',
    en: 'Dummy Widget',
  },
  widgetCategory: 'other',
  typology: 'User Widget',
  group: 'free',
  configUi: null,
  hasConfig: false,
};

const GROUPED_WIDGETS = {
  cms: [CONTENT_WIDGET],
  other: [DUMMY_WIDGET],
};

const WIDGET_GROUPING_LIST = ['cms', 'other'];

window.MutationObserver = function mock() { return { observe: jest.fn() }; };

function render(ui, { locale = 'en', ...renderOptions } = {}) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      <Router history={createMockHistory()}>
        <DDProvider>
          <IntlProvider locale={locale}>
            {children}
          </IntlProvider>
        </DDProvider>
      </Router>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('WidgetGroupings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSelector.mockImplementation(callback => callback({
      widgets: {
        map: {
          test: {},
        },
      },
      currentTenant: {
        currentTenant: {},
      },
    }));
  });

  it('has the root class', () => {
    const clearFilter = jest.fn();
    const { container } = render(<WidgetGroupings clearFilter={clearFilter} />);
    expect(container.firstChild.classList.contains('WidgetGroupings')).toBe(true);
  });

  it('has filterable data', async () => {
    const filterWidget = jest.fn();
    const clearFilter = jest.fn();
    render(<WidgetGroupings
      filterWidget={filterWidget}
      clearFilter={clearFilter}
      groupedWidgets={GROUPED_WIDGETS}
      widgetGroupingList={WIDGET_GROUPING_LIST}
    />);
    expect(screen.getByText(/cms/i)).toBeInTheDocument();
    expect(screen.getByText(/other/i)).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Search/i);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'dumm');

    expect(filterWidget).toHaveBeenCalled();
    expect(filterWidget).toHaveBeenCalledWith('dumm');
  });
});
