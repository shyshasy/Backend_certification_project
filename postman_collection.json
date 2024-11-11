{
	"info": {
		"name": "API Collection",
		"_postman_id": "f5e8abeb-85bb-4299-a223-8c5e5073a3db",
		"description": "Collection to test API endpoints for evaluations, guichets, tickets, and utilisateurs.",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Evaluations",
			"item": [
				{
					"name": "Get all evaluations",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:5002/evaluations",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["evaluations"]
						}
					}
				},
				{
					"name": "Get evaluation by ID",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:5002/evaluations/:id",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["evaluations", ":id"]
						}
					}
				},
				{
					"name": "Create evaluation",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"satis_score\": 5,\n  \"commentaire\": \"Très bon service\",\n  \"date_evaluation\": \"2024-10-10\",\n  \"utilisateur_id\": 1\n}"
						},
						"url": {
							"raw": "http://localhost:5002/evaluations",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["evaluations"]
						}
					}
				},
				{
					"name": "Delete evaluation",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:5002/evaluations/:id",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["evaluations", ":id"]
						}
					}
				}
			]
		},
		{
			"name": "Guichets",
			"item": [
				{
					"name": "Get all guichets",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:5002/guichets",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["guichets"]
						}
					}
				},
				{
					"name": "Create guichet",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"numero_guichet\": 5,\n  \"statut\": true,\n  \"responsable\": \"John Doe\"\n}"
						},
						"url": {
							"raw": "http://localhost:5002/guichets",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["guichets"]
						}
					}
				},
				{
					"name": "Delete guichet",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:5002/guichets/:id",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["guichets", ":id"]
						}
					}
				}
			]
		},
		{
			"name": "Tickets",
			"item": [
				{
					"name": "Get all tickets",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:5002/tickets",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["tickets"]
						}
					}
				},
				{
					"name": "Create ticket",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"statut\": true,\n  \"date_heure_creation\": \"2024-11-11\",\n  \"numero\": 101,\n  \"guichet_id\": 1,\n  \"utilisateur_id\": 2\n}"
						},
						"url": {
							"raw": "http://localhost:5002/tickets",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["tickets"]
						}
					}
				}
			]
		},
		{
			"name": "Utilisateurs",
			"item": [
				{
					"name": "Get all utilisateurs",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:5002/utilisateurs",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["utilisateurs"]
						}
					}
				},
				{
					"name": "Create utilisateur",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"nom\": \"Aichetou Taher Sy\",\n  \"role\": \"Admin\",\n  \"email\": \"aichetou@example.com\",\n  \"status\": true,\n  \"password\": \"password123\"\n}"
						},
						"url": {
							"raw": "http://localhost:5002/utilisateurs",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["utilisateurs"]
						}
					}
				},
				{
					"name": "Delete utilisateur",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:5002/utilisateurs/:id",
							"protocol": "http",
							"host": ["localhost"],
							"port": "5002",
							"path": ["utilisateurs", ":id"]
						}
					}
				}
			]
		}
	]
}
