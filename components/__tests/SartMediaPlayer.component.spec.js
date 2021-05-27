/// <reference types="jest"/>

import { shallowMount } from '@vue/test-utils';
import Component from '../SartMediaPlayer';
describe('SartMediaPlayer.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Component, {
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
  it('should load video file into html video element', () => {
    wrapper = shallowMount(Component, {
      propsData: {
        mediaUri: 'vid.mp4',
        mediaFile: {
          kind: 'video'
        }
      },
      stubs: {
        MaterialIcon: true
      }
    });
    const player = wrapper.find('video');
    expect(player.exists()).toBeTruthy();
    expect(player.attributes('src')).toBe('vid.mp4');
  });

  it('should load audio file into html audio element', () => {
    wrapper = shallowMount(Component, {
      propsData: {
        mediaUri: 'vid.mp3',
        mediaFile: {
          kind: 'audio'
        }
      },
      stubs: {
        MaterialIcon: true
      }
    });

    const player = wrapper.find('audio');
    expect(player.exists()).toBeTruthy();
    expect(player.attributes('src')).toBe('vid.mp3');
  });

});
