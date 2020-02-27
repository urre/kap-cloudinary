'use strict';

const cloudinary = require('cloudinary');

const action = async context => {
	const filePath = await context.filePath();

	context.setProgress('Uploading…');

	cloudinary.config({
		cloud_name: context.config.get('cloud_name'),
		api_key: context.config.get('api_key'),
		api_secret: context.config.get('api_secret')
	});

	const upload = cloudinary.uploader.upload(`${filePath}`);

	const response = await upload;

	context.copyToClipboard(response.secure_url);
	context.notify('Cloudinary URL copied to the clipboard');
};

const cloudin = {
	title: 'Share to Cloudinary',
	formats: ['gif'],
	action,
	config: {
		cloud_name: {
			title: 'Cloud Name',
			type: 'string',
			required: true
		},
		api_key: {
			title: 'API Key',
			type: 'string',
			required: true
		},
		api_secret: {
			title: 'API Secret',
			type: 'string',
			required: true
		}
	}
};

exports.shareServices = [cloudin];
