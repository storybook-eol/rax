import { createElement } from 'rax';
import { withKnobs } from '@storybook/addon-knobs';

import Text from 'rax-text';
import View from 'rax-view';

export default {
  title: 'Rax/x-for',
  decorators: [withKnobs],
};

export const WithAButton = () => {

  const list = [
    {
      name: 'test-1',
      desc: 'desc-1'
    },
    {
      name: 'test-2',
      desc: 'desc-2'
    },
  ]

  return (
    <View>
      {/* @ts-ignore */}
      <Text x-for={(item, index) in list} key={index}>{item.name}-{item.desc}</Text>
    </View>
  );
};

WithAButton.storyName = 'with a button';