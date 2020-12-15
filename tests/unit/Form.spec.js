import axios from 'axios';
import { shallowMount } from '@vue/test-utils';
import Form from '@/components/Form.vue';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('Form.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Form, {
      propsData: {
        title: 'VueJS Indonesia !',
      },
    });
  });

  it('should renders props.title when passed', () => {
    expect(wrapper.find('.qa-test-title-section').text()).toMatch('VueJS Indonesia !');
  });

  it('should does not show error section by default', () => {
    expect(wrapper.find('.qa-test-error-section').exists()).toBe(false);
  });

  it('should show error section if submit button is clicked while condition is not met', async () => {
    await wrapper.find('.qa-test-submit').trigger('click');
    expect(wrapper.find('.qa-test-error-section').exists()).toBe(true);
  });

  it('should show error section if submit button is clicked while condition is not met (name empty)', async () => {
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-submit').trigger('click');
    expect(wrapper.find('.qa-test-error-section').exists()).toBe(true);
  });

  it('should show error section if submit button is clicked while condition is not met (age < 5)',
    async () => {
      await wrapper.find('.qa-test-input-name').setValue('Playstation 5');
      await wrapper.find('.qa-test-submit').trigger('click');
      expect(wrapper.find('.qa-test-error-section').exists()).toBe(true);
    });

  it('should add age successfully', async () => {
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    expect(wrapper.find('.qa-test-age-section').text()).toMatch('2');
  });

  it('should decrement age successfully', async () => {
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-decrement').trigger('click');
    expect(wrapper.find('.qa-test-age-section').text()).toMatch('1');
  });

  it('should cannot decrement age if age === 0', async () => {
    await wrapper.find('.qa-test-decrement').trigger('click');
    expect(wrapper.find('.qa-test-age-section').text()).toMatch('0');
  });

  it('should call API successfully', async () => {
    await wrapper.find('.qa-test-input-name').setValue('Playstation 5');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-increment').trigger('click');
    await wrapper.find('.qa-test-submit').trigger('click');
    expect(axios.post).toBeCalledWith('https://www.test.com/api/v3', {
      data: {
        name: 'Playstation 5',
        age: 5,
      },
    });
  });
});
