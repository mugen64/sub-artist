/// <reference types="jest"/>

import { shallowMount } from '@vue/test-utils';
import Component from '~/components/SartResponsiveLogo';
describe('SartResponsiveLogo.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: {
        landscape: true
      }
    });
  });

  it('should render a logo', () => {
    expect(wrapper).toBeTruthy();
  });
});
