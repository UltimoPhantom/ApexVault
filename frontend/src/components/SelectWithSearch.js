import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 'OptionA', label: 'Option A' },
    { value: 'OptionB', label: 'Option B' },
    { value: 'OptionC', label: 'Option C' },
];

const SelectWithSearch = () => {
    const [selectedOption, setSelectedOption] = useState();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        // Perform actions with the selected option, if needed
        console.log("Selected option:", selectedOption);
    };

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                isSearchable
                placeholder="Search..."
            />
        </div>
    );
};

export default SelectWithSearch;
