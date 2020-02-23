/// <reference types="jest"/>

import { shallowMount } from '@vue/test-utils';
import Component from '~/components/SartSubtitlePreview';
describe('SartMediaPlayer.vue', () => {
  let wrapper;
  const subtitles = [
    {
      start: '00:00:00.00',
      end: '00:02:00.00',
      text: 'We are We are'
    },
    {
      start: '00:02:00.00',
      end: '00:03:00.00',
      text: 'We are We are 2'
    }
  ];
  const currentTime = 1.0;
  const isCurrentSubtitleMock = jest.fn();
  const startMock = jest.fn();
  const createObserverMock = jest.fn();
  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: {
        subtitles,
        currentTime
      },
      stubs: {
        MaterialIcon: true
      },
      methods: {
        isCurrentSubtitle: isCurrentSubtitleMock,
        start: startMock,
        createObserver: createObserverMock
      }
    });
    // wrapper.vm.isCurrentSubtitle = isCurrentSubtitle;
  });
  it('should render text of a list of cues and match snapshot', () => {
    // wrapper.vm.isCurrentSubtitle = isCurrentSubtitle;
    // wrapper.vm.update();
    subtitles.forEach((s) => {
      expect(wrapper.text()).toContain(s.text);
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
