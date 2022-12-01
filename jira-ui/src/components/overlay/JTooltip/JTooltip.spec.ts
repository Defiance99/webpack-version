// import { mount, VueWrapper } from '@vue/test-utils';
// import JTooltip from './index';

// describe('JTooltip.vue', () => {
//   let wrapper: VueWrapper | null = null;
//   const emitUpdateName = 'update:modelValue';
//   const eventOptions = { clientX: 0, clientY: -50 };
//   const activatorSlotComponent = {
//     template: '<div>I am slot!</div>',
//   };
//   const tooltipSlotComponent = {
//     template: '<div>I am tooltip!</div>',
//   };

//   beforeEach(() => {
//     wrapper = mount(JTooltip, {
//       global: {
//         stubs: {
//           teleport: true,
//         },
//       },
//       slots: {
//         default: activatorSlotComponent,
//         tooltip: tooltipSlotComponent,
//       },
//       props: {
//         position: 'bottom',
//         openOnHover: true,
//       },
//     });
//   });

//   test('renders correctly', () => {
//     if (wrapper === null) return;
//     expect(wrapper.element).toMatchSnapshot();
//   });

//   test('emits an event by mouse events', async () => {
//     if (wrapper === null) return;

//     await wrapper.setProps({ openOnHover: false });
//     await wrapper.get('.j-tooltip-wrapper').trigger('click');
//     expect(wrapper.emitted()).toHaveProperty(emitUpdateName);
//     const modelValue = wrapper.emitted(emitUpdateName);

//     expect(modelValue?.[0]).toEqual([true]);

//     await wrapper.get('.j-tooltip-wrapper').trigger('mouseleave', eventOptions);
//     expect(modelValue?.[1]).toEqual([false]);

//     await wrapper.setProps({ openOnHover: true });
//     await wrapper.get('.j-tooltip-wrapper').trigger('mouseenter');
//     expect(modelValue?.[2]).toEqual([true]);

//     await wrapper.get('.j-tooltip-wrapper').trigger('mouseleave', eventOptions);
//     expect(modelValue?.[3]).toEqual([false]);
//   });

//   test('emits an event when mouseleaved from overlay tooltip', async () => {
//     if (wrapper === null) return;

//     await wrapper.get('.j-tooltip-wrapper').trigger('mouseenter');
//     const modelValue = wrapper.emitted(emitUpdateName);

//     expect(modelValue?.[0]).toEqual([true]);

//     await wrapper.get('.j-tooltip-overlay').trigger('mouseleave', eventOptions);
//     expect(modelValue?.[1]).toEqual([false]);
//   });

//   test('it must be contain default slot', () => {
//     if (wrapper === null) return;

//     expect(wrapper.html()).toContain(activatorSlotComponent.template);
//   });

//   test('it must be show tooltip on hover', async () => {
//     if (wrapper === null) return;

//     await wrapper.get('.j-tooltip-wrapper').trigger('mouseenter');
//     expect(wrapper.html()).toContain(tooltipSlotComponent.template);
//   });

//   test('it must be show tooltip on click', async () => {
//     if (wrapper === null) return;

//     await wrapper.setProps({ openOnHover: false });
//     await wrapper.get('.j-tooltip-wrapper').trigger('click');
//     expect(wrapper.html()).toContain(tooltipSlotComponent.template);
//   });

//   test('it must be hidden tooltip on mouseleave', async () => {
//     if (wrapper === null) return;

//     await wrapper.get('.j-tooltip-wrapper').trigger('mouseenter');
//     await wrapper.get('.j-tooltip-wrapper').trigger('mouseleave', eventOptions);
//     expect(wrapper.html()).not.toContain(tooltipSlotComponent.template);

//     await wrapper.setProps({ openOnHover: false });
//     await wrapper.get('.j-tooltip-wrapper').trigger('click');
//     await wrapper.get('.j-tooltip-wrapper').trigger('mouseleave', eventOptions);
//     expect(wrapper.html()).not.toContain(tooltipSlotComponent.template);
//   });
// });
