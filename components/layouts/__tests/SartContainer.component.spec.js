/// <reference types="jest"/>

import { shallowMount } from '@vue/test-utils';
import Component from '../SartContainer.vue';
describe('SartContainer.vue', () => {
  let wrapper;
  const text = 'This is an Container wrapper';
  beforeEach(() => {
    wrapper = shallowMount(Component, {
      scopedSlots: {
        default(props) {
          return this.$createElement('div', [text]);
        }
      }
    });
  });

  it('should render any content between its tags and matchsnaphot', () => {
    // if we put a div tag and text expect them to be rendered
    expect(wrapper.find('div').text()).toBe(text);
    // and to always render the same
    expect(wrapper.html()).toMatchSnapshot();
  });
});
