import { Select, SelectProps } from "antd";
import { useState } from "react";

const TagsInput: React.FC = () => {
    const options: SelectProps['options'] = [
        {
            value: 'Alex',
            label: 'Alex',
        },
        {
            value: 'Carlos',
            label: 'Carlos',
        },
        {
            value: 'David',
            label: 'David',
        }
    ];

    const handleChange = (value: string) => {
        console.log(`${value} selected`);
    };

    return (
        <Select
            mode="tags"
            placeholder="Enter tags here"
            onChange={handleChange}
            options={options}>
            
        </Select>
    );
};

export default TagsInput;