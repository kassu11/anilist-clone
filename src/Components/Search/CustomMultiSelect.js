import {useState} from "react";

function CustomMultiSelect({values, selectedValue, customChange, text}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(
		Object.fromEntries(values.map(value => {
			if(Array.isArray(value)) return [value[0], value[1] ?? false];
			else return [value, false];
		})) ?? {}
	);

	console.log(selected);

	return (
		<div className={`customMultiSelect${isOpen ? " open" : ""}`}>
			<div className="preview" onClick={e => setIsOpen(!isOpen)}>
				<p>{text} <span>{"asd"}</span></p>
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