import { computed, ref } from 'vue';

const currentTheme = ref<string | null>(null);

const themeTypes = {
  default: 'light-purple',
  darkPurple: 'dark-purple',
};

const lcThemeKey = 'currentTheme';

export default () => {
  const getCurrentTheme = computed<string | null>(() => currentTheme.value);

  const isExistTheme = (theme: string): boolean => {
    const allThemes = Object.values(themeTypes);
    return allThemes.some((iteratorTheme: string): boolean => iteratorTheme === theme);
  };

  const setTheme = (theme: string): void => {
    const allThemes = Object.values(themeTypes);
    const htmlElement: HTMLElement | null = document.querySelector('html');

    allThemes.forEach((iteratorTheme: string): void => {
      htmlElement?.classList.remove(iteratorTheme);
    });

    htmlElement?.classList.add(theme);
    localStorage.setItem(lcThemeKey, theme);
    currentTheme.value = theme;
  };

  const initTheme = (): void => {
    const selectedTheme: string | null = localStorage.getItem(lcThemeKey);

    if (selectedTheme && isExistTheme(selectedTheme)) {
      setTheme(selectedTheme);
    } else {
      setTheme(themeTypes.default);
    }
  };

  return {
    getCurrentTheme,
    themeTypes,
    initTheme,
    setTheme,
  };
};
