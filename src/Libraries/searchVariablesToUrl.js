function searchVariablesToUrl(variables) {
	return Object.entries(variables)
		.filter(([key, value]) => value)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
}

export default searchVariablesToUrl;