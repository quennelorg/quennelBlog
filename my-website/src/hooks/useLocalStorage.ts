import { useState, useEffect } from 'react';
import { decrypt, encrypt } from '@site/src/util/crypto';

const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		let currentValue;

		try {
			currentValue = JSON.parse(decrypt(localStorage.getItem(key)) || String(defaultValue));
		} catch (error) {
			currentValue = defaultValue;
		}

		return currentValue;
	});

	useEffect(() => {
		localStorage.setItem(key, encrypt(value));
	}, [value, key]);

	return [value, setValue];
};

export default useLocalStorage;
