function formatSearchUrlToObject(search) {
	return Object.fromEntries([...new URLSearchParams(search).entries()]);
}

export default formatSearchUrlToObject;