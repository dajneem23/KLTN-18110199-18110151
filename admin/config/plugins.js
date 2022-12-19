module.exports = ({ env }) => ({
	upload: {
		provider: "google-cloud-storage",
		providerOptions: {
			bucketName: "kltn-18110199-18110151",
			publicFiles: false,
			uniform: false,
			sizeLimit: 1000000000,
			serviceAccount: {
				type: "service_account",
				project_id: "zinc-union-365709",
				private_key_id: "1e0f101db822d27f52ba6f7b9333f70951b05150",
				private_key:
					"-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC4vJ+v+ewJtR0O\nsbb6d9x45ZOMxz8BceqcTIzS/YZiCEoYvDQI5MZbTRm0el33/avwjkr2z1QDA9Iq\n9qSfg/9qbe3a1ELDNGpfeWc9CIR70fIo4xsddeEAoWEEgl7v7ggBTSAzc0blIdcX\nuERUzii6aNFq/ZPXa4kYVBhGrPgvk55lW51v48lzEv3iGrhV63+tWV3jMqW4+Iog\nq6m2IYASlzQN+/9i5SHorgNKY+tMsA1bA7MP7qt9GSz+KzZJsk94I7/2jrjSbgPo\n2GT7rm4PfziA0n9rdGi/c4OqV8meboLXm27RZyZWn93mD5KuvN9mY5baM/E/vCRg\nLLrIlRD5AgMBAAECggEAFVcu4EqP9pgeRPQJJfqCNNIafy0GLYHOHyOlsfr5EuqP\nurdFEJDzDBmGQmfPYqZCfk3Fwai2NQn0NaPb5RR/xTjxPPH/y2KK9kAFSdLp0Q7x\n+UCxAXB8X1EFLtrroi5ebN4OvfrPYglMenA+LojJQi15IbGs6joBMpcGXeW93urt\nmdnVueo7igloUDrz6ZqDYY6UtuHImwpa0g/FQq3xI9VjcIBYwZsod2pCndoTx17N\npRdI/eMcYAnNiJhfDu7xnZXLcP3THTpLyZ7leGSaIbPl5s6+TMcRKxtg6jWYxnk8\n+adCakQPacsxJBp0jAWOcGOHvc5djR+/lOjDq5kGHQKBgQDjkGXE7sybHcEGKd6E\nA+SmnD8Q+WGV4+WL2nu5SAHHZQT36IzUIZ4eNPDz//DeKpMi/d81cqVfr2gLa2dW\ngWls81JfsbJjwIvW5J+RHWG2fmpWSG1BIG/7zQcH81yDXe0QcSZrVnY3U+tEfhiD\nMiPHU2udz39r6eHp0R7Gu2drnQKBgQDP0jcQArGjVreCPnPF/8ryQZGFSqTka69F\nXyXK3TbQctoFpCb98gLRIVk4xvkAn6vbT8NMBz14GGG9tup30XttXAycBIlqeyRk\nbJNHJgr21wi0/JTZrX9krpLcn6yy50+3VZ449xmONqYyUCXnuvK8ufqQTIeWHbgN\naUwrRmTiDQKBgQDfFbSezZdpTU7n8u2/r21c4/lzc3Z2Ebb7VlFJ/sw3o9GuEpzU\nbKxsYmwAV1zS/xvFBunlpKF4XyV5ZG4mwLEQbKzJQRNndN/h57iB8zLSS7WFJnVs\njhcZ2xHUen+sDM0U/Ee0nEtBzBPszkzLeMDYa/ApAbyhluOwayBnpForhQKBgQCO\nokTQZEjvRjEk3yAuoOT1aDMsPJL3g0EEZ81UcoeQgYNJo+RvHo74Yd8OrOFxoCUf\nnJr5r25s4q8SulwqaEhCQo8U9bgqsOHFWw+qIV4dFHERZtnynLV2sKpzadPp5gA8\nYDL7/fw4MyHWHlQlu5WmGi7yotPcIAGWktKIUQQkcQKBgQC2wQZ18Bx8Ioc+sICL\nL9W89Rpkb4aRa0J6yzbNXyTemOnYk9JhGT/K3kdjvkv5H2U9e2nIQ7EcOxu31p5T\n3QgOMMN6rzwLY56Gbm+zWVi0hXeSQcIW6wKXmPLVuEHCXT35TEBbPczlcb6qdunH\no6CO0Ok2RAulgqSP0hxr7eiY6Q==\n-----END PRIVATE KEY-----\n",
				client_email: "239259098538-compute@developer.gserviceaccount.com",
				client_id: "105125885024405395033",
				auth_uri: "https://accounts.google.com/o/oauth2/auth",
				token_uri: "https://oauth2.googleapis.com/token",
				auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
				client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/239259098538-compute%40developer.gserviceaccount.com",
			},
			baseUrl: "https://storage.googleapis.com/kltn-18110199-18110151",
			basePath: "/uploads",
		},
	},
});
