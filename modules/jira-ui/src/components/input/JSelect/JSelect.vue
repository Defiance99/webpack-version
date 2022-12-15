<script lang="ts">
/* eslint-disable arrow-body-style */
import {
  defineComponent, watch, ref, VNode, h, mergeProps,
} from 'vue';
import { getAllSlotChildren } from '@/composables/utils/useParseNodes';
import JMenu from '@/components/overlay/JMenu';
import JList from '@/components/list/JList';
import JListItem from '@/components/list/JListItem';
import JTextField from '@/components/input/JTextField';
import JChip from '@/components/chip/JChip';
import JArrowIcon from '@/components/icon/JArrowIcon';

const updateEmitName = 'update:modelValue';

export default defineComponent({
  name: 'JSelect',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    attach: {
      type: [String, Boolean],
      default: null,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    input: {
      type: Object,
      default: () => ({}),
    },
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [updateEmitName],
  setup(props, { emit, slots }) {
    const menuModel = ref<boolean>(false);
    const selectedValues = ref<any[]>([]);
    const defaultSlotItems: VNode[] = getAllSlotChildren(slots.default?.() as VNode[]);
    const resultSlotItems = ref<VNode[]>([]);

    const isActiveItem = (optionItem: any): boolean => {
      return selectedValues.value.some((activeItem) => activeItem === optionItem);
    };

    const setMenuModel = (value: boolean): void => {
      menuModel.value = value;
    };

    const processSelectItemClick = (slotItem: VNode) => {
      if (props.multiple) {
        const selectedValueIndex = selectedValues.value.findIndex((activeValue: any) => activeValue === slotItem.props?.value);

        if (selectedValueIndex > -1) {
          selectedValues.value.splice(selectedValueIndex, 1);
        } else {
          selectedValues.value.push(slotItem.props?.value);
        }
      } else if (selectedValues.value === slotItem.props?.value) {
        selectedValues.value = [];
      } else {
        selectedValues.value = [slotItem.props?.value];
      }

      emit(updateEmitName, selectedValues.value);
    };

    const resetSelectedItems = () => {
      selectedValues.value = [];
    };

    const createSelectedLabel = (isChipLabel: boolean): VNode[] => {
      return selectedValues.value.map((selectedValue, index) => h(
        isChipLabel ? JChip : 'div',
        { class: 'j-select-chip', key: index },
        isChipLabel ? () => selectedValue : selectedValue,
      ));
    };

    const createMenuActivator = (slotProps: any): VNode => h(
      JTextField,
      {
        showInput: false,
        ...slotProps,
        ...props.input,
        'onUpdate:resetValue': resetSelectedItems,
        outlined: true,
        closeIcon: false,
      },
      {
        label: () => (resultSlotItems.value.length ? resultSlotItems.value : createSelectedLabel(props.chips)),
        append: () => h(JArrowIcon, { active: menuModel.value }),
      },
    );

    const createMenuList = (): VNode => h(
      JList,
      null,
      () => defaultSlotItems?.map((slotItem, index) => h(
        JListItem,
        {
          onClick: () => processSelectItemClick(slotItem),
          'aria-selected': isActiveItem(slotItem.props?.value),
          role: 'option',
          ...props.list,
          active: isActiveItem(slotItem.props?.value),
          key: index,
        },
        () => h(slotItem, { active: isActiveItem(slotItem.props?.value) }),
      )),
    );

    watch(
      () => props.modelValue,
      (newActiveItems: any[]): void => {
        selectedValues.value = newActiveItems;
      },
      { immediate: true },
    );

    watch(() => slots.result?.(), () => {
      resultSlotItems.value = getAllSlotChildren(slots.result?.() as VNode[]);
    });

    return () => h(
      JMenu,
      {
        closeOnClick: !props.multiple,
        attach: props.attach,
        'onUpdate:modelValue': (value: boolean): void => setMenuModel(value),
      },
      { activator: (slotProps: any) => createMenuActivator(slotProps), default: () => createMenuList() },
    );
  },
});
</script>

<style lang="scss" scoped>
.j-select-chip {
  margin: 2px 4px 2px 0;
}
</style>
