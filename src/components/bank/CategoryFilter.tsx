import React, { useState } from "react";
import { Checkbox, Divider, ScrollArea, Title } from "@mantine/core";

// Assuming categories structure is fixed and known
const categories = [
  {
    name: "English",
    subCategories: [],
  },
  {
    name: "Science",
    subCategories: [],
  },
  {
    name: "Math",
    subCategories: [
      { name: "Statistics" },
      { name: "Geometry" },
      { name: "Algebra" },
    ],
  },
  // Add more categories as needed
];

// Define types for our state to describe the structure
interface CheckedState {
  [key: string]: boolean;
}

const CategoryFilter = () => {
  const [checkedCategories, setCheckedCategories] = useState<CheckedState>({});
  const [checkedSubCategories, setCheckedSubCategories] =
    useState<CheckedState>({});

  const handleCategoryChange = (categoryName: string) => {
    const newCheckedCategories: CheckedState = {
      ...checkedCategories,
      [categoryName]: !checkedCategories[categoryName],
    };
    setCheckedCategories(newCheckedCategories);

    // Automatically select/deselect all subcategories
    const category = categories.find(
      (category) => category.name === categoryName
    );
    if (category) {
      const newCheckedSubCategories: CheckedState = { ...checkedSubCategories };
      category.subCategories.forEach((subCategory) => {
        newCheckedSubCategories[subCategory.name] =
          newCheckedCategories[categoryName];
      });
      setCheckedSubCategories(newCheckedSubCategories);
    }
  };

  const handleSubCategoryChange = (
    categoryName: string,
    subCategoryName: string
  ) => {
    const newCheckedSubCategories: CheckedState = {
      ...checkedSubCategories,
      [subCategoryName]: !checkedSubCategories[subCategoryName],
    };
    setCheckedSubCategories(newCheckedSubCategories);

    // Check if all subcategories are selected, if so, select the category as well
    const category = categories.find(
      (category) => category.name === categoryName
    );
    if (category) {
      const allSelected = category.subCategories.every(
        (subCategory) => newCheckedSubCategories[subCategory.name]
      );
      setCheckedCategories({
        ...checkedCategories,
        [categoryName]: allSelected,
      });
    }
  };

  return (
    <>
      <Title size="md">Category</Title>
      <ScrollArea style={{ height: 200 }}>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <Checkbox
              label={category.name}
              checked={checkedCategories[category.name] ?? false}
              onChange={() => handleCategoryChange(category.name)}
              labelPosition="right"
              mb={5}
            />
            {category.subCategories.length > 0 && (
              <div style={{ paddingLeft: 20 }}>
                {category.subCategories.map((subCategory, subIndex) => (
                  <Checkbox
                    key={subIndex}
                    label={subCategory.name}
                    checked={checkedSubCategories[subCategory.name] ?? false}
                    labelPosition="right"
                    mb={5}
                    onChange={() =>
                      handleSubCategoryChange(category.name, subCategory.name)
                    }
                  />
                ))}
              </div>
            )}
            <Divider mt="xs" mb="sm" color={"gray"} />
          </React.Fragment>
        ))}
      </ScrollArea>
    </>
  );
};

export default CategoryFilter;
