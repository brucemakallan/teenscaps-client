import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '.';
import { section, sectionInput } from '../../__mocks__';
import { messages } from '../../common';
import getAllSections, { postSection, editSection, deleteSection } from './websiteSections';

describe('Actions', () => {
  let mockUrl;
  let store;
  let error;

  beforeEach(() => {
    moxios.install();
    mockUrl = 'https://api.com/entities';
    const createMockStore = configureMockStore([thunk]);
    const initialState = {};
    store = createMockStore(initialState);
    error = { response: { data: { message: 'sample error' } } };
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should return a list sections', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [section],
      });
    });
    store.dispatch(getAllSections(mockUrl)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.SHOW_PAGE_LOADER, payload: true },
        { type: types.GET_ALL_SECTIONS, payload: [section] },
        { type: types.SHOW_PAGE_LOADER, payload: false },
      ]);
    });
  });
  it('should handle exceptions when fetching sections', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error.response.data,
      });
    });
    store.dispatch(getAllSections(mockUrl)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.SHOW_PAGE_LOADER, payload: true },
        { type: types.SHOW_PAGE_LOADER, payload: false },
        { type: types.ERROR, payload: error.response.data.message },
      ]);
    });
  });

  it('should post a section', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: section,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    const createAnother = false;
    store.dispatch(postSection(mockUrl, sectionInput, history, createAnother))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.SHOW_PAGE_LOADER, payload: true },
          { type: types.POST_NEW_SECTION, payload: section },
          { type: types.SUCCESS, payload: messages.SUCCESS },
          { type: types.SHOW_PAGE_LOADER, payload: false },
        ]);
      });
  });
  it('should post a section with the "Create Another" option', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: section,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    const createAnother = true;
    store.dispatch(postSection(mockUrl, sectionInput, history, createAnother))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.SHOW_PAGE_LOADER, payload: true },
          { type: types.POST_NEW_SECTION, payload: section },
          { type: types.SUCCESS, payload: messages.SUCCESS },
          { type: types.SHOW_PAGE_LOADER, payload: false },
        ]);
      });
  });
  it('should handle exceptions when posting a section', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error.response.data,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    const createAnother = false;
    store.dispatch(postSection(mockUrl, sectionInput, history, createAnother))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.SHOW_PAGE_LOADER, payload: true },
          { type: types.SHOW_PAGE_LOADER, payload: false },
          { type: types.ERROR, payload: error.response.data.message },
        ]);
      });
  });

  it('should edit a section', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: section,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    store.dispatch(editSection(mockUrl, sectionInput, history)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.SHOW_PAGE_LOADER, payload: true },
        { type: types.POST_NEW_SECTION, payload: section },
        { type: types.SUCCESS, payload: messages.SUCCESS },
        { type: types.SHOW_PAGE_LOADER, payload: false },
      ]);
    });
  });
  it('should handle exceptions when editing a section', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error.response.data,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    store.dispatch(editSection(mockUrl, sectionInput, history))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.SHOW_PAGE_LOADER, payload: true },
          { type: types.SHOW_PAGE_LOADER, payload: false },
          { type: types.ERROR, payload: error.response.data.message },
        ]);
      });
  });

  it('should delete a section', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: section,
      });
    });
    store.dispatch(deleteSection(mockUrl)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.DELETE_SECTION, payload: section },
      ]);
    });
  });
  it('should handle exceptions when deleting a section', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.response.data,
      });
    });
    store.dispatch(deleteSection(mockUrl)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.ERROR, payload: error.response.data.message },
      ]);
    });
  });
});
