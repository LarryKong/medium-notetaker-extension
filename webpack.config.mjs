import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
	entry: {
		popup: './src/popup/popup.jsx',
		background: './src/background/background.js',
		extractText: './src/scripts/extractText.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/popup/popup.html',
			filename: 'popup.html',
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'public' },
				{ from: 'src/assets', to: 'assets' },
			],
		}),
	],
};

export default config;
