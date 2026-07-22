import type { SubmitEvent } from "react";

import { FiMap, FiX } from "react-icons/fi";

import { formatLabel } from "@/lib/constants";

import type { CamperFilters, FiltersResponse } from "@/types/camper";

import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  values: CamperFilters;
  options: FiltersResponse;
  optionsError: boolean;
  onChange: (values: CamperFilters) => void;
  onApply: () => void;
  onClear: () => void;
}

interface RadioGroupProps {
  legend: string;
  name: "form" | "engine" | "transmission";
  values: string[];
  selectedValue: string;
  filters: CamperFilters;
  onChange: (values: CamperFilters) => void;
}

function RadioGroup({
  legend,
  name,
  values,
  selectedValue,
  filters,
  onChange,
}: RadioGroupProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend>{legend}</legend>

      <div className={styles.options}>
        {values.map((value) => {
          const inputId = `${name}-${value}`;

          return (
            <label key={value} htmlFor={inputId}>
              <input
                id={inputId}
                type="radio"
                name={name}
                value={value}
                checked={selectedValue === value}
                onChange={() =>
                  onChange({
                    ...filters,
                    [name]: value,
                  } as CamperFilters)
                }
              />

              <span>{formatLabel(value)}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function FilterSidebar({
  values,
  options,
  optionsError,
  onChange,
  onApply,
  onClear,
}: FilterSidebarProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onApply();
  }

  return (
    <aside className={styles.sidebar}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location" className={styles.locationLabel}>
          Location
        </label>

        <div className={styles.locationWrapper}>
          <FiMap aria-hidden="true" />

          <input
            id="location"
            name="location"
            type="text"
            value={values.location}
            placeholder="City"
            autoComplete="address-level2"
            onChange={(event) =>
              onChange({
                ...values,
                location: event.target.value,
              })
            }
          />
        </div>

        <h2>Filters</h2>

        {optionsError && (
          <p className={styles.notice}>
            Filter options could not be refreshed. Default values are shown.
          </p>
        )}

        <RadioGroup
          legend="Camper form"
          name="form"
          values={options.forms}
          selectedValue={values.form}
          filters={values}
          onChange={onChange}
        />

        <RadioGroup
          legend="Engine"
          name="engine"
          values={options.engines}
          selectedValue={values.engine}
          filters={values}
          onChange={onChange}
        />

        <RadioGroup
          legend="Transmission"
          name="transmission"
          values={options.transmissions}
          selectedValue={values.transmission}
          filters={values}
          onChange={onChange}
        />

        <button type="submit" className={styles.searchButton}>
          Search
        </button>

        <button type="button" className={styles.clearButton} onClick={onClear}>
          <FiX aria-hidden="true" />
          Clear filters
        </button>
      </form>
    </aside>
  );
}
