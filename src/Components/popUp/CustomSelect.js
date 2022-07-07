import {useEffect, useRef, useState} from "react";

function CustomSelect({values, selectedValue, customChange, text}) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(selectedValue);
	const selectElem = useRef();

	window.onmousedown = e => {
		const target = e.target;
		const parent = target.closest("div.customSelect.open");

		if(parent !== selectElem.current) {
			setIsOpen(false);
			window.onclick = null;
		}
	}

	useEffect(() => {
		setSelected(selectedValue);
	}, [selectedValue])

	return (
		<div className={`customSelect${isOpen ? " open" : ""}`} onClick={e => setIsOpen(!isOpen)} ref={selectElem}>
			<div className="preview">
				<p>{text} <span>{selected}</span></p>
			</div>
			<div className="subMenu">
				{values?.map(value => {
					return (
						<div key={value} className={`option${value === selected ? " selected" : ""}`} onClick={_ => {
							if(selected !== value) customChange?.(value);
							setSelected(value);
						}}>
							{value}
						</div>
					);
				})}
			</div>
		</div>
	)
}

export default CustomSelect;