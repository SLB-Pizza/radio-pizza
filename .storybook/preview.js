import { action } from "@storybook/addon-actions";
import { addParameters, addDecorator } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { withA11y } from "@storybook/addon-a11y";

/**
 * Gatsby's Link overrides:
 * Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
 *
 * This global object isn't set in storybook context, requiring you to override it to empty functions (no-op), so Gatsby Link doesn't throw any errors.
 */

global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

/**
 * Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
 *
 * In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.
 */

window.___navigate = (pathname) => {
  action("NavigateTo:")(pathname);
};

/**
 * Set up the docs parameter for Storybook Docs. This includes the DocsPage for rendering the page, a container, and various configuration options, such as extractComponentDescription for manually extracting a component description:
 */
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

addDecorator(withA11y);
