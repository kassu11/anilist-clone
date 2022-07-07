import CustomSelect from '../Components/Search/CustomSelect';
import "../Styles/Components/searchBar.scss"
import "../Styles/Pages/tyyli.scss"

export default {
	title: 'CustomSelect',
	component: CustomSelect
}

export const Default = () => {
	return (
		<CustomSelect values={['a', 'b', 'c']} selectedValue="a" customChange={() => {}} text="Select a value" />
	)
}