module.exports = [
	"strapi::errors",
	{
		name: "strapi::security",
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					"connect-src": ["'self'", "https:"],
					"img-src": ["'self'", "data:", "blob:", "storage.googleapis.com"],
					"media-src": ["'self'", "data:", "blob:", "storage.googleapis.com"],
					upgradeInsecureRequests: null,
				},
			},
		},
	},
	{
		name: "strapi::body",
		config: {
			formLimit: "512mb", // modify form body
			jsonLimit: "512mb", // modify JSON body
			textLimit: "512mb", // modify text body
			formidable: {
				maxFileSize: 500 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
			},
		},
	},
	"strapi::cors",
	"strapi::poweredBy",
	"strapi::logger",
	"strapi::query",
	"strapi::favicon",
	"strapi::public",
];
