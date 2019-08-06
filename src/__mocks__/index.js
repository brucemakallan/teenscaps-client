export const sectionInput = {
  heading1: 'test1',
  body: 'test',
  dateIn: '124231221',
  category: 'test',
  pinned: false,
  images: [
    'https://iviidev.info/downloads/images/sample.jpg',
  ],
  files: [
    {
      title: 'sample file',
      url: 'https://iviidev.info/downloads/files/sample.pdf',
    },
  ],
  array: [],
};

export const section = {
  ...sectionInput,
  _id: '5c9fdcf69c5e1a0d891d506e',
  dateCreated: '1553980662739',
  __v: 0,
};

export const mockState = {
  loaderReducer: { showLoader: false },
  adminReducer: { admin: {} },
  sectionsReducer: {
    sections: [section],
    section,
  },
};

export default section;
