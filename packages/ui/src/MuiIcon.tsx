import * as MuiIcons from '@mui/icons-material';

export const MuiIcon = (props: { name: keyof typeof MuiIcons }) => {
  const Icon = MuiIcons[props.name];
  return <Icon />;
}

