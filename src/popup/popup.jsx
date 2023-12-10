import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Stack, Box, Button, Checkbox, TextareaAutosize } from '@mui/material';

// prompt is ony being sent for one of the requests

function Popup() {
	const [tabs, setTabs] = useState([]);
	const [selectedTabs, setSelectedTabs] = useState({});
	const [prompt, setPrompt] = useState('');

	useEffect(() => {
		// Fetch tabs when the popup is opened
		chrome.tabs.query({}, (fetchedTabs) => {
			setTabs(fetchedTabs);
		});
		// Reset selectedTabs
		setSelectedTabs({});
	}, []);

	const handleSelectAll = () => {
		const newSelectedTabs = {};
		tabs.forEach((tab) => {
			if (!tab.url.startsWith('chrome://')) {
				newSelectedTabs[tab.id] = true;
			}
		});
		setSelectedTabs(newSelectedTabs);
	};

	const handleTabChange = (tabId) => {
		setSelectedTabs({ ...selectedTabs, [tabId]: !selectedTabs[tabId] });
	};

	const handleSend = () => {
		const selectedTabIds = Object.keys(selectedTabs).filter(
			(tabId) => selectedTabs[tabId]
		);
		// Send message to background script
		chrome.runtime.sendMessage({
			action: 'processTabs',
			tabIds: selectedTabIds,
			prompt,
		});
	};

	return (
		<Box
			sx={{
				width: '400px',
				backgroundColor: 'white',
				color: '#37352f',
				padding: 0,
				margin: 0,
			}}
		>
			<div
				style={{
					display: 'flex',
					textAlign: 'left',
					justifyContent: 'left',
					alignItems: 'left',
					height: '100%',
				}}
			>
				<h3>Dixie</h3>
			</div>
			<Stack
				spacing={2}
				sx={{ p: 2, backgroundColor: '#EFEEF5' }}
			>
				{' '}
				{/* Adds padding and space between elements */}
				<Button
					variant='contained'
					onClick={handleSelectAll}
				>
					Select All
				</Button>
				{tabs.map((tab) => (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'start',
						}}
						key={tab.id}
					>
						<Checkbox
							checked={!!selectedTabs[tab.id]}
							onChange={() => handleTabChange(tab.id)}
						/>
						<Box sx={{ ml: 1 }}>
							{' '}
							{/* Adds margin to the left of the title */}
							{tab.title}
						</Box>
					</Box>
				))}
				<TextareaAutosize
					minRows={3}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					style={{ width: '100%' }} // Make textarea take full width
				/>
				<Button
					variant='contained'
					onClick={handleSend}
				>
					Send
				</Button>
			</Stack>
		</Box>
	);
}

const container = document.getElementById('react-target');
const root = createRoot(container);
root.render(<Popup />);
