import {useState} from "react";

function CustomMultiSelect({values, selectedValue, customChange, text}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(
		Object.fromEntries(values.map(value => {
			if(Array.isArray(value)) return [value[0], value[1] ?? false];
			else return [value, false];
		})) ?? {}
	);

	window.onmousedown = e => {
		const target = e.target;
		const parent = target.closest("div.customMultiSelect.open");

		if(!parent) {
			setIsOpen(false);
			window.onclick = null;
		}
	}

	const previewTextArray = Object.entries(selected).filter(([key, value]) => value).map(([key, value]) => key);
	if(previewTextArray.length === 0) previewTextArray.push("Default");

	return (
		<div className={`customMultiSelect${isOpen ? " open" : ""}`}>
			<div className="preview" onClick={e => setIsOpen(!isOpen)}>
				<p>{text} <span>{previewTextArray.length === 1 ? previewTextArray[0] : previewTextArray.length + " selected"}</span></p>
			</div>
			<div className="subMenu">
				{Object.entries(selected)?.map(([value, isSelected]) => {
					return (
						<div key={value} className={`option${isSelected ? " selected" : ""}`} onClick={_ => {
							selected[value] = !isSelected;
							setSelected({...selected})
						}}>
							<div className="checkBox"></div>
							<p>{value}</p>
						</div>
					);
				})}
			</div>
		</div>
	)
}

export default CustomMultiSelect;