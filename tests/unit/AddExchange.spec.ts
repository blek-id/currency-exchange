import { shallowMount, Wrapper } from '@vue/test-utils';
import AddExchange from '@/components/AddExchange.vue';
import store from '@/store';
import { CombinedVueInstance } from 'vue/types/vue';
import Vue from 'vue';

let wrapper: Wrapper<Vue>;

describe('AddExchange.vue', () => {

  beforeEach(() => {
    wrapper = shallowMount(AddExchange, { store });
  });

  it('show options for adding new currencies when button is clicked', () => {

    const button = wrapper.find('input[value="Add More Currencies"]');
    button.trigger('click');

    expect(wrapper.contains('select'))
      .toBe(true);
  });

  it('show add more currencies button when submit is clicked', () => {

    wrapper.vm.$data.isAddingCurrency = true;

    const button = wrapper.find('input[value="Submit"]');
    button.trigger('click');

    expect(wrapper.contains('select'))
      .toBe(false);
  });
});
