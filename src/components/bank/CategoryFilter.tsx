import React, { useEffect, useState } from "react";
import { Checkbox, Divider, ScrollArea, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { Category } from "@/types/category";
import { instance } from "@/utils";
import { useRouter } from "next/router";
import { PAGE_SIZE } from "@/pages/bank";

// Assuming categories structure is fixed and known
// const categories = [
//   {
//     name: "English",
//     subCategories: [],
//   },
//   {
//     name: "Science",
//     subCategories: [],
//   },
//   {
//     name: "Math",
//     subCategories: [
//       { name: "Statistics" },
//       { name: "Geometry" },
//       { name: "Algebra" },
//     ],
//   },
//   // Add more categories as needed
// ];

// Define types for our state to describe the structure
interface CheckedState {
  [key: string]: boolean;
}

const CategoryFilter = () => {
  const [checkedCategories, setCheckedCategories] = useState<CheckedState>({});
  const [checkedSubCategories, setCheckedSubCategories] =
    useState<CheckedState>({});
  const [categories, handlerCategories] = useListState<Category>([]);
  const [list, listHandler] = useListState<number>([]);
  const router = useRouter();
  const { keyword, order, sort, page, subCategoryId } = router.query;

  useEffect(() => {
    // const fetchCategories = async () => {
    //   try {
    //     // const response = await fetch("http://localhost:6868/v1/categories");
    //     const response = await fetch("https://localhost:6868/v1/categories");
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     console.log(data.data);

    //     handlerCategories.setState(data);
    //   } catch (error) {
    //     console.error("Error fetching categories:", error);
    //   }
    // };
    const fetchCategories = async () => {
      try {
        // const response = await fetch("http://localhost:6868/v1/categories");
        const { data } = await instance.get("/categories");

        handlerCategories.setState(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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
    subCategoryName: string,
    id: number,
    checked: boolean
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

    if (checked) {
      listHandler.append(id);
    } else {
      listHandler.remove(list.indexOf(id));
    }
  };

  useEffect(() => {
    router.push({
      pathname: "/bank",
      query: {
        limit: PAGE_SIZE,
        page,
        keyword,
        order,
        sort,
        subCategoryId: list.join(","),
      },
    });
  }, [list]);

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
                    onChange={(event) =>
                      handleSubCategoryChange(
                        category.name,
                        subCategory.name,
                        subCategory.id,
                        event.currentTarget.checked
                      )
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
