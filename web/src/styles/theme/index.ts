import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: getComputedStyle(document.documentElement).getPropertyValue('--background-color-primary').trim(),
		},
		secondary: {
			main: '#d32f2f',
		},
	},
});

export default theme;
