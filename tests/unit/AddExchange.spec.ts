import { shallowMount, Wrapper } from '@vue/test-utils';
import AddExchange from '@/components/AddExchange.vue';
import store from "@/store";
import router from "@/router";
import { CombinedVueInstance } from 'vue/types/vue';

let wrapper: Wrapper<CombinedVueInstance<AddExchange, object, object, object, Record<never, any>>>;

describe('AddExchange.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(AddExchange, { store, router });
  })

  it('should show select element for adding new currencies when button is clicked', () => {
    const spy = jest.fn();
    wrapper.setProps({
      toggleAddCurrency: spy
    })
    const button = wrapper.find("input[type='button']");
    button.trigger('click');
    expect(wrapper.contains("select")).toBe(true);
  })
});
