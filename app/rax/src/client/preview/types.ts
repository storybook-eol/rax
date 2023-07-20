import { RaxElement } from 'rax';

// eslint-disable-next-line import/no-extraneous-dependencies
export type { RenderContext } from '@storybook/client-api';
export type { StoryContext } from '@storybook/addons';

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export type StoryFnReactReturnType = RaxElement<unknown>;

export interface IStorybookStory {
  name: string;
  render: () => any;
}

export interface IStorybookSection {
  kind: string;
  stories: IStorybookStory[];
}
