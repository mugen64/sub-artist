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
  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: {
        subtitles
      },
      stubs: {
        MaterialIcon: true
      }
    });
  });
  it('should render text of a list of cues and match snapshot', () => {
    subtitles.forEach((s) => {
      expect(wrapper.text()).toContain(s.text);
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
