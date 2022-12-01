import { config } from '@vue/test-utils';
import UIComponents from '@/components';

UIComponents.forEach((UIComponent) => {
  if (UIComponent.name) {
    config.global.components[UIComponent.name] = UIComponent;
  }
});
