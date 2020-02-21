/// <reference types="jest"/>

import { shallowMount } from '@vue/test-utils';
import Component from '~/components/SartMediaPlayer';
describe('SartMediaPlayer.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: {
        landscape: true
      },
      stubs: {
        MaterialIcon: true
      }
    });
  });

  it('should ask user to load video of media uri is not provided and match snapshot', () => {
    // expect to see text
    expect(wrapper.text()).toContain('Please Load Video');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
