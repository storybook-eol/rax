import { createElement } from 'rax';
import Text from 'rax-text';
import View from 'rax-view';


export default {
  title: 'Addon/addon-a11y',
  component: Text,
  argTypes: {
    propertyA: {
      options: ['Item One', 'Item Two', 'Item Three'],
      control: { type: 'select' } // Automatically inferred when 'options' is defined
    },
    propertyB: {
      options: ['Another Item One', 'Another Item Two', 'Another Item Three'],
    },
  },
};

export const Basic = () => <Text>RAX TEXT NODE</Text>;

export const WithStyle = () => <Text style={{ fontSize: 20, color: 'blue' }}>Styled text</Text>;

WithStyle.storyName = 'with style';

export const WithMarkdown = (props) => {
  console.log('props111:', props);
  return (
    <button type={props.type}>
      &nbsp;
      <Text id="text1">😀 😎 👍 💯</Text>
      <View>
        <Text id="text1">{props.text}</Text>
      </View>
      &nbsp;
    </button>
  )
};

WithMarkdown.storyName = 'with markdown';
WithMarkdown.args = {
  type: 'button',
  text: 'bbb'
}
