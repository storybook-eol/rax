/* eslint-disable prefer-destructuring */
import React, { createElement } from 'rax';
import { start } from '@storybook/core/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ClientStoryApi, Loadable } from '@storybook/addons';
import { IStorybookSection, StoryFnReactReturnType } from './types';
import { Story } from './types-6-3';
import './globals';
import render from './render';

const framework = 'rax';

// @ts-ignore
const globalRender: Story = (args, { parameters }) => {
  const Component = parameters.component;
  return <Component {...args} />;
};

interface ClientApi extends ClientStoryApi<StoryFnReactReturnType> {
  setAddon(addon: any): void;
  configure(loader: Loadable, module: NodeModule): void;
  getStorybook(): IStorybookSection[];
  clearDecorators(): void;
  forceReRender(): void;
  raw: () => any; // todo add type
}

const api = start(render);

// @ts-ignore
api.clientApi.globalRender = globalRender;

export const storiesOf: ClientApi['storiesOf'] = (kind, m) => {
  return (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi['storiesOf']>).addParameters({
    framework,
  });
};

export const configure: ClientApi['configure'] = (...args) => api.configure(framework, ...args);
export const addDecorator: ClientApi['addDecorator'] = api.clientApi
  .addDecorator as ClientApi['addDecorator'];
export type DecoratorFn = Parameters<typeof addDecorator>[0];
export const addParameters: ClientApi['addParameters'] = api.clientApi
  .addParameters as ClientApi['addParameters'];
export const clearDecorators: ClientApi['clearDecorators'] = api.clientApi.clearDecorators;
export const setAddon: ClientApi['setAddon'] = api.clientApi.setAddon;
export const forceReRender: ClientApi['forceReRender'] = api.forceReRender;
export const getStorybook: ClientApi['getStorybook'] = api.clientApi.getStorybook;
export const raw: ClientApi['raw'] = api.clientApi.raw;

// const { configure: coreConfigure, clientApi, forceReRender } = start(render);

// export const {
//   setAddon,
//   addDecorator,
//   addParameters,
//   clearDecorators,
//   getStorybook,
//   raw,
// } = clientApi;

// export const storiesOf = (kind: string, m: any) =>
//   clientApi.storiesOf(kind, m).addParameters({ framework });
// export const configure = (loadable: any, m: any) => coreConfigure(framework, loadable, m);

// export { forceReRender };
