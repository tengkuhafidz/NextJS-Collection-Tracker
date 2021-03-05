const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
	publicRuntimeConfig: {
		StrapiBaseUrl: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
		MixpanelToken: process.env.MIXPANEL_TOKEN,
	},
	future: {webpack5: true},
})
