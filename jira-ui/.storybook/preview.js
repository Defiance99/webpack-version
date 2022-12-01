import { app } from "@storybook/vue3";
import Ripple from '@/directives/ripple';
import ClickOutside from '@/directives/clickOutside';
import useTheme from '@/composables/utils/useTheme';

const { themeTypes, setTheme } = useTheme();

app.directive("ripple", Ripple);
app.directive("closable", ClickOutside);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Theme for the components',
    defaultValue: 'default',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'default', icon: 'circlehollow', title: 'Light Purple' },
        { value: 'darkPurple', icon: 'circle', title: 'Dark purple' },
      ],
      showName: true,
    },
  },
}

export const decorators = [(ctx, params) => {
  setTheme(themeTypes[params.globals.theme]);
  return {
    template: "<story />",
  }
}]
