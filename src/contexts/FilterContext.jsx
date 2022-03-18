import React, { createContext, useCallback, useState } from "react";
import { useContext } from "react";

const DaysQuantity = [
    { value: "7", label: "7 days" },
    { value: "14", label: "14 days" },
    { value: "30", label: "30 days" },
];

const defaultFilterConfig = {
    viewType: "table",
    daysQuantity: DaysQuantity[0],
    allDaysQuantity: DaysQuantity,
};

const FilterContext = createContext({});

const FilterProvider = ({ children }) => {
    const [filterConfig, setFilterConfig] = useState(defaultFilterConfig);

    const setFilterViewType = useCallback(
        (type) => {
            setFilterConfig({ ...filterConfig, viewType: type });
        },
        [filterConfig]
    );

    const setFilterDaysQuantity = useCallback(
        (days) => {
            setFilterConfig({ ...filterConfig, daysQuantity: { ...days } });
        },
        [filterConfig]
    );

    const resetFilter = useCallback(() => {
        setFilterConfig({
            ...filterConfig,
            daysQuantity: defaultFilterConfig.daysQuantity,
            viewType: defaultFilterConfig.viewType,
        });
    }, [filterConfig]);

    return (
        <FilterContext.Provider
            value={{
                filterConfig,
                setFilterViewType,
                setFilterDaysQuantity,
                resetFilter,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;

export const useFilter = () => useContext(FilterContext);
