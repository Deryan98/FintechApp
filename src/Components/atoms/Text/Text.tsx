import {FC, PropsWithChildren} from 'react';
import {Text} from 'react-native';

interface ParagraphProps extends PropsWithChildren {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
}

export const P: FC<ParagraphProps> = ({
  children,
  fontSize,
  color = 'white',
  fontWeight = 'normal',
}) => {
  console.log({fontSize, color, fontWeight});
  return <Text className={`text-white font-normal`}>{children}</Text>;
};
