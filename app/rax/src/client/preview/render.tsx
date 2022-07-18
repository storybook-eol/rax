import { createElement, render, Component } from 'rax';
import * as DriverDOM from 'driver-dom';
import dedent from 'ts-dedent';

import { document } from 'global';
import { RenderContext } from './types';

const rootElement = document ? document.getElementById('root') : null;

const renderDom = (node: any, el: Element, driver: any) =>
new Promise((resolve) => {
  render(node, el, driver, resolve);
});

class ErrorBoundary extends Component<{
  showException: (err: Error) => void;
  showMain: () => void;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidMount() {
    const { hasError } = this.state;
    const { showMain } = this.props;
    if (!hasError) {
      showMain();
    }
  }

  componentDidCatch(err: Error) {
    const { showException } = this.props;
    // message partially duplicates stack, strip it
    showException(err);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? null : children;
  }
}

export default async function renderMain({
  args,
  storyFn,
  showMain,
}: RenderContext) {
  showMain();

  // There is something miscellaneous here, for now, more precisely on L23,
  // as we are using the storyFn directly and not calling it, so `Element` is a
  // function but according to `createElement` types, there is no signature
  // taking a function as input.
  await renderDom(createElement(storyFn, args), rootElement, {
    driver: DriverDOM,
  });
}
