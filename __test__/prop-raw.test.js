import {mount, createLocalVue} from '@vue/test-utils'

import Component from '../src/component.js';

describe('Cleave raw prop', () => {

  let localVue = createLocalVue();
  let app = {
    template: `<div id="app">
                  <cleave :options="options" :raw="raw" v-model="model"></cleave>
                 </div>`,
    data() {
      return {
        model: '12122012',
        raw: true,
        options: {
          date: true,
        }
      }
    },
    components: {
      cleave: Component
    }
  };

  let wrapper = null;


  beforeEach(() => {
    wrapper = mount(app, {
      localVue
    })
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  test('emits raw by default', async () => {
    wrapper.setData({
      model: '10102010'
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.model).toBe('10102010')
  });

  test('does not emits raw when set to false', async () => {
    wrapper.setData({
      raw: false,
      model: '11/11/2011'
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.model).toBe('11/11/2011')
  });


});
