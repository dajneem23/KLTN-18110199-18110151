module.exports = {
	parser: {
		enabled: true,
		multipart: true,
		formidable: {
			maxFileSize: 512 * 1024 * 1024, // Defaults to 200mb
		},
		jsonLimit: "512mb",
		formLimit: "512mb",
	},
	cors: {
		enabled: true,
		origin: "*",
		headers: "*",
		expose: "*",
		maxAge: 31536000,
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
	},
};
