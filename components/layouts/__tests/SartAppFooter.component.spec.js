/// <reference types="jest"/>

import { shallowMount } from '@vue/test-utils';
import Component from '../SartAppFooter.vue';
describe('SartAppFooter.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Component);
  });

  it('should contain the app title="Sub Artist" and to match snaphot', () => {
    // expect the app title
    expect(wrapper.text()).toContain('Sub Artist');
    // and to always render the same
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should contain the current year', () => {
    expect(wrapper.text()).toContain(new Date().getFullYear());
  });
});
