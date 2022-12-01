import { VNode } from 'vue';

export function parseNodes(slotItems: any, parseNodeName: string): VNode[] {
  const nodes: VNode[] = [];

  for (let i = 0; i < slotItems.length; i += 1) {
    const vnode = slotItems[i];

    if (vnode.type.name === parseNodeName) {
      nodes.push(vnode);
    }
  }

  return nodes;
}

export function getAllSlotChildren(slot: VNode[]): VNode[] {
  const allChildrens = slot.map((slotItem: VNode) => slotItem.children);

  return allChildrens.flat() as VNode[];
}
