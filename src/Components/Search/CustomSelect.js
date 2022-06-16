import {useState} from "react";

function CustomSelect({values, selectedValue, customChange, text}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(selectedValue);

	return (
		<div className={`customSelect${isOpen ? " open" : ""}`} onClick={e => setIsOpen(!isOpen)}>
			<div className="preview">
				<p>{text} <span>{selected}</span></p>
			</div>
			<div className="subMenu">
				{values?.map(value => {
					return (
						<div key={value} className={`option${value === selected ? " selected" : ""}`} onClick={_ => setSelected(value)}>
							{value}
						</div>
					);
				})}
			</div>
		</div>
	)
}

export default CustomSelect;