/// <reference types="jest"/>

import { shallowMount } from '@vue/test-utils';
import Component from '../SartAppbar.vue';
describe('SartAppbar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Component, {
      stubs: {
        SartResponsiveLogo: true,
        NuxtLink: {
          template: '<a />'
        }
      }
    });
  });

  it('should contain the app title="Sub Artist" and to match snaphot', () => {
    // expect to see the app title
    // console.log(wrapper.html());
    expect(wrapper.find('a').text()).toContain('Sub Artist');
    // and to always render the same
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should contain the app logo', () => {
    // expect to see the app title
    expect(wrapper.html()).toContain('sartresponsivelogo');
  });

  it('should contain navigation links to docs, issues and github', () => {
    // expect to find 3 links
    const links = wrapper.findAll('nav a');
    // docs issues github
    const linksText = ['docs', 'issues', 'github'];
    expect(links.length).toBe(linksText.length);
    links.wrappers.forEach((w) => {
      expect(linksText).toContainEqual(w.text().toLocaleLowerCase());
    });
  });
});
